import type { AppType } from "../../server/src";

import { hc } from "hono/client";

export const api = hc<AppType>("htt://localhost:3000");
