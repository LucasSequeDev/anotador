"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowBigLeftDashIcon, Trash } from "lucide-react";
import { Player, Team } from "../types/game";
import { useRouter } from "next/navigation";
import { useGame } from "@/hooks/useGame";

interface TeamSetupProps {
  onNext: (team: Team) => void;
  team: Team;
  othersTeam: Team[] | null;
  gameId: string;
}

export default function TeamSetup({
  onNext,
  team,
  othersTeam,
  gameId,
}: TeamSetupProps) {
  const router = useRouter();
  const [newTeam, setTeam] = useState<Team>({ ...team });
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayer, setNewPlayer] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const { deleteGameById } = useGame();

  useEffect(() => {
    setPlayers([]);
    setTeam(team);
  }, [team]);

  const validateTeamName = (name: string) => {
    if (name.trim() === "") {
      setNameError("El nombre del equipo no puede estar vacío");
      return false;
    }
    if (othersTeam) {
      othersTeam.forEach((otherTeam) => {
        if (otherTeam.name && name.trim() === otherTeam.name.trim()) {
          setNameError("Los nombres de los equipos no pueden ser iguales");
          return false;
        }
      });
    }
    setNameError(null);
    return true;
  };

  const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    validateTeamName(newName);
    setTeam({ ...newTeam, name: newName });
  };

  const addPlayer = () => {
    if (newPlayer.trim()) {
      setPlayers([
        ...players,
        { id: Date.now().toString(), name: newPlayer, goals: 0 },
      ]);
      setNewPlayer("");
    }
  };

  const handleNext = () => {
    if (validateTeamName(newTeam.name)) {
      onNext({
        ...team,
        ...newTeam,
        players,
        totalGoals: 0,
      });
    }
  };

  const removePlayer = (id: string) => {
    setPlayers(players.filter((player) => player.id !== id));
  };

  const handleBack = () => {
    deleteGameById(gameId);
    router.push("/");
  };

  return (
    <div className="h-[484px] w-[396px] bg-black text-white p-4 flex flex-col gap-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Creador de equipo</h1>
          <Button onClick={handleBack} className="p-4">
            <ArrowBigLeftDashIcon className="h-2 w-10" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Input
            value={newTeam.name}
            onChange={handleTeamNameChange}
            placeholder="Nombre del equipo"
            className={`bg-gray-800 border-none text-white h-15 text-3xl ${
              nameError ? "border-red-500" : ""
            }`}
          />
        </div>
        {nameError && <p className="text-red-500 text-base">{nameError}</p>}
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Input
            value={newPlayer}
            onChange={(e) => setNewPlayer(e.target.value)}
            placeholder="Nombre jugador"
            className="bg-gray-200 border-none text-slate-700  h-12 text-2xl "
          />
          <Button onClick={addPlayer} className="bg-violet-600 h-12 w-20">
            +
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto gap-1 flex flex-col">
        {players.map((player, index) => (
          <div
            key={player.id}
            className="flex items-center gap-2 p-2 bg-gray-800 rounded-lg"
          >
            <span className="text-purple-400 text-xl">
              {index + 1}. {player.name}
            </span>
            <Button
              size="icon"
              variant="destructive"
              className="ml-auto h-12 w-16"
              onClick={() => removePlayer(player.id)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button
        onClick={handleNext}
        disabled={players.length === 0 || !!nameError}
        className="w-full bg-green-600 hover:bg-green-700 h-16 text-3xl"
      >
        Siguiente
      </Button>
    </div>
  );
}
