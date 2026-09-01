import { FeaturesGrid } from "@/app/_components/features-grid";
import { HeroSection } from "@/app/_components/hero-section";
import { WorkflowGallery } from "@/app/_components/workflow-gallery";

const Home = () => (
  <div className="bg-background text-foreground min-h-screen overflow-hidden selection:bg-red-500/30 selection:text-red-100">
    <main className="mx-auto max-w-7xl space-y-24 px-4 pt-6 pb-24 sm:px-6 lg:px-8 lg:pt-8">
      <HeroSection />
      <WorkflowGallery />
      <FeaturesGrid />
    </main>
  </div>
);

export default Home;
