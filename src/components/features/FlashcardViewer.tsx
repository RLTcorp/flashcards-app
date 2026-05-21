"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Chapter } from "@/data/types"
import { Button } from "@/components/ui/Button"
import { ArrowLeft, ArrowRight, Shuffle, RotateCcw } from "lucide-react"

interface FlashcardViewerProps {
  chapter: Chapter
}

export function FlashcardViewer({ chapter }: FlashcardViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [direction, setDirection] = useState(0)

  const questions = chapter.questions

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setDirection(1)
      setIsFlipped(false)
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1)
      setIsFlipped(false)
      setCurrentIndex((prev) => prev - 1)
    }
  }

  const handleRandom = () => {
    let randomIndex
    do {
      randomIndex = Math.floor(Math.random() * questions.length)
    } while (randomIndex === currentIndex && questions.length > 1)
    
    setDirection(randomIndex > currentIndex ? 1 : -1)
    setIsFlipped(false)
    setCurrentIndex(randomIndex)
  }

  const progress = ((currentIndex + 1) / questions.length) * 100

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
      <div className="w-full mb-8">
        <div className="flex justify-between text-sm font-medium text-muted-foreground mb-2">
          <span>{chapter.titre}</span>
          <span>{currentIndex + 1} / {questions.length}</span>
        </div>
        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </div>
      </div>

      <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] perspective-1000 mb-8">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            className="absolute inset-0 w-full h-full cursor-pointer transform-style-3d"
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -50 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <motion.div 
              className="absolute inset-0 w-full h-full transform-style-3d"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              {/* Front */}
              <div className="absolute inset-0 w-full h-full backface-hidden glass-panel rounded-3xl p-8 sm:p-12 flex flex-col justify-center items-center text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-sm font-semibold tracking-wider text-primary mb-6 uppercase">Question</div>
                <h2 className="text-2xl sm:text-3xl font-medium leading-relaxed">{questions[currentIndex].question}</h2>
                <div className="absolute bottom-6 text-sm text-muted-foreground animate-pulse">
                  Cliquez pour révéler
                </div>
              </div>

              {/* Back */}
              <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 glass-panel rounded-3xl p-8 sm:p-12 flex flex-col items-start shadow-lg overflow-y-auto custom-scrollbar">
                <div className="w-full text-center text-sm font-semibold tracking-wider text-emerald-500 mb-6 uppercase">Réponse</div>
                <div className="text-lg sm:text-xl font-medium leading-relaxed whitespace-pre-wrap w-full text-left pb-4">
                  {questions[currentIndex].reponse}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="glass" size="icon" onClick={handlePrev} disabled={currentIndex === 0}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Button variant="glass" size="icon" onClick={handleRandom} title="Aléatoire">
          <Shuffle className="w-5 h-5" />
        </Button>
        <Button variant="glass" size="icon" onClick={() => setIsFlipped(false)} title="Réinitialiser la carte">
          <RotateCcw className="w-5 h-5" />
        </Button>
        <Button variant="glass" size="icon" onClick={handleNext} disabled={currentIndex === questions.length - 1}>
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
