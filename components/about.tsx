import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function About() {
  return (
    <section id="about" className="py-20 px-4 bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Über Mich</h2>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="flex justify-center">
            <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-navy-600 dark:border-navy-400">
              <Image
                src="/images/aymane-photo.jpg"
                alt="Profilbild von Aymane Haibout"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Ich bin ein motivierter Berufseinsteiger mit großem Interesse an der Informationstechnologie. Ich habe
                gerade begonnen, mich mit Webentwicklung zu beschäftigen und lerne kontinuierlich neue Technologien.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Mein Ziel ist es, eine Ausbildung als Fachinformatiker zu beginnen, um meine Fähigkeiten zu entwickeln
                und in einem professionellen Umfeld zu wachsen.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                In meiner Freizeit beschäftige ich mich mit Programmier-Tutorials, arbeite an kleinen Projekten und
                versuche, mein Wissen über moderne Webtechnologien zu erweitern.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
