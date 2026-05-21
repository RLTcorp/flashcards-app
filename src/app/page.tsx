import { ChapterGrid } from "@/components/features/ChapterGrid";
import { examData } from "@/data/examData";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400">
          TechnoWeb
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-light">
          Révisez vos concepts de développement web de manière immersive et interactive.
          Sélectionnez un chapitre pour commencer.
        </p>
      </div>

      <ChapterGrid chapters={examData.chapitres} />
    </div>
  );
}
