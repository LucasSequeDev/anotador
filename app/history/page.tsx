'use client'

import { useEffect, useState } from "react"
import History from "@/components/history"
import { Game } from "@/types/game"

export default function HistoryPage() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    // Load games from localStorage
    const savedGames = JSON.parse(localStorage.getItem('games') || '[]')
    setGames(savedGames)
  }, [])

  return <History games={games} />
}

