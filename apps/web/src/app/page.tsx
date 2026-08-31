import { FeaturesGrid } from "@/app/_components/features-grid";
import { HeroSection } from "@/app/_components/hero-section";
import { WorkflowGallery } from "@/app/_components/workflow-gallery";

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground selection:bg-red-500/30 selection:text-red-100">
      <main className="mx-auto max-w-7xl space-y-24 px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pt-8">
        <HeroSection />
        <WorkflowGallery />
        <FeaturesGrid />
      </main>
    </div>
  );
}
