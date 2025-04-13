import AppScrollSection from "@/ui/atoms/blocks/AppScrollSection";
import About from "@/ui/components/About";
import BlogSection from "@/ui/components/BlogSection";
import Footer from "@/ui/components/Footer";
import Header1 from "@/ui/components/Header";
import ResearcherSection from "@/ui/components/Researcher";
import ServiceSection from "@/ui/components/ServiceSection";
import TeacherSection from "@/ui/components/Teachers";

export default function Home() {
  return (
    <main>
      <AppScrollSection>
        <Header1 />
        <About />
        <ServiceSection />
{/*         <ResearcherSection />
        <TeacherSection /> */}
        <BlogSection />
        <Footer />
      </AppScrollSection>
    </main>
  );
}
