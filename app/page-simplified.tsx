import TaskTrackerSimplified from "@/components/task-tracker-simplified"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800 dark:text-white">Task Tracker</h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-10">Organize your tasks efficiently</p>
        <TaskTrackerSimplified />
      </div>
    </main>
  )
}
