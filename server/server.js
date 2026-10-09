import { serve } from "@hono/node-server";
import { Hono } from "hono";
const app = new Hono();

const posts = [
  {
    id: 1,
    title: "Welcome to SUVNET",
    body: "This is the first seeded post.",
    author: "SUVNET Team",
    publishedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    title: "Getting Started",
    body: "Explore the latest posts and share your thoughts.",
    author: "SUVNET Team",
    publishedAt: "2024-01-02T00:00:00.000Z",
  },
  {
    id: 3,
    title: "Community Updates",
    body: "Stay tuned for more updates from the community.",
    author: "SUVNET Team",
    publishedAt: "2024-01-03T00:00:00.000Z",
  },
  {
    id: 4,
    title: "New Community Highlights",
    body: "Discover the latest highlights from the SUVNET community.",
    author: "SUVNET Team",
    publishedAt: "2024-01-04T00:00:00.000Z",
  },
];

app.get("/v1/api/posts", (c) => c.json(posts));

serve(app);
