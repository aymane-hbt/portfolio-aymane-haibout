import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900 px-4">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-800 dark:text-white">
          Hallo, ich bin <span className="text-navy-700 dark:text-navy-400">Aymane Haibout</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300">
          Angehender Fachinformatiker mit Leidenschaft für Webentwicklung
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-navy-700 hover:bg-navy-800 text-white" asChild>
            <Link href="#projects">Meine Projekte</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-navy-700 text-navy-700 hover:bg-navy-50 dark:border-navy-400 dark:text-navy-400 dark:hover:bg-navy-900"
            asChild
          >
            <Link href="#contact">Kontakt</Link>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Link href="#about" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <ArrowDown size={24} />
        </Link>
      </div>
    </section>
  )
}
