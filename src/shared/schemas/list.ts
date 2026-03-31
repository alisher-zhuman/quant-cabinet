import { z } from "zod";

export const createListResponseSchema = <TItemSchema extends z.ZodTypeAny>(
  itemSchema: TItemSchema,
) =>
  z.looseObject({
    data: z.array(itemSchema),
    total: z.number(),
  });
