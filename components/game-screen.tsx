"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Game } from "../types/game";
import { useRouter } from "next/navigation";
import { ArrowBigLeftDashIcon, Minus, Plus } from "lucide-react";

interface GameScreenProps {
  initialGame: Game;
}

export default function GameScreen({ initialGame }: GameScreenProps) {
  const [game, setGame] = useState({ ...initialGame });

  useEffect(() => {
    try {
      const savedGames = JSON.parse(
        localStorage.getItem("games") || "[]"
      ) as Game[];

      const gameIndex = savedGames.findIndex((g: Game) => g.id === game.id);

      if (gameIndex === -1)
        return localStorage.setItem("games", JSON.stringify([game]));

      savedGames[gameIndex] = game;

      localStorage.setItem("games", JSON.stringify(savedGames));
    } catch (error) {
      console.error("Error saving game:", error);
    }
  }, [game]);

  const router = useRouter();

  const incrementGoalTeam1 = (teamId: string, playerId: string) => {
    const { team1 } = game;

    const team = team1.id === teamId ? team1 : null;

    if (!team) return;

    const player = team.players.findIndex((p) => p.id === playerId);

    if (player === -1) return;

    team.players[player].goals += 1;
    team.totalGoals += 1;

    setGame({
      ...game,
      team1: team,
    });
  };

  const incrementGoalTeam2 = (teamId: string, playerId: string) => {
    const { team2 } = game;

    const team = team2.id === teamId ? team2 : null;

    if (!team) return;

    const player = team.players.findIndex((p) => p.id === playerId);

    if (player === -1) return;

    team.players[player].goals += 1;
    team.totalGoals += 1;

    setGame({
      ...game,
      team2: team,
    });
  };

  const decrementGoalTeam1 = (teamId: string, playerId: string) => {
    const { team1 } = game;

    const team = team1.id === teamId ? team1 : null;

    if (!team) return;

    const player = team.players.findIndex((p) => p.id === playerId);

    if (player === -1) return;

    team.players[player].goals -= 1;
    team.totalGoals -= 1;

    setGame({
      ...game,
      team1: team,
    });
  };

  const decrementGoalTeam2 = (teamId: string, playerId: string) => {
    const { team2 } = game;

    const team = team2.id === teamId ? team2 : null;

    if (!team) return;

    const player = team.players.findIndex((p) => p.id === playerId);

    if (player === -1) return;

    team.players[player].goals -= 1;
    team.totalGoals -= 1;

    setGame({
      ...game,
      team2: team,
    });
  };

  const handleFinish = () => {
    const finishedGame = { ...game, isFinished: true, status: "Terminado" };
    setGame(finishedGame);
    router.push("/history");
  };

  return (
    <div className="h-[484px] w-[396px] bg-black text-white p-4 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Anotador</h1>
        <Button onClick={() => router.push("/")} className="p-2">
          <ArrowBigLeftDashIcon className="h-1 w-1" />
        </Button>
      </div>
      <div className="flex justify-between gap-2">
        <div className="text-center w-1/2 bg-purple-300 rounded-md text-purple-900">
          <h2 className="text-sm">{game.team1.name}</h2>
          <div className="text-2xl font-bold">{game.team1.totalGoals}</div>
        </div>
        <div className="text-center w-1/2 bg-blue-300 rounded-md text-blue-900">
          <h2 className="text-sm">{game.team2.name}</h2>
          <div className="text-2xl font-bold">{game.team2.totalGoals}</div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-3 overflow-y-auto">
        <div className="flex flex-col gap-1">
          {game.team1.players.map((player) => (
            <div
              key={player.id}
              className="flex items-center bg-purple-600/20 rounded-lg p-2"
            >
              <span className="flex-1 text-sm">{player.name}</span>
              <div className="flex items-center gap-1">
                <Button
                  size="icon"
                  type="button"
                  variant="ghost"
                  className="h-8 w-8 bg-purple-600 hover:bg-purple-700"
                  onClick={() => decrementGoalTeam1(game.team1.id, player.id)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-6 text-center">{player.goals}</span>
                <Button
                  size="icon"
                  type="button"
                  variant="ghost"
                  className="h-8 w-8 bg-purple-600 hover:bg-purple-700"
                  onClick={() => incrementGoalTeam1(game.team1.id, player.id)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {game.team2.players.map((player) => (
            <div
              key={player.id}
              className="flex items-center bg-blue-600/20 rounded-lg p-2"
            >
              <span className="flex-1 text-sm">{player.name}</span>
              <div className="flex items-center gap-1">
                <Button
                  size="icon"
                  type="button"
                  variant="ghost"
                  className="h-8 w-8 bg-blue-600 hover:bg-blue-700"
                  onClick={() => decrementGoalTeam2(game.team2.id, player.id)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-6 text-center">{player.goals}</span>
                <Button
                  size="icon"
                  type="button"
                  variant="ghost"
                  className="h-8 w-8 bg-blue-600 hover:bg-blue-700"
                  onClick={() => incrementGoalTeam2(game.team2.id, player.id)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button
        onClick={handleFinish}
        className="w-full bg-red-600 hover:bg-red-700 mt-auto  h-16 text-3xl"
      >
        Terminar
      </Button>
    </div>
  );
}
