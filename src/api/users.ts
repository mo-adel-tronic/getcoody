import { query } from "@/core/lib/db";
import { appCache } from "@/core/utils/AppCache";
import { AppResponse, UserEntity } from "@/types";

export async function getAllUsers(): Promise<AppResponse> {
    try {
        const users = await query<UserEntity[]>("SELECT * FROM users")
        const data = appCache(() => {
            return Promise.resolve({
                message: '1',
                data: users as unknown as UserEntity[],
                error: false
            });
        }, ['/users'], {revalidate: 1800})
        const d = await data()
        return d;
    } catch (error) {
        return {
            message: error as string,
            data: null,
            error: true
        }
    }
}

export async function getUser(email:string): Promise<AppResponse> {
    try {
        const user = await query<UserEntity[]>("SELECT * FROM users WHERE email = ?", [email])
        const data = appCache(() => {
            return Promise.resolve({
                message: '1',
                data: user ? user[0] as unknown as UserEntity : null,
                error: false
            });
        }, [`/user/${email}`], {revalidate: 1800})
        let d = await data()
        return d;
    } catch (error) {
        return {
            message: error as string,
            data: null,
            error: true
        }
    }
}

export async function addUser(user: UserEntity): Promise<AppResponse> {
    try {
        const req = await query<UserEntity[]>("INSERT INTO users (fullname, email, display_name, phone, account_valid) VALUES (?,?,?,?, 1)", [user.fullname, user.email, user.display_name, user.phone])
        return Promise.resolve({
            message: '1',
            data: req,
            error: false
        })
    } catch (error) {
        return {
            message: error as string,
            data: null,
            error: true
        }
    }
}

export async function updateProfile(user: UserEntity): Promise<AppResponse> {
    try {
        const req = await query<UserEntity[]>("UPDATE users SET fullname = ?, display_name = ?, phone = ? WHERE id = ?", [user.fullname, user.display_name, user.phone, user.id])
        return Promise.resolve({
            message: '1',
            data: req,
            error: false
        })
    } catch (error) {
        return {
            message: error as string,
            data: null,
            error: true
        }
    }
}