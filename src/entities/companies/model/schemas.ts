import { z } from "zod";

export const CompanyUserSchema = z
  .looseObject({
    email: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
  })
  .nullable()
  .optional();

export const CompanyRowSchema = z.looseObject({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  createdAt: z.string(),
  isArchived: z.boolean(),
  user: CompanyUserSchema,
});

export const CompaniesResponseSchema = z.looseObject({
  data: z.array(CompanyRowSchema),
  total: z.number(),
});
