import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const user = prisma.user;

export const gathering = prisma.gathering;
