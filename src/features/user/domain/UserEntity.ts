export default interface UserType {
    id?: number
    fullname: string
    email: string
    display_name: string
    phone: string
    account_valid?: 0 | 1
    pre_exam_passed?: 0 | 1
    learning_passed?: 0 | 1
    post_exam_passed?: 0 | 1
    user_group?: 1 | 2
    results?: string
}