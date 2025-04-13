export type LayoutType =
  | "default"
  | "main"
  | "pre"
  | "post"
  | "result"
  | "loading";

export interface MainNavItemType {
  title: string;
  url: string;
  icon: any;
  isActive?: boolean;
  items?: MainNavItemType[];
}

export interface ProfileHeaderItemType {
  text: string;
  href: string;
}

export interface AppResponse {
  message: string;
  data: any;
  error: boolean;
}

export interface UserEntity {
  readonly id?: number;
  fullname: string;
  email: string;
  display_name: string;
  phone: string;
  account_valid?: 0 | 1;
  pre_exam_passed?: 0 | 1;
  learning_passed?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  post_exam_passed?: 0 | 1;
  results?: string;
  user_group?: 1 | 2;
}

export interface SubjectEntity {
  id: number;
  title: string;
  title_prefix: string;
  targets: string;
  lessons?: LessonEntity[];
}

export interface LessonEntity {
  readonly id?: number;
  title: string;
  lesson_order: number;
  subject_id: number;
  video?: string;
  content?: string;
  task_details?: string;
  task_link?: string;
  activity_details?: string;
  activity_chat_notes?: string;
  activity_file_tree?: string
  files_starter?: string;
  activity_answers?: string;
  resources?: string;
}

export interface QuestionEntity {
  readonly id?: number;
  question: string;
  choices: string;
  answer: number;
  feedback?: string;
  lesson_id?: number;
}

export interface FileTreeItem {
  name: string;
  type: "file" | "folder";
  children?: FileTreeItem[];
}

export interface AgentResponse {
  issue: string;
  page: string;
  level: "خطأ" | "تحذير" | "تنبية" | "أحسنت";
  line: number;
  suggestion: string;
  feedback: string
}

export interface UserTracker {
  id?: number;
  user_id: number;
  lesson_id: number;
  task: 0 | 1 | 2 // 0 not started, 1 success, 2 failed
  activity: string
  activity_attempts: number;
}

export interface LessonContentItem {
  type: "h2" | "h3" | "h4" | "p" | "ul" | "img",
  content: string | string[]
}