import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  return (
    <header className="max-w-2xl mx-auto px-6 py-8">
      <nav className="flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-semibold text-foreground tracking-tight hover:text-primary transition-colors"
        >
          Knox Lab
        </Link>
        <div className="flex items-center gap-5">
          <Link
            href="https://knoxanalytics.com"
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            knoxanalytics.com →
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
