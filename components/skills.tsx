import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Layout, Code, BookOpen } from "lucide-react"

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Meine Fähigkeiten</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <SkillCard
            title="Grundlagen"
            icon={<BookOpen className="h-8 w-8 text-navy-600" />}
            skills={["HTML", "CSS", "JavaScript Basics", "Responsive Design"]}
            description="Ich habe grundlegende Kenntnisse in HTML und CSS sowie erste Erfahrungen mit JavaScript. Ich kann einfache Webseiten erstellen und verstehe die Grundprinzipien des responsiven Designs."
          />
          <SkillCard
            title="Werkzeuge"
            icon={<Code className="h-8 w-8 text-navy-600" />}
            skills={["VS Code", "GitHub", "Vercel", "Chrome DevTools"]}
            description="Ich kann mit VS Code arbeiten, kenne die Grundlagen von Git und GitHub und habe Erfahrung mit dem Deployment von Webseiten über Vercel. Die Chrome DevTools helfen mir bei der Fehlersuche."
          />
          <SkillCard
            title="Lernziele"
            icon={<Layout className="h-8 w-8 text-navy-600" />}
            skills={["React", "Tailwind CSS", "Next.js", "TypeScript"]}
            description="Ich habe erste Erfahrungen mit React und Tailwind CSS gesammelt und möchte meine Kenntnisse in diesen Bereichen sowie in Next.js und TypeScript während meiner Ausbildung vertiefen."
          />
        </div>
      </div>
    </section>
  )
}

interface SkillCardProps {
  title: string
  icon: React.ReactNode
  skills: string[]
  description: string
}

function SkillCard({ title, icon, skills, description }: SkillCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="flex items-center mb-4">
          {icon}
          <h3 className="text-xl font-semibold ml-2 text-gray-800 dark:text-white">{title}</h3>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="bg-navy-100 text-navy-800 dark:bg-navy-900 dark:text-navy-300"
            >
              {skill}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
      </CardContent>
    </Card>
  )
}
