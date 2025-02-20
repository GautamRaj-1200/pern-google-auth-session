import app from "./app.js";
import { PrismaClient } from '@prisma/client';
import config from "./config/config.js";

export const prisma = new PrismaClient();

const server = app.listen(config.port, () => {
  console.log(`Server is running at port ${config.port}`);
});

server.on('error', (error) => {
  console.error("Server error: ", error);
  process.exit(1);
});

process.on('SIGINT', async () => {
    server.close(() => {
      console.log('Server closed');
      prisma.$disconnect().then(() => {
        process.exit(0);
      });
    });
  });
  

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});