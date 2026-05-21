"use client"

import React from "react"
import { motion, Variants } from "framer-motion"
import Link from "next/link"
import { Card } from "@/components/ui/Card"
import { Chapter } from "@/data/types"

interface ChapterGridProps {
  chapters: Chapter[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
}

export function ChapterGrid({ chapters }: ChapterGridProps) {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto px-4"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {chapters.map((chapter, index) => {
        // Assign a subtle accent color based on index
        const colors = [
          "from-[var(--google-blue)]/20 to-[var(--google-blue)]/5",
          "from-[var(--google-red)]/20 to-[var(--google-red)]/5",
          "from-[var(--google-yellow)]/20 to-[var(--google-yellow)]/5",
          "from-[var(--google-green)]/20 to-[var(--google-green)]/5",
          "from-purple-500/20 to-purple-500/5",
          "from-pink-500/20 to-pink-500/5",
          "from-indigo-500/20 to-indigo-500/5",
          "from-orange-500/20 to-orange-500/5",
          "from-teal-500/20 to-teal-500/5",
        ]
        const colorClass = colors[index % colors.length]

        return (
          <motion.div key={chapter.id} variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link href={`/chapter/${chapter.id}`} className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl">
              <Card className="h-full group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-white/40 dark:hover:border-white/20">
                <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="p-6 relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 transition-colors">{chapter.titre}</h3>
                    <p className="text-sm text-muted-foreground">
                      {chapter.questions.length} question{chapter.questions.length > 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center text-sm font-medium text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Réviser <span className="ml-1">→</span>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
