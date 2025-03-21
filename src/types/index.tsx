export type LayoutType = 'default' | 'main' | 'pre' | 'post' | 'result' | 'loading'

export interface AppResponse {
    message: string
    data: any
    error: boolean
}

export interface UserEntity {
    readonly id?: number
    fullname: string
    email: string
    display_name: string
    phone: string
    account_valid?: 0 | 1
    pre_exam_passed?: 0 | 1
    learning_passed?: 0 | 1
    post_exam_passed?: 0 | 1
    results?: string
    user_group?: 1 | 2
}