var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import app from "./app.js";
import { PrismaClient } from '@prisma/client';
import config from "./config/config.js";
export const prisma = new PrismaClient();
const server = app.listen(config.port, () => {
    console.log(`Server is running at port ${config.port}`);
});
console.log(server);
server.on('error', (error) => {
    console.error("Server error: ", error);
    process.exit(1);
});
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    server.close(() => {
        console.log('Server closed');
        prisma.$disconnect().then(() => {
            process.exit(0);
        });
    });
}));
process.on('SIGTERM', () => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
    process.exit(0);
}));
