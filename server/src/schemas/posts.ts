import z from "zod";

export const PostSchema = z.object({
  id: z.number(),
  title: z.string().max(50),
  body: z.string(),
  author: z.string(),
  publishedAt: z.coerce.date(),
});

export const PostCreateSchema = PostSchema.omit({ id: true });

export type Post = z.infer<typeof PostSchema>;
export type PostCreate = z.infer<typeof PostCreateSchema>;
