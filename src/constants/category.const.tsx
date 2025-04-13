import {
  IconFashion,
  IconMedia,
  IconFood,
  IconBeauty,
  IconArt,
  IconCharacter,
  IconOther,
} from 'public/icons';
import { ReactNode } from 'react';

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

export const CATEGORIES_WITH_INFO: Record<
  Category,
  { name: string; Icon: ReactNode; iconSrc: string }
> = {
  FASHION: {
    name: '패션',
    Icon: <IconFashion />,
    iconSrc: '/icons/fashion.svg',
  },
  FOOD: {
    name: 'F&B',
    Icon: <IconFood />,
    iconSrc: '/icons/food.svg',
  },
  BEAUTY: {
    name: '뷰티',
    Icon: <IconBeauty />,
    iconSrc: '/icons/beauty.svg',
  },
  ART: {
    name: '예술',
    Icon: <IconArt />,
    iconSrc: '/icons/art.svg',
  },
  CHARACTER: {
    name: '캐릭터',
    Icon: <IconCharacter />,
    iconSrc: '/icons/character.svg',
  },
  MEDIA: {
    name: '미디어',
    Icon: <IconMedia />,
    iconSrc: '/icons/media.svg',
  },
  OTHER: {
    name: '기타',
    Icon: <IconOther />,
    iconSrc: '/icons/other.svg',
  },
} as const;
