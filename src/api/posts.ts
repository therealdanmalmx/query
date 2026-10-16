export interface Post {
  id: string;
  title: string;
  body: string;
  author: string;
  publishedAt: string;
}
export type PostCreate = Omit<Post, "id">;

export const getPosts = async () => {
  const res = await fetch("http://localhost:3000/v1/api/posts");
  return (await res.json()) as Promise<Post[]>;
};

export const getPostById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/v1/api/post/${id}`);
  return (await res.json()) as Promise<Post | undefined>;
};

export const createPost = async (data: PostCreate) => {
  await sleep(4000);
  throw new Error("no savy savy");
};

const sleep = async (delay: number) => {
  await new Promise((resolve) => setTimeout(resolve, delay));
};
