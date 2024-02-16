import { PrismaClient } from '@prisma/client';

// Instantiate Prisma Client
const prisma = new PrismaClient();

// A `main` function so that we can use async/await
async function main() {
  // Drop current database rows
  await prisma.transaction.deleteMany({});
  await prisma.envelope.deleteMany({});

  await prisma.envelope.create({
    data: {
      id: 1,
      title: 'Groceries',
      budget: 150,
      transactions: {
        create: [
          { id: 1, amount: 100, description: 'Whole foods' },
          { id: 2, amount: 20, description: 'Target run' },
          { id: 3, amount: 30, description: "Farmer's market" },
        ],
      },
    },
  });

  await prisma.envelope.create({
    data: {
      id: 2,
      title: 'Utilities',
      budget: 100,
      transactions: {
        create: [
          { id: 4, amount: 80, description: 'Internet' },
          { id: 5, amount: 20, description: 'Gas' },
        ],
      },
    },
  });

  await prisma.envelope.create({
    data: {
      id: 3,
      title: 'Entertainment',
      budget: 50,
      transactions: {
        create: [
          { id: 6, amount: 5, description: 'Apple arcade' },
          { id: 7, amount: 5, description: 'Rent Amazon Prime movie' },
          { id: 8, amount: 15, description: 'Netflix' },
        ],
      },
    },
  });

  await prisma.envelope.create({
    data: {
      id: 4,
      title: 'Dining out',
      budget: 50,
      transactions: {
        create: [
          { id: 9, amount: 125, description: 'Date night' },
          { id: 10, amount: 25, description: 'Lunch out at Bistro' },
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
