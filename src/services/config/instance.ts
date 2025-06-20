/* eslint-disable @typescript-eslint/no-explicit-any */

import { z } from 'zod';
import { silentParse } from './config.util';
import { CustomError } from './customError';
import { ErrorCodeEnum, ResultEnum } from 'src/types/serviceConfig.type';
import { postRefreshToken } from '../auth.service';
import axios, { AxiosRequestConfig } from 'axios';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestInitWithSchema<T extends z.ZodTypeAny>
  extends AxiosRequestConfig {
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

export const BASE_URL = import.meta.env.VITE_BASE_URL;

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
    const config: AxiosRequestConfig = {
      method,
      ...options,
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...pureOptions?.headers,
      },
      ...(body && { data: body, ...pureOptions }),
    };

    const res = await axios(new URL(url, this.baseUrl).toString(), config);

    const showToast = schema !== undefined && method === 'GET';
    const responseSchema = schema
      ? getApiResponseSchema(schema)
      : getApiResponseSchema(z.object({}));

    const parsedData: z.infer<typeof responseSchema> = silentParse(
      responseSchema,
      res.data,
      { showToast },
    );

    if (parsedData.result === 'FAIL') {
      console.error(parsedData.errorCode + ' ' + parsedData.message);
      throw new CustomError(
        parsedData.errorCode || 'UNKNOWN_ERROR_CODE',
        parsedData.message || '알 수 없는 오류',
      );
    }

    return parsedData.data as z.infer<T>;
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
  private tokenUpdatePromise: Promise<unknown> | null = null;

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
      window.location.href = '/';
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
    return this.fetchWithRetry<T>(url, 'GET', undefined, options);
  }
  async delete<T extends z.ZodTypeAny>(
    url: string,
    options?: RequestInitWithSchema<T>,
  ) {
    return await this.fetchWithRetry<T>(url, 'DELETE', undefined, options);
  }
  async post<T extends z.ZodTypeAny>(
    url: string,
    body: any,
    options?: RequestInitWithSchema<T>,
  ) {
    return await this.fetchWithRetry<T>(url, 'POST', body, options);
  }
  async put<T extends z.ZodTypeAny>(
    url: string,
    body: any,
    options?: RequestInitWithSchema<T>,
  ) {
    return await this.fetchWithRetry<T>(url, 'PUT', body, options);
  }
  async patch<T extends z.ZodTypeAny>(
    url: string,
    body: any,
    options?: RequestInitWithSchema<T>,
  ) {
    return await this.fetchWithRetry<T>(url, 'PATCH', body, options);
  }
}

export const instance = new Instance();
