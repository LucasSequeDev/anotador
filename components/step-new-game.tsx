"use client";
import { useEffect, useState } from "react";
import TeamSetup from "@/components/team-setup";
import GameScreen from "@/components/game-screen";
import { Team, Game } from "@/types/game";

import { useSearchParams } from "next/navigation";
const DEFAULT_TEAM_1: Team = {
  id: Date.now().toString(),
  name: "Equipo 1",
  players: [],
  totalGoals: 0,
};

const DEFAULT_TEAM_2: Team = {
  id: Date.now().toString() + 1,
  name: "Equipo 2",
  players: [],
  totalGoals: 0,
};

export const StepNewGame = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("id");
    const existGames: Game[] = localStorage.getItem("games")
      ? JSON.parse(localStorage.getItem("games") || "[]")
      : [];
    const existGame = existGames.find((game: Game) => game.id === id);

    if (existGame) {
      setStep(3);
      setTeam1(existGame.team1);
      setTeam2(existGame.team2);
    }
  }, [searchParams]);

  const [step, setStep] = useState(1);
  const [team1, setTeam1] = useState<Team>(DEFAULT_TEAM_1);
  const [team2, setTeam2] = useState<Team>(DEFAULT_TEAM_2);

  const handleTeam1Setup = (team: Team) => {
    setTeam1(team);
    setStep(2);
  };

  const handleTeam2Setup = (team: Team) => {
    setTeam2(team);
    setStep(3);
  };

  if (step === 1) {
    return (
      <TeamSetup onNext={handleTeam1Setup} team={team1} otherTeam={null} />
    );
  }

  if (step === 2) {
    return (
      <TeamSetup onNext={handleTeam2Setup} team={team2} otherTeam={team1} />
    );
  }

  if (step === 3 && team1 && team2) {
    const newGame: Game = {
      id: Date.now().toString(),
      date: new Date(),
      team1,
      team2,
      isFinished: false,
      status: "Jugando",
    };

    return <GameScreen initialGame={newGame} />;
  }

  return null;
};
