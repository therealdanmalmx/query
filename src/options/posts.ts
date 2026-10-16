import { getPosts } from "@/api/posts";
import { UndefinedInitialDataOptions } from "@tanstack/react-query";

export const postsQueryOptions = {
  queryKey: ["posts"],
  queryFn: getPosts,
  initialData: [],
  gcTime: 1000,
} satisfies UndefinedInitialDataOptions;
