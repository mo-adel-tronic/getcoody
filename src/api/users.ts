import { query } from "@/core/lib/db";
import { AppResponse, UserEntity } from "@/types";

export async function getAllUsers(): Promise<AppResponse> {
    try {
        const users = await query<UserEntity[]>("SELECT * FROM users")
        return {
            message: '1',
            data: users as unknown as UserEntity[],
            error: false
        }
    } catch (error) {
        return {
            message: error as string,
            data: null,
            error: true
        }
    }
}