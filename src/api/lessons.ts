import { query } from "@/core/lib/db";
import { appCache } from "@/core/utils/AppCache";
import { AppResponse, LessonEntity, UserTracker } from "@/types";

// Lessons Table
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

// Lessons Table
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

// Lesson Tracking Table
export async function getCurrentLesson(subjectId: number, userId: number): Promise<AppResponse> {
    try {
        const s = await query<LessonEntity[]>("SELECT lessons.id as lessonID, title, task_details, activity_details FROM lessons INNER JOIN lesson_tracking ON lesson_tracking.lesson_id = lessons.id WHERE lesson_tracking.user_id = ? AND lessons.subject_id = ? ORDER BY lessons.lesson_order DESC LIMIT 1", [userId, subjectId])
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

// Lesson Tracking Table
export async function getUserTracking(lessonId: number, userId: number): Promise<AppResponse> {
    try {
        const s = await query<UserTracker[]>("SELECT * FROM lesson_tracking WHERE lesson_id = ? AND user_id = ? LIMIT 1", [lessonId, userId])
        return Promise.resolve({
            message: '1',
            data: s as unknown as UserTracker[],
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

// Lesson Tracking Table
export async function getUserTrackingInSubject(subjectId: number, userId: number): Promise<AppResponse> {
    try {
        const s = await query<UserTracker[]>("SELECT lesson_tracking.id, lesson_tracking.lesson_id, lesson_tracking.task, lesson_tracking.activity_attempts FROM lesson_tracking INNER JOIN lessons ON lesson_tracking.lesson_id = lessons.id WHERE lesson_tracking.user_id = ? AND lessons.subject_id = ? ORDER BY lessons.lesson_order DESC", [userId, subjectId])
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

// Lesson Questions Table
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
