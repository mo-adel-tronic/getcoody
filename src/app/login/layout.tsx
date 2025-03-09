import { RoutesName } from "@/core/utils/constants";
import AppLink from "@/ui/atoms/controls/AppLink";
import Logo from "@/ui/atoms/media/Logo";
import Footer from "@/ui/components/Footer";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-background-light flex flex-col justify-between">
    <div className="flex-grow flex flex-col justify-center">
      <AppLink
        href={RoutesName.home}
        className="mb-9 shadow-none mx-auto bg-transparent hover:bg-transparent"
      >
        <div className="bg-white hover:bg-background transition duration-500 rounded-full w-[250px] h-[250px] flex items-center">
        <Logo width={250} />
        </div>
      </AppLink>
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
    <Footer />
  </main>
  );
}
