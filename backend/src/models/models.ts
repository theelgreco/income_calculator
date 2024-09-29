import { Transaction, User } from "@prisma/client";
import { prisma } from "../../prisma/connect";
import { groupTransactionsByDaysInMonth, groupTransactionsByMonth } from "../helpers/helpers";
import { MonthSerializer } from "../types/types";

export async function createUser(data: { user_id: string; email: string }): Promise<User> {
    try {
        return await prisma.user.create({ data: { id: data.user_id, email: data.email } });
    } catch (err) {
        throw err;
    }
}

export async function getUser(authSlug: string): Promise<User | null> {
    try {
        return await prisma.user.findUnique({ where: { id: authSlug } });
    } catch (err: any) {
        throw err;
    }
}

export async function getYearTransactions(year: number, userId: string): Promise<MonthSerializer[]> {
    try {
        const transactions = await prisma.transaction.findMany({
            where: {
                userId,
                AND: [
                    { OR: [{ startDate: { lte: new Date(`${year}-12-31`) } }, { startDate: null }] },
                    { OR: [{ finishDate: { gte: new Date(`${year}-1-01`) } }, { finishDate: null }] },
                ],
            },
        });

        return groupTransactionsByMonth(transactions, year);
    } catch (err: any) {
        throw err;
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
    }
}

export async function createNewTransaction(data: Omit<Transaction, "id" | "createdAt">) {
    try {
        const transaction = await prisma.transaction.create({ data });
        return transaction;
    } catch (err: any) {
        throw err;
    }
}
