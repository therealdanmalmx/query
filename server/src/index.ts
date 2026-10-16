import { serve } from "@hono/node-server";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { posts } from "./data.ts";
import { auth } from "./lib/auth.ts";
import { PostCreateSchema } from "./schemas/posts.ts";

const app = new Hono();

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

const routes = app
  .use(
    "/api/auth/*",
    cors({
      origin: "http://localhost:8081",
      credentials: true,
    }),
  )
  .get("/v1/api/posts", async (c) => c.json(posts, 200))
  .get("/v1/api/post/:id", async (c) => {
    const post = posts.find((post) => post.id === c.req.param("id"));

    if (!post) {
      return c.json(null, 404);
    }

    return c.json(post, 200);
  })
  .post("/v1/api/posts", zValidator("json", PostCreateSchema), async (c) => {
    const data = c.req.valid("json");
    const newPost = { id: String(Date.now()), ...data };
    posts.push(newPost);

    return c.json(newPost, 201);
  });

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);

export type AppType = typeof routes;
