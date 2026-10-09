export interface Post {
  id: number;
  title: string;
  body: string;
  author: string;
  publishedAt: Date;
}
export type PostCreate = Omit<Post, "id">;

export const getPosts = async () => {
  const res = await fetch("http://localhost:3000/v1/api/posts");
  return (await res.json()) as Promise<Post[]>;
};
export const createPost = async (data: PostCreate) => {
  const res = await fetch("http://localhost:3000/v1/api/posts", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};
