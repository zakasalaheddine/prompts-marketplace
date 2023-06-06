import { z } from "zod";

export const SellFormSchema = z.object({
  title: z
    .string()
    .nonempty({ message: 'Title must contain at least 1 character(s)' }),
  description: z
    .string()
    .nonempty({ message: 'Description must contain at least 1 character(s)' }),
  tags: z.string(),
  platform: z.string().nonempty({ message: 'Platform should be selected' }),
  category: z.string().nonempty({ message: 'Category should be selected' }),
  price: z.number().default(0),
  prompt: z
    .string()
    .nonempty({ message: 'Prompt must contain at least 1 character(s)' }),
  cover: z.instanceof(Blob).optional(),
  images: z.instanceof(Blob).array().optional()
})