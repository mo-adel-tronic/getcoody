import { LayoutType, LessonEntity, MainNavItemType, SubjectEntity } from "@/types";
import { PagesName, RoutesName } from "../utils/constants";

export function isSubjectOpen(
  subjectId: number,
  currentSubject: number
): boolean {
  return subjectId <= currentSubject;
}

export default function MainNavHelper(
  layout: LayoutType,
  active: string,
  subjects? : SubjectEntity[],
  currentSubject?: number
): MainNavItemType[] {
  const overview: MainNavItemType = {
    title: PagesName.classroom,
    url: RoutesName.classroom,
    icon: 'Info',
    isActive: active === RoutesName.classroom,
  };
  const profile: MainNavItemType = {
    title: PagesName.profile,
    url: RoutesName.profile,
    icon: 'User',
    isActive: active === RoutesName.profile,
  };
  const home: MainNavItemType = {
    title: "العودة للصفحة الرئيسية",
    url: RoutesName.home,
    icon: 'Home',
    isActive: active === RoutesName.home,
  };
  const result: MainNavItemType = {
    title: PagesName.results,
    url: RoutesName.results,
    icon: 'CrownIcon',
    isActive: active === RoutesName.results,
  };
  const pre: MainNavItemType = {
    title: PagesName.pre,
    url: "#",
    icon: 'ClipboardPenLine',
    isActive: [RoutesName.preExam, RoutesName.preServey].includes(active),
    items: [
      {
        title: PagesName.preExam,
        url: RoutesName.preExam,
        icon: 'FileQuestionIcon',
      },
      {
        title: PagesName.preServey,
        url: RoutesName.preServey,
        icon: 'PenSquareIcon',
      },
    ],
  };
  const post: MainNavItemType = {
    title: PagesName.post,
    url: "#",
    icon: 'ClipboardPenLine',
    isActive: [RoutesName.postExam, RoutesName.postServey].includes(active),
    items: [
      {
        title: PagesName.postExam,
        url: RoutesName.postExam,
        icon: 'FileQuestionIcon',
      },
      {
        title: PagesName.postServey,
        url: RoutesName.postServey,
        icon: 'PenSquareIcon',
      },
    ],
  };
  const lessons: MainNavItemType = {
    title: PagesName.subject,
    url: "#",
    icon: 'BookOpen',
    isActive: active.startsWith(RoutesName.subject),
    items: subjects?.length && subjects.length?subjects.map((subject) => {
      return {
        title: subject.title,
        url: `${RoutesName.subject}/${subject.id}`,
        icon:
          currentSubject &&
          isSubjectOpen(subject.id, currentSubject)
            ? 'LockOpen'
            : 'LockIcon',
        isActive: active.slice(active.lastIndexOf('/')+1) == subject.id.toString()
      };
    }) : []
  };
  switch (layout) {
    case "default":
      return [overview, profile, home];
    case "pre":
      return [overview, profile, pre, home];
    case "main":
      return [overview, profile, lessons, home];
    case "post":
      return [overview, profile, lessons, post, home];
    case "result":
      return [overview, profile, lessons, result, home];
    default:
      return [
        {
          title: "العودة للصفحة الرئيسية",
          url: RoutesName.home,
          icon: 'Home',
          isActive: true
        },
      ];
  }
}

export function lessonNavHelper(lessons : LessonEntity[], currentLessonId : number, subjectId : number) : MainNavItemType[] {
  return lessons.map(lesson =>  {
    return {
      title: lesson.title,
      icon: 'BookOpen',
      isActive: lesson.id === currentLessonId,
      url: RoutesName.subject + '/' + subjectId + '/lessons/' + lesson.id
    }
  })
}
