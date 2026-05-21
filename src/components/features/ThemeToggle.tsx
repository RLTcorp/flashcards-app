"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/Button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="glass" size="icon" aria-label="Toggle theme">
        <span className="w-5 h-5" />
      </Button>
    )
  }

  return (
    <Button
      variant="glass"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Moon className="w-5 h-5 text-slate-200" />
      ) : (
        <Sun className="w-5 h-5 text-slate-800" />
      )}
    </Button>
  )
}
