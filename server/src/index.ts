import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { auth } from "./lib/auth.ts";

const app = new Hono();

const posts = [
  {
    id: "1",
    title: "Welcome to SUVNET",
    body: "This is the first seeded post.",
    author: "SUVNET Team",
    publishedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "2",
    title: "Getting Started",
    body: "Explore the latest posts and share your thoughts.",
    author: "SUVNET Team",
    publishedAt: "2024-01-02T00:00:00.000Z",
  },
  {
    id: "3",
    title: "Community Updates",
    body: "Stay tuned for more updates from the community.",
    author: "SUVNET Team",
    publishedAt: "2024-01-03T00:00:00.000Z",
  },
  {
    id: "4",
    title: "New Community Highlights",
    body: "Discover the latest highlights from the SUVNET community.",
    author: "SUVNET Team",
    publishedAt: "2024-01-04T00:00:00.000Z",
  },
];

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

app.use(
  "/api/auth/*",
  cors({
    origin: "http://localhost:8081",
    credentials: true,
  }),
);

app.get("/v1/api/posts", async (c) => c.json(posts, 200));

app.get("/v1/api/post/:id", async (c) => {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  const post = posts.find((post) => post.id === c.req.param("id"));

  if (post === undefined) {
    return c.json(null, 404);
  }

  return c.json(post, 200);
});

app.post("/v1/api/posts", async (c) => {
  const data = await c.req.json();
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
