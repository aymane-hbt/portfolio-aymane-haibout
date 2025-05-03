"use client"

import { CheckCircle, Clock, BarChart2, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface Task {
  id: string
  title: string
  completed: boolean
  priority: "low" | "medium" | "high"
  createdAt: Date
  dueDate?: Date | null
}

interface TaskStatsProps {
  tasks: Task[]
}

export default function TaskStats({ tasks }: TaskStatsProps) {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.completed).length
  const activeTasks = totalTasks - completedTasks
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const highPriorityTasks = tasks.filter((task) => task.priority === "high" && !task.completed).length

  // Calculate overdue tasks
  const overdueTasks = tasks.filter((task) => task.dueDate && !task.completed && new Date() > task.dueDate).length

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Tasks</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{activeTasks}</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {completedTasks} <span className="text-sm font-normal text-gray-500">({completionRate}%)</span>
              </h3>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <BarChart2 className="h-8 w-8 text-red-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">High Priority</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{highPriorityTasks}</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-amber-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Overdue</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{overdueTasks}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
