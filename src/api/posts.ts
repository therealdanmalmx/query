import { api } from "@/lib/hono-client";
import { parseResponse } from "hono/client";

export interface Post {
  id: string;
  title: string;
  body: string;
  author: string;
  publishedAt: Date;
}
export type PostCreate = Omit<Post, "id">;

export const getPosts = async () => {
  return parseResponse(api.v1.api.posts.$get());
};

export const getPostById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/v1/api/post/${id}`);
  return (await res.json()) as Promise<Post | undefined>;
};

export const createPost = async (data: PostCreate) => {
  return parseResponse(api.v1.api.posts.$post({ json: data }));
};

const sleep = async (delay: number) => {
  await new Promise((resolve) => setTimeout(resolve, delay));
};
