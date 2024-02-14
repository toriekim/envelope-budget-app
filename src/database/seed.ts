import { PrismaClient } from '@prisma/client';

// Instantiate Prisma Client
const prisma = new PrismaClient();

// A `main` function so that we can use async/await
async function main() {
  // Drop current database rows
  await prisma.envelope.deleteMany({});
  await prisma.transaction.deleteMany({});

  await prisma.envelope.create({
    data: {
      title: 'Groceries',
      budget: 300,
      transactions: {
        create: [
          { amount: 100, description: 'Whole foods' },
          { amount: 20, description: 'Target run' },
        ],
      },
    },
  });
}

main()
  .catch((err: Error) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    // Disconnect Prisma Client
    console.log(`Database successfully seeded!`);
    await prisma.$disconnect();
  });
