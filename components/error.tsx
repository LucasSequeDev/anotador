'use client'

import { useEffect } from 'react'
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-4 bg-black text-white p-4">
      <h2 className="text-xl font-bold">Algo salió mal</h2>
      <Button
        onClick={reset}
        className="bg-green-600 hover:bg-green-700"
      >
        Intentar de nuevo
      </Button>
    </div>
  )
}

