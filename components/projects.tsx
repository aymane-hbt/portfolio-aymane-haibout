import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Meine Projekte</h2>
        <div className="max-w-md mx-auto">
          <ProjectCard
            title="Task Tracker"
            description="Eine Anwendung zur Verwaltung von Aufgaben mit Prioritäten und Fälligkeitsdaten. Mein erstes Projekt mit React und Next.js."
            image="/placeholder.svg?height=200&width=400"
            tags={["React", "Next.js", "Tailwind CSS"]}
            demoLink="https://task-tracker-haibout.vercel.app/"
            codeLink="https://github.com/aymane-hbt/task-track-1.git"
          />
        </div>
      </div>
    </section>
  )
}

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  demoLink: string
  codeLink: string
}

function ProjectCard({ title, description, image, tags, demoLink, codeLink }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 w-full">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="border-navy-200 text-navy-800 dark:border-navy-800 dark:text-navy-300"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <div className="flex gap-4">
          <Button size="sm" className="bg-navy-700 hover:bg-navy-800" asChild>
            <Link href={demoLink} target="_blank">
              <ExternalLink className="h-4 w-4 mr-2" />
              Demo
            </Link>
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-navy-700 text-navy-700 hover:bg-navy-50 dark:border-navy-400 dark:text-navy-400 dark:hover:bg-navy-900"
            asChild
          >
            <Link href={codeLink} target="_blank">
              <Github className="h-4 w-4 mr-2" />
              Code
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
