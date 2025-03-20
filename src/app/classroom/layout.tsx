import { authOptions } from "@/core/utils/NextAuth";
import { LayoutType, UserEntity } from "@/types";
import { getServerSession } from "next-auth";

export default async function ClassroomLayout ({children} : Readonly<{
    children: React.ReactNode;
  }>) {
    const session = await getServerSession(authOptions);
    let userData : UserEntity = {
        fullname: '',
        phone: '',
        display_name: '',
        email: ''
    };
    let layout : LayoutType = 'loading'
    if(session?.user && session.user.email) {

    } else {
        layout = 'notfound'
    }

    return <h1>classroom</h1>
}