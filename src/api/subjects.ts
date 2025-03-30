import { query } from "@/core/lib/db";
import { appCache } from "@/core/utils/AppCache";
import { AppResponse, SubjectEntity } from "@/types";

export async function getAllSubjects(): Promise<AppResponse> {
    try {
        const s = await query<SubjectEntity[]>("SELECT * FROM subjects ORDER BY id")
        const data = appCache(() => {
            return Promise.resolve({
                message: '1',
                data: s as unknown as SubjectEntity[],
                error: false
            });
        }, ['/subjects'], {revalidate: 1800})
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


export async function addSubject(sub : SubjectEntity): Promise<AppResponse> {
    try {
        const s = await query<SubjectEntity[]>("INSERT INTO subjects (id, title, title_prefix, targets) VALUES (?, ?, ?, ?)", [sub.id, sub.title, sub.title_prefix, JSON.stringify(sub.targets)])
        return Promise.resolve({
            message: '1',
            data: s as unknown as SubjectEntity[],
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