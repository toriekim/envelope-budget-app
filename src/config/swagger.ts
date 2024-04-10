export const swaggerOptions = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Envelope Budget API',
      version: '1.0.0',
      description:
        'Simple backend API to manage portfolio budget using an envelope budgeting method. Built with Prisma, Express, and Node.',
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/',
      },
    },
  },
  apis: ['./src/v1/routes/*.route.ts'],
};
