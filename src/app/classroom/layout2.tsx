import { authOptions } from "@/core/utils/NextAuth";
import { Loader } from "lucide-react";
import { getServerSession } from "next-auth";
import DefaultLayout from "./_comp/DefaultLayout";


export default async function ClassroomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await getServerSession(authOptions);
    let userData : UserType = {
        fullname: '',
        phone: '',
        display_name: '',
        email: ''
    };
    let layout : LayoutType = 'loading'
    if(session?.user && session.user.email) {
        layout = 'default'
        const user = await getSingleUser.call(session.user.email)
        if(user.data) {
            userData = user.data
        } else {
            userData.email = session.user.email
        }
    }
    switch (layout) {
        case 'loading':
            return (
                <div className="min-h-screen flex justify-center items-center text-lg">
                  <Loader />
                </div>
              )
        case 'default':
            return <DefaultLayout user={userData} />

    }
}
