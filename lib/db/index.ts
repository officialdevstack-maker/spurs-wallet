import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import * as schema from "./schema";

neonConfig.webSocketConstructor = ws;

declare global {
  // eslint-disable-next-line no-var
  var __walletPool: Pool | undefined;
}

const pool = (globalThis.__walletPool ??= new Pool({
  connectionString: process.env.DATABASE_SYNC_URL!,
}));

export const db = drizzle(pool, { schema });
export * from "./schema";
