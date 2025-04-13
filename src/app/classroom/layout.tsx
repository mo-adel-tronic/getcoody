import { Toaster } from "sonner";

export default async function ClassroomLayout ({children} : Readonly<{
    children: React.ReactNode;
  }>) {
    return <>{children}
    <Toaster toastOptions={{
      classNames: {
        success: "!bg-green-600 !text-white !font-bold"
      }
    }} />
    </>
}