import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({
  connectionString: "postgresql://postgres:kush@localhost:5432/postgres",
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter,
});
