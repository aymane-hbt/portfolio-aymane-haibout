import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Kontakt</h2>
        <div className="max-w-md mx-auto space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-navy-600 dark:text-navy-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">E-Mail</p>
                  <p className="text-gray-800 dark:text-white">Aymanehaibout00@gmail.com</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-navy-600 dark:text-navy-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Telefon</p>
                  <p className="text-gray-800 dark:text-white">+49 15563312678</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-navy-600 dark:text-navy-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Standort</p>
                  <p className="text-gray-800 dark:text-white">Rüsselsheim, Deutschland</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
