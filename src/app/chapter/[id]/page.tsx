import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { examData } from "@/data/examData"
import { FlashcardViewer } from "@/components/features/FlashcardViewer"
import { Button } from "@/components/ui/Button"

export async function generateStaticParams() {
  return examData.chapitres.map((chapter) => ({
    id: chapter.id.toString(),
  }))
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params
  const chapter = examData.chapitres.find((c) => c.id.toString() === resolvedParams.id)

  if (!chapter) {
    notFound()
  }

  return (
    <div className="flex-1 flex flex-col pt-12 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl mx-auto mb-8">
        <Link href="/">
          <Button variant="ghost" className="pl-0 text-muted-foreground hover:text-foreground group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Retour aux chapitres
          </Button>
        </Link>
      </div>

      <FlashcardViewer chapter={chapter} />
    </div>
  )
}
