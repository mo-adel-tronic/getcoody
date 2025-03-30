import AppLoader from "@/ui/atoms/media/AppLoader";
import ClassroomPage from "./ClassroomPage";
import MainNavHelper from "@/core/lib/MainNavHelper";
import { PagesName, RoutesName } from "@/core/utils/constants";
import { LayoutType, ProfileHeaderItemType, SubjectEntity, UserEntity } from "@/types";

interface Props {
  pageTitle: string
  currentRoute: string
  layout: LayoutType
  userData: UserEntity
  subjects: SubjectEntity[]
  profileHeaderItems: ProfileHeaderItemType[];
  def: React.ReactNode;
  pre: React.ReactNode;
  main: React.ReactNode;
  post: React.ReactNode;
  result: React.ReactNode;
}
export default async function DefaultLayout({layout, userData, subjects, currentRoute, pageTitle, profileHeaderItems, def, pre, main, post, result}: Props) {

  switch (layout) {
      case "loading":
        return (
          <div className="min-h-screen flex justify-center items-center text-lg">
            <AppLoader />
          </div>
        );
      case "default":
        return (
          <ClassroomPage
            pageTitle={pageTitle}
            mainNav={MainNavHelper(layout, currentRoute)}
            profileHeaderItems={[
              {
                text: PagesName.home,
                href: RoutesName.home,
              },
              ...profileHeaderItems
            ]}
          >
           {def}
          </ClassroomPage>
        );
      case "pre":
        return (
          <ClassroomPage
            pageTitle={pageTitle}
            mainNav={MainNavHelper(layout, currentRoute)}
            profileHeaderItems={[
              {
                text: PagesName.home,
                href: RoutesName.home,
              },
              ...profileHeaderItems
            ]}
          >
           {pre}
          </ClassroomPage>
        );
      case "main":
        return (
          <ClassroomPage
            pageTitle={pageTitle}
            mainNav={MainNavHelper(layout, currentRoute!, subjects, userData.learning_passed)}
            profileHeaderItems={[
              {
                text: PagesName.home,
                href: RoutesName.home,
              },
              ...profileHeaderItems
            ]}
          >
            {main}
          </ClassroomPage>
        );
      case "post":
        return (
          <ClassroomPage
            pageTitle={pageTitle}
            mainNav={MainNavHelper(layout, currentRoute, subjects, userData.learning_passed)}
            profileHeaderItems={[
              {
                text: PagesName.home,
                href: RoutesName.home,
              },
              ...profileHeaderItems
            ]}
          >
            {post}
          </ClassroomPage>
        );
      case "result":
        return (
          <ClassroomPage
            pageTitle={pageTitle}
            mainNav={MainNavHelper(layout, currentRoute, subjects, userData.learning_passed)}
            profileHeaderItems={[
              {
                text: PagesName.home,
                href: RoutesName.home,
              },
              ...profileHeaderItems
            ]}
          >
            {result}
          </ClassroomPage>
        );
    }
}