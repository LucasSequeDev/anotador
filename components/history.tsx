"use client";

import { useRouter } from "next/navigation";
import { Game } from "../types/game";
import { Button } from "@/components/ui/button";

interface HistoryProps {
  games?: Game[];
}

export default function History({ games = [] }: HistoryProps) {
  const router = useRouter();
  if (games.length === 0) {
    return (
      <div className="h-[484px] w-[396px] bg-black text-white p-4 flex items-center justify-center flex-col gap-4">
        <p className="text-gray-400">No hay partidos registrados</p>
        <Button
          className="w-full bg-gray-800 hover:bg-gray-700 text-white text-3xl h-20"
          onClick={() => router.push("/")}
        >
          Volver
        </Button>
      </div>
    );
  }

  return (
    <div className="h-[484px] w-[396px] bg-black text-white p-4 flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-4">
        {games.map((game) => (
          <div key={game.id} className="mb-4 p-3 bg-gray-800 rounded-lg">
            <div className="text-xs text-gray-400 flex justify-between">
              {new Date(game.date).toLocaleDateString()}
              <div className="rounded-2xl bg-card-foreground px-3 py-1">
                {game.status}
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <div className="text-center">
                <div className="font-bold">{game.team1.name}</div>
                <div className="text-xl">{game.team1.totalGoals}</div>
              </div>
              <div className="text-xl font-bold">vs</div>
              <div className="text-center">
                <div className="font-bold">{game.team2.name}</div>
                <div className="text-xl">{game.team2.totalGoals}</div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-sm text-gray-400">Goles</div>
              <div className="flex justify-between mt-2">
                <div>
                  {game.team1.players.map((player) => (
                    <div key={player.id} className="flex items-center gap-1">
                      <span>{player.name}</span>
                      <span>{player.goals}</span>
                    </div>
                  ))}
                </div>
                <div>
                  {game.team2.players.map((player) => (
                    <div key={player.id} className="flex items-center gap-1">
                      <span>{player.name}</span>
                      <span>{player.goals}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant="secondary"
                onClick={() => router.push(`/new-game?id=${game.id}`)}
              >
                Ver
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Button
        className="w-full bg-gray-800 hover:bg-gray-700 text-white text-3xl h-16"
        onClick={() => router.push("/")}
      >
        Volver
      </Button>
    </div>
  );
}
