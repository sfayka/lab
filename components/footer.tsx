import Link from "next/link"

export function Footer() {
  return (
    <footer className="max-w-2xl mx-auto px-6 py-12 border-t border-border">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Knox Analytics
        </p>
        <div className="flex items-center gap-6">
          <Link
            href="https://knoxanalytics.com"
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            knoxanalytics.com
          </Link>
          <Link
            href="https://github.com/knoxanalytics"
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  )
}
