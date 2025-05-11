export type Category = (typeof CATEGORIES)[number];
export const CATEGORIES = [
  'FASHION',
  'FOOD',
  'BEAUTY',
  'ART',
  'CHARACTER',
  'MEDIA',
  'OTHER',
] as const;
export const CATEGORY_TO_TEXT = {
  FASHION: '패션',
  FOOD: '푸드',
  BEAUTY: '뷰티',
  ART: '예술',
  CHARACTER: '캐릭터',
  MEDIA: '미디어',
  OTHER: '기타',
};

export type PopupType = (typeof POPUP_TYPES)[number];
export const POPUP_TYPES = ['BRAND', 'RETAIL', 'COLLABORATION'] as const;
export const POPUP_TYPE_TO_TEXT = {
  BRAND: '브랜드형',
  RETAIL: '판매형',
  COLLABORATION: '콜라보형',
};

export type AgeRange = (typeof AGE_RANGES)[number];
export const AGE_RANGES = [
  '10대',
  '20대',
  '30대',
  '40대',
  '50대 이상',
] as const;

export type BrandSize = (typeof BRAND_SIZES)[number];
export const BRAND_SIZES = ['소', '중', '대'] as const;
