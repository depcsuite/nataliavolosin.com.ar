export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="space-y-4 text-center">
        <div className="h-8 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  )
}
