import { Github } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="py-8 px-4 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center">
        <div className="flex items-center gap-2 mb-2">
          <p className="text-gray-600 dark:text-gray-400">Aymane Haibout © {new Date().getFullYear()}</p>
          <Link
            href="https://github.com/aymane-hbt"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-navy-600 dark:text-gray-400 dark:hover:text-navy-400 transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </Link>
        </div>
      </div>
    </footer>
  )
}
