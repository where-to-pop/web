/* eslint-disable @typescript-eslint/no-explicit-any */

import { z } from 'zod';
import replacer, { silentParse } from './config.util';
import { CustomError } from './customError';
import { ErrorCodeEnum, ResultEnum } from 'src/types/serviceConfig.type';
import { postRefreshToken } from '../auth.service';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestInitWithSchema<T extends z.ZodTypeAny> extends RequestInit {
  schema?: T;
}

const getApiResponseSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z
    .object({
      result: ResultEnum,
      data: schema.nullable(),
      message: z.string().nullable(),
      errorCode: ErrorCodeEnum.nullable(),
    })
    .strict();

const BASE_URL = import.meta.env.VITE_BASE_URL;

class Instance {
  constructor(private readonly baseUrl: string = BASE_URL ?? '') {}

  // 기본 요청 함수
  async fetchWithConfig<T extends z.ZodTypeAny>(
    url: string,
    method: HttpMethod,
    body?: any,
    options: RequestInitWithSchema<T> = {},
  ) {
    const { schema, ...pureOptions } = options;
    const config: RequestInit = {
      method,
      ...options,
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
        ...pureOptions?.headers,
      },
      ...(body && { body: JSON.stringify(body, replacer) }),
    };

    const res = await fetch(new URL(url, this.baseUrl).toString(), config);

    const showToast = schema !== undefined && method === 'GET';
    const responseSchema = schema
      ? getApiResponseSchema(schema)
      : getApiResponseSchema(z.object({}));

    try {
      // response가 있는 경우
      const data = await res.json();
      const parsedData = silentParse(responseSchema, data, { showToast });

      if (parsedData.result === 'FAIL') {
        throw new CustomError(
          parsedData.errorCode || 'UNKNOWN_ERROR_CODE',
          parsedData.message || '알 수 없는 오류',
        );
      }
      // NOTE: 이 타입 단언은 안전함
      return parsedData.data as z.infer<T>;
    } catch (e) {
      // response가 없는 경우
      console.error('fetchWithConfig JSON 파싱 오류: ', e);
      throw new CustomError(res.status.toString(), 'No Content');
    }
  }

  async fetchWithRetry<T extends z.ZodTypeAny>(
    url: string,
    method: HttpMethod,
    body?: any,
    options: RequestInitWithSchema<T> = {},
  ) {
    const fetchOperation = () =>
      this.fetchWithConfig<T>(url, method, body, options);
    return await this.withTokenRetry(fetchOperation);
  }

  // 토큰 갱신 요청이 진행 중인 경우 그 결과를 사용
  private tokenUpdatePromise: Promise<{}> | null = null;

  // 토큰 갱신 요청
  private async updateToken() {
    try {
      if (this.tokenUpdatePromise) {
        await this.tokenUpdatePromise;
      }

      this.tokenUpdatePromise = postRefreshToken();
      await this.tokenUpdatePromise;
    } catch (e) {
      const error = e as CustomError;
      // TODO: 로그인 페이지로 이동
      throw error;
    } finally {
      this.tokenUpdatePromise = null;
    }
  }

  // 토큰 만료 시 토큰을 갱신하고 다시 요청
  private async withTokenRetry<T>(operation: () => Promise<T>): Promise<T> {
    try {
      return await operation();
    } catch (e) {
      const error = e as CustomError;
      if (error.errorCode === ErrorCodeEnum.Enum.AUTH_ACCESS_TOKEN_EXPIRED) {
        await this.updateToken();
        return await operation();
      }
      throw error;
    }
  }

  async get<T extends z.ZodTypeAny>(
    url: string,
    options?: RequestInitWithSchema<T>,
  ) {
    return this.fetchWithConfig<T>(url, 'GET', undefined, options);
  }
  async delete<T extends z.ZodTypeAny>(
    url: string,
    options?: RequestInitWithSchema<T>,
  ) {
    return await this.fetchWithConfig<T>(url, 'DELETE', undefined, options);
  }
  async post<T extends z.ZodTypeAny>(
    url: string,
    body: any,
    options?: RequestInitWithSchema<T>,
  ) {
    return await this.fetchWithConfig<T>(url, 'POST', body, options);
  }
  async put<T extends z.ZodTypeAny>(
    url: string,
    body: any,
    options?: RequestInitWithSchema<T>,
  ) {
    return await this.fetchWithConfig<T>(url, 'PUT', body, options);
  }
  async patch<T extends z.ZodTypeAny>(
    url: string,
    body: any,
    options?: RequestInitWithSchema<T>,
  ) {
    return await this.fetchWithConfig<T>(url, 'PATCH', body, options);
  }
}

export const instance = new Instance();
