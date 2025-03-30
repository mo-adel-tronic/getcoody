import { getServerSession } from "next-auth";
import { authOptions } from "../utils/NextAuth";
import { LayoutType, SubjectEntity, UserEntity } from "@/types";
import { getUser } from "@/api/users";
import { signOut } from "next-auth/react";
import { notFound } from "next/navigation";
import { getAllSubjects } from "@/api/subjects";

export async function layoutHandler() : Promise<[LayoutType, UserEntity, SubjectEntity[]]> {
  const session = await getServerSession(authOptions);
  let userData: UserEntity = {
    fullname: "",
    phone: "",
    display_name: "",
    email: "",
  };
  let layout: LayoutType = "loading";
  const subjectsReq = await getAllSubjects();
    if (subjectsReq.error) {
      console.error(subjectsReq.message);
    }
    const subjects : SubjectEntity[] = subjectsReq.data ? subjectsReq.data : [];
  if (session?.user && session.user.email) {
    const user = await getUser(session.user.email);
    if (user.error) {
      console.error(`
        *************************************************
        ${user.message}
        *************************************************
        `);
    } else {
      if (user.data) {
        userData = user.data;
        layout = "default";
        if (userData.account_valid) {
          layout = "pre";
        }
        if(userData.pre_exam_passed) {
            layout = 'main';
        }
        if(userData.learning_passed && userData.learning_passed > subjects.length) {
            layout = 'post';
        }
        if(userData.post_exam_passed) {
            layout = 'result';
        }
      } else {
        userData.email = session.user.email;
        layout = "default";
      }
    }
  } else {
    signOut();
    notFound();
  }
  return [layout, userData, subjects];
}
