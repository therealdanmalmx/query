import { getPostById, getPosts, Post } from "@/api/posts";
import {
  QueryClient,
  UndefinedInitialDataOptions,
} from "@tanstack/react-query";

export const postsQueryOptions = {
  queryKey: ["posts"],
  queryFn: getPosts,
  initialData: [],
  gcTime: 1000,
} satisfies UndefinedInitialDataOptions;

export const postQueryOptions = (id: string, client: QueryClient) =>
  ({
    queryKey: ["posts", id],
    queryFn: () => getPostById(String(id)),
    initialData: client
      .getQueryData<Post[]>(["posts"])
      ?.find((post) => post.id === id),
  }) satisfies UndefinedInitialDataOptions;
