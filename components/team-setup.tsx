"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { Player, Team } from "../types/game";

interface TeamSetupProps {
  onNext: (team: Team) => void;
  team: Team;
  otherTeam: Team | null;
}

export default function TeamSetup({ onNext, team, otherTeam }: TeamSetupProps) {
  const [newTeam, setTeam] = useState<Team>({ ...team });
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayer, setNewPlayer] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);

  useEffect(() => {
    setPlayers([]);
    setTeam(team);
  }, [team]);

  const validateTeamName = (name: string) => {
    if (name.trim() === "") {
      setNameError("El nombre del equipo no puede estar vacío");
      return false;
    }
    if (otherTeam) {
      if (otherTeam.name && name.trim() === otherTeam.name.trim()) {
        setNameError("Los nombres de los equipos no pueden ser iguales");
        return false;
      }
    }
    setNameError(null);
    return true;
  };

  const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setTeam({ ...newTeam, name: newName });
    validateTeamName(newName);
  };

  const addPlayer = () => {
    if (newPlayer.trim() && players.length < 4) {
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
        players,
        totalGoals: 0,
      });
    }
  };

  return (
    <div className="h-[484px] w-[396px] bg-black text-white p-4 flex flex-col">
      <div className="space-y-2">
        <h1>{newTeam.name}</h1>
        <div className="flex items-center gap-2">
          <Input
            value={newTeam.name}
            onChange={handleTeamNameChange}
            className={`bg-gray-800 border-none text-white ${
              nameError ? "border-red-500" : ""
            }`}
          />
          <Button size="icon" variant="ghost" className="bg-gray-800">
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
        {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 my-4">
        {players.map((player) => (
          <div
            key={player.id}
            className="flex items-center gap-2 p-2 bg-gray-800 rounded-lg"
          >
            <span className="text-purple-400">{player.name}</span>
            <Button size="icon" variant="ghost" className="ml-auto">
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="space-y-4 mt-auto">
        <div className="flex items-center gap-2">
          <Input
            value={newPlayer}
            onChange={(e) => setNewPlayer(e.target.value)}
            placeholder="Nombre jugador"
            className="bg-gray-800 border-none text-white"
            onKeyPress={(e) => e.key === "Enter" && addPlayer()}
          />
          <Button
            onClick={addPlayer}
            disabled={players.length >= 4}
            className="bg-gray-800"
          >
            +
          </Button>
        </div>

        <Button
          onClick={handleNext}
          disabled={players.length === 0 || !!nameError}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
