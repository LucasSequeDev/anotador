"use client";
import { useEffect, useState } from "react";
import TeamSetup from "@/components/team-setup";
import { Team } from "@/types/game";

import { useGame } from "@/hooks/useGame";
import { useRouter } from "next/navigation";

const MAX_TEAMS = 2;

export const StepNewGame = () => {
  const { currentGame, createGame, updateTeam, playGame } = useGame();
  const [step, setStep] = useState(1);
  const router = useRouter();

  useEffect(() => {
    if (!currentGame) {
      return createGame();
    }
  }, []);

  useEffect(() => {
    if (currentGame?.status === "Jugando") {
      router.push(`/match?id=${currentGame.id}`);
    }
  }, [currentGame]);

  const onNext = (team: Team) => {
    updateTeam(team);

    if (step === MAX_TEAMS) {
      return playGame();
    }
    setStep((prev) => {
      return prev + 1;
    });
  };

  if (!currentGame) return "No existe partido creado";

  return (
    <TeamSetup
      onNext={onNext}
      team={currentGame.teams[step - 1]}
      othersTeam={currentGame.teams.filter(
        (team) => team.id === currentGame.teams[step - 1].id
      )}
      gameId={currentGame.id}
    />
  );
};
