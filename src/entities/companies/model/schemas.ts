import { z } from "zod";

import type { TFunction } from "i18next";

import { createListResponseSchema } from "@shared/schemas";

const CompanyKeySchema = z
  .looseObject({
    key: z.string(),
  })
  .nullable();

export const CompanyRowSchema = z.looseObject({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  createdAt: z.string(),
  isArchived: z.boolean(),
});

export const CompaniesResponseSchema = createListResponseSchema(CompanyRowSchema);

export const CompanyDetailsSchema = z.looseObject({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  createdAt: z.string(),
  key: CompanyKeySchema,
});

export const createCompanyFormSchema = (t: TFunction) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(1, t("validation.requiredCompanyName"))
      .min(3, t("validation.minCompanyName")),
    address: z.string().trim().min(1, t("validation.requiredAddress")),
  });

export const CreateCompanyPayloadSchema = z.object({
  name: z.string().trim().min(3),
  address: z.string().trim().min(1),
});

export const UpdateCompanyPayloadSchema = CreateCompanyPayloadSchema.extend({
  id: z.string(),
});

export const DeleteCompanyPayloadSchema = z.object({
  id: z.string(),
});
