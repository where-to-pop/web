import { z } from 'zod';

// ----- ENUM -----

export const AgeGroupEnum = z.enum([
  'TEEN_AND_UNDER',
  'TWENTIES',
  'THIRTIES',
  'FORTIES',
  'FIFTY_AND_OVER',
]);
export type AgeGroup = z.infer<typeof AgeGroupEnum>;

export const BrandScaleEnum = z.enum(['SMALL', 'MEDIUM', 'LARGE']);
export type BrandScale = z.infer<typeof BrandScaleEnum>;

export const PopupCategoryEnum = z.enum([
  'FASHION',
  'FOOD_AND_BEVERAGE',
  'BEAUTY',
  'ART',
  'CHARACTER',
  'MEDIA',
  'OTHER',
]);
export type PopupCategory = z.infer<typeof PopupCategoryEnum>;

export const PopupTypeEnum = z.enum([
  'RETAIL',
  'EXHIBITION',
  'BRANDING',
  'OTHER',
]);
export type PopupType = z.infer<typeof PopupTypeEnum>;

// ----- SCHEMA -----

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  brandName: z.string(),
  popupCategory: PopupCategoryEnum,
  popupType: PopupTypeEnum,
  duration: z.string(),
  primaryTargetAgeGroup: AgeGroupEnum,
  secondaryTargetAgeGroup: AgeGroupEnum.nullable(),
  brandScale: BrandScaleEnum,
  projectGoal: z.string(),
  additionalBrandInfo: z.string().nullable(),
  additionalProjectInfo: z.string().nullable(),
  ownerId: z.string(),
});
export type Project = z.infer<typeof ProjectSchema>;

export const CreateProjectBodySchema = ProjectSchema.omit({
  id: true,
  ownerId: true,
});
export type CreateProjectBody = z.infer<typeof CreateProjectBodySchema>;
