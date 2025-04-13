'use server'

import { AppResponse } from "@/types";
import { query } from "./db";
import { revalidatePath } from "next/cache";

export async function updateUserLevel(userId: number, newLevel: number): Promise<AppResponse> {
    try {
        await query("UPDATE users SET learning_passed = ? WHERE id = ?", [newLevel, userId])
        revalidatePath('/', 'layout')
        return Promise.resolve({
            message: '1',
            data: null,
            error: false
        });
    } catch (error) {
        return {
            message: error as string,
            data: null,
            error: true
        }
    }
}

export async function addUserTracker(userId: number, lessonId: number): Promise<AppResponse> {
    try {
        const req = await query("INSERT INTO lesson_tracking (lesson_id, user_id) VALUES (?, ?)", [lessonId, userId])
        revalidatePath('/', 'layout')
        return Promise.resolve({
            message: '1',
            data: null,
            error: false
        });
    } catch (error) {
        return {
            message: error as string,
            data: null,
            error: true
        }
    }
}

export async function updateUserActivity(userId: number, lessonId: number, activity : string, attempts : number): Promise<AppResponse> {
    try {
        const req = await query("UPDATE lesson_tracking SET activity = ?, activity_attempts = ? WHERE lesson_id = ? AND user_id = ?", [activity, attempts, lessonId, userId])
        revalidatePath('/', 'layout')
        return Promise.resolve({
            message: '1',
            data: null,
            error: false
        });
    } catch (error) {
        return {
            message: error as string,
            data: null,
            error: true
        }
    }
}