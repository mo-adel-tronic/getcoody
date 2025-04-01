import { query } from "@/core/lib/db";
import { appCache } from "@/core/utils/AppCache";
import { AppResponse, LessonEntity } from "@/types";

export async function addLesson(lesson : LessonEntity): Promise<AppResponse> {
    try {
        const s = await query<LessonEntity[]>("INSERT INTO lessons (title, lesson_order, subject_id) VALUES (?, ?, ?)", [lesson.title, lesson.lesson_order, lesson.subject_id])
        return Promise.resolve({
            message: '1',
            data: s as unknown as LessonEntity[],
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

export async function getsubjectLessons(subjectId: number): Promise<AppResponse> {
    try {
        const s = await query<LessonEntity[]>("SELECT * FROM lessons WHERE subject_id = ? ORDER BY lesson_order", [subjectId])
        const data = appCache(() => {
            return Promise.resolve({
                message: '1',
                data: s as unknown as LessonEntity[],
                error: false
            });
        }, [`/lessons/${subjectId}`], {revalidate: 1800})
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

export async function getCurrentLesson(subjectId: number, userId: number): Promise<AppResponse> {
    try {
        const s = await query<LessonEntity[]>("SELECT lessons.id as lessonID FROM lessons INNER JOIN lesson_tracking ON lesson_tracking.lesson_id = lessons.id WHERE lesson_tracking.user_id = ? AND lessons.subject_id = ? ORDER BY lessons.lesson_order DESC LIMIT 1", [userId, subjectId])
        return Promise.resolve({
            message: '1',
            data: s as unknown as LessonEntity[],
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

export async function getLessonQuestions(lessonId: number): Promise<AppResponse> {
    try {
        const s = await query<LessonEntity[]>("SELECT * FROM lesson_questions WHERE lesson_id = ?", [lessonId])
        return Promise.resolve({
            message: '1',
            data: s as unknown as LessonEntity[],
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
