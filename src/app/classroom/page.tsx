import { getUser } from "@/api/users";
import { authOptions } from "@/core/utils/NextAuth";
import { LayoutType, UserEntity } from "@/types";
import AppLoader from "@/ui/atoms/media/AppLoader";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { notFound } from "next/navigation";
import DefaultLayout from "./_comp/DefaultLayout";

export default async function page() {
    const session = await getServerSession(authOptions);
    let userData : UserEntity = {
        fullname: '',
        phone: '',
        display_name: '',
        email: ''
    };
    let layout : LayoutType = 'loading'
    if(session?.user && session.user.email) {
        const user = await getUser(session.user.email)
        if(user.error) {
            console.error(user.message)
        } else {
            if (user.data) {
                userData = user.data
                layout = 'default'
            }
        }
    } else {
        signOut()
        notFound()
    }

    switch (layout) {
        case 'loading':
            return (
                <div className="min-h-screen flex justify-center items-center text-lg">
                  <AppLoader />
                </div>
              )
        case 'default':
            return <DefaultLayout user={userData} />
    }
}