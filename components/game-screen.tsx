"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowBigLeftDashIcon, Minus, Plus } from "lucide-react";
import { useGame } from "@/hooks/useGame";
import { useEffect } from "react";

export default function GameScreen() {
  const router = useRouter();
  const { currentGame, updateTeam, finishGame, findGameById } = useGame();

  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("id");

    if (!id) return;

    findGameById(id);
  }, [searchParams]);

  const incrementGoal = (teamId: string, playerId: string) => {
    if (!currentGame) return;

    const { teams } = currentGame;

    const findIndexTeam = teams.findIndex((team) => team.id === teamId);

    if (findIndexTeam === -1) return;

    const team = teams[findIndexTeam];

    const findIndexPlayer = team.players.findIndex((p) => p.id === playerId);

    if (findIndexPlayer === -1) return;

    team.players[findIndexPlayer].goals += 1;
    team.totalGoals += 1;

    updateTeam(team);
  };

  const decrementGoal = (teamId: string, playerId: string) => {
    if (!currentGame) return;

    const { teams } = currentGame;

    const findIndexTeam = teams.findIndex((team) => team.id === teamId);

    if (findIndexTeam === -1) return;

    const team = teams[findIndexTeam];

    const findIndexPlayer = team.players.findIndex((p) => p.id === playerId);

    if (findIndexPlayer === -1) return;

    team.players[findIndexPlayer].goals -= 1;
    team.totalGoals -= 1;

    updateTeam(team);
  };

  const handleFinish = () => {
    finishGame();
    router.push("/history");
  };

  if (!currentGame) return <div>No existe el partido</div>;

  return (
    <div className="h-[484px] w-[396px] bg-black text-white p-4 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Anotador</h1>
        <Button onClick={() => router.push("/")} className="p-2">
          <ArrowBigLeftDashIcon className="h-1 w-1" />
        </Button>
      </div>
      <div className="flex justify-between gap-2">
        {currentGame.teams.map((team) => (
          <div
            key={team.id}
            className="text-center w-1/2 bg-blue-300 rounded-md text-blue-900"
          >
            <h2 className="text-sm">{team.name}</h2>
            <div className="text-2xl font-bold">{team.totalGoals}</div>
          </div>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-2 gap-3 overflow-y-auto">
        {currentGame.teams.map((team) => (
          <div key={team.id} className="flex flex-col gap-4">
            {team.players.map((player) => (
              <div
                key={player.id}
                className="flex items-center bg-purple-600/20 rounded-lg p-2"
              >
                <div className="flex flex-col justify-center items-center w-full">
                  <span className="flex-1 text-sm">{player.name}</span>
                  <div className="flex items-center gap-1 w-full">
                    <Button
                      size="icon"
                      type="button"
                      variant="ghost"
                      className="h-8  bg-purple-600 hover:bg-purple-700 w-full"
                      onClick={() => decrementGoal(team.id, player.id)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-6 text-center mx-2">{player.goals}</span>
                    <Button
                      size="icon"
                      type="button"
                      variant="ghost"
                      className="h-8  bg-purple-600 hover:bg-purple-700 w-full"
                      onClick={() => incrementGoal(team.id, player.id)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
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
