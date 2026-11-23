// lib/prisma.js: cria a conexão com o banco PostgreSQL (Neon).
// A senha do banco fica no arquivo .env (DATABASE_URL), e nunca no código.
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

export const prisma = new PrismaClient({ adapter });