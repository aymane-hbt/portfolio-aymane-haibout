"use client"

import { useState, useEffect } from "react"
import { PlusCircle, CheckCircle2, Circle, Trash2, AlertCircle, Calendar, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TaskStats from "@/components/task-stats"

type Priority = "low" | "medium" | "high"

interface Task {
  id: string
  title: string
  completed: boolean
  priority: Priority
  createdAt: Date
  dueDate?: Date | null
}

export default function TaskTracker() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [priority, setPriority] = useState<Priority>("medium")
  const [activeTab, setActiveTab] = useState("all")
  const [dueDate, setDueDate] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState("")

  // Load tasks from localStorage on component mount
  useEffect(() => {
    // Only run on the client side
    if (typeof window !== "undefined") {
      const savedTasks = localStorage.getItem("tasks")
      if (savedTasks) {
        try {
          // Parse the saved tasks and convert string dates back to Date objects
          const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
            ...task,
            createdAt: new Date(task.createdAt),
            dueDate: task.dueDate ? new Date(task.dueDate) : null,
          }))
          setTasks(parsedTasks)
        } catch (error) {
          console.error("Failed to parse saved tasks:", error)
        }
      }
    }
  }, [])

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tasks", JSON.stringify(tasks))
    }
  }, [tasks])

  const addTask = () => {
    if (newTaskTitle.trim() === "") return

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      completed: false,
      priority,
      createdAt: new Date(),
      dueDate: dueDate ? new Date(dueDate) : null,
    }

    setTasks([...tasks, newTask])
    setNewTaskTitle("")
    setPriority("medium")
    setDueDate("")
  }

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const filteredTasks = tasks
    .filter((task) => {
      // Filter by tab
      if (activeTab === "all") return true
      if (activeTab === "active") return !task.completed
      if (activeTab === "completed") return task.completed
      return true
    })
    .filter((task) => {
      // Filter by search query
      if (!searchQuery.trim()) return true
      return task.title.toLowerCase().includes(searchQuery.toLowerCase())
    })
    // Sort by due date (tasks with due dates first, then by due date)
    .sort((a, b) => {
      // First sort by completion status
      if (a.completed && !b.completed) return 1
      if (!a.completed && b.completed) return -1

      // Then sort by due date
      if (a.dueDate && b.dueDate) {
        return a.dueDate.getTime() - b.dueDate.getTime()
      }
      if (a.dueDate && !b.dueDate) return -1
      if (!a.dueDate && b.dueDate) return 1

      // Finally sort by creation date
      return b.createdAt.getTime() - a.createdAt.getTime()
    })

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  const isTaskOverdue = (task: Task) => {
    if (!task.dueDate || task.completed) return false
    return new Date() > task.dueDate
  }

  const formatDueDate = (date: Date) => {
    return date.toLocaleDateString("de-DE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Task</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <Input
              placeholder="Enter task..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter") addTask()
              }}
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={priority} onValueChange={(value) => setPriority(value as Priority)}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex-1">
                <Input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <Button onClick={addTask} className="w-full sm:w-auto">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Task
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <TaskStats tasks={tasks} />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>My Tasks</CardTitle>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search tasks..."
              className="w-full pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              {filteredTasks.length === 0 ? (
                <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                  <AlertCircle className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p className="text-lg font-medium">No tasks found</p>
                  <p className="text-sm">
                    {searchQuery
                      ? "Try a different search term"
                      : activeTab === "all"
                        ? "Add your first task to get started!"
                        : activeTab === "active"
                          ? "All tasks are completed. Great job!"
                          : "No completed tasks yet."}
                  </p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {filteredTasks.map((task) => (
                    <li
                      key={task.id}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        isTaskOverdue(task)
                          ? "border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-900/20"
                          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                      } shadow-sm transition-all hover:shadow`}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <button
                          onClick={() => toggleTaskCompletion(task.id)}
                          className="flex-shrink-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                          {task.completed ? (
                            <CheckCircle2 className="h-6 w-6 text-green-500" />
                          ) : (
                            <Circle className="h-6 w-6" />
                          )}
                        </button>
                        <div className="min-w-0 flex-1">
                          <p
                            className={`text-sm font-medium truncate ${
                              task.completed
                                ? "line-through text-gray-400 dark:text-gray-500"
                                : isTaskOverdue(task)
                                  ? "text-red-600 dark:text-red-400"
                                  : "text-gray-700 dark:text-gray-200"
                            }`}
                          >
                            {task.title}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Created: {task.createdAt.toLocaleDateString()}
                            </p>
                            {task.dueDate && (
                              <div className="flex items-center text-xs">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span
                                  className={
                                    isTaskOverdue(task) && !task.completed
                                      ? "text-red-500"
                                      : "text-gray-500 dark:text-gray-400"
                                  }
                                >
                                  Due: {formatDueDate(task.dueDate)}
                                  {isTaskOverdue(task) && !task.completed && " (Overdue)"}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <Badge className={`ml-2 ${getPriorityColor(task.priority)}`}>{task.priority}</Badge>
                      </div>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="ml-2 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
