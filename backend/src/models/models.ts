import { Transaction, User } from "@prisma/client";
import { prisma } from "../../prisma/connect";
import { groupTransactionsByDaysInMonth, groupTransactionsByMonth, performanceTimer, performanceTimerAsync } from "../helpers/helpers";
import { MonthSerializer } from "../types/types";

export async function createUser(data: { user_id: string; username: string; email: string; image: string }): Promise<User> {
    try {
        return await prisma.user.create({ data: { id: data.user_id, email: data.email, image: data.image, username: data.username } });
    } catch (err) {
        throw err;
    } finally {
        prisma.$disconnect();
    }
}

export async function getUser(authSlug: string): Promise<User | null> {
    try {
        return await prisma.user.findUnique({ where: { id: authSlug } });
    } catch (err: any) {
        throw err;
    } finally {
        prisma.$disconnect();
    }
}

export async function getYearTransactions(year: number, userId: string): Promise<MonthSerializer[]> {
    try {
        const s = performance.now();

        const transactionsCB = async () => {
            return await prisma.transaction.findMany({
                where: {
                    userId,
                    AND: [
                        { OR: [{ startDate: { lte: new Date(`${year}-12-31`) } }, { startDate: null }] },
                        { OR: [{ finishDate: { gte: new Date(`${year}-1-01`) } }, { finishDate: null }] },
                    ],
                },
            });
        };

        const transactions = await performanceTimerAsync(transactionsCB, "Query took:");

        // const groupedTransactions = groupTransactionsByMonth(transactions, year);
        const groupedTransactions = performanceTimer(groupTransactionsByMonth, "Grouping took:", transactions, year);

        console.log("");

        return groupedTransactions;
    } catch (err: any) {
        throw err;
    } finally {
        prisma.$disconnect();
    }
}

export async function getMonthTransactions(year: number, month: number, userId: string) {
    try {
        const transactions = await prisma.transaction.findMany({
            where: {
                userId,
                AND: [
                    { OR: [{ startDate: { lte: new Date(year, month + 1, 0) } }, { startDate: null }] },
                    { OR: [{ finishDate: { gte: new Date(year, month) } }, { finishDate: null }] },
                ],
            },
        });

        return groupTransactionsByDaysInMonth(transactions, year, month);
    } catch (err: any) {
        throw err;
    } finally {
        prisma.$disconnect();
    }
}

export async function createNewTransaction(data: Omit<Transaction, "id" | "createdAt">) {
    try {
        const transaction = await prisma.transaction.create({ data });
        return transaction;
    } catch (err: any) {
        throw err;
    } finally {
        prisma.$disconnect();
    }
}
