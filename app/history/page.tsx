"use client";

import { useEffect } from "react";
import History from "@/components/history";
import { useGame } from "@/hooks/useGame";

export default function HistoryPage() {
  const { loadGames } = useGame();

  useEffect(() => {
    loadGames();
  }, []);

  return <History />;
}
