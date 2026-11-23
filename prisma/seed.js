import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const categorias = ['Cabelo', 'Barba', 'Estética'];

for (const nome of categorias) {
  await prisma.categoria.upsert({
    where: { nome },
    update: {},
    create: { nome },
  });
}

console.log('Categorias cadastradas:', categorias.join(', '));
await prisma.$disconnect();