import {
  AgeGroup,
  BrandScale,
  PopupCategory,
  PopupType,
} from 'src/types/project.type';

export const POPUP_CATEGORY_TO_TEXT: Record<PopupCategory, string> = {
  FASHION: '패션',
  FOOD_AND_BEVERAGE: 'F&B',
  BEAUTY: '뷰티',
  ART: '예술',
  CHARACTER: '캐릭터',
  MEDIA: '미디어',
  OTHER: '기타',
} as const;

export const POPUP_TYPE_TO_TEXT: Record<PopupType, string> = {
  RETAIL: '소매형',
  EXHIBITION: '전시형',
  BRANDING: '브랜딩형',
  OTHER: '기타',
};

export const AGE_GROUP_TO_TEXT: Record<AgeGroup, string> = {
  TEEN_AND_UNDER: '10대 이하',
  TWENTIES: '20대',
  THIRTIES: '30대',
  FORTIES: '40대',
  FIFTY_AND_OVER: '50대 이상',
} as const;

export const BRAND_SCALE_TO_TEXT: Record<BrandScale, string> = {
  SMALL: '소형',
  MEDIUM: '중형',
  LARGE: '대형',
} as const;
