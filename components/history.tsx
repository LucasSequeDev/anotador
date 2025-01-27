"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { useGame } from "@/hooks/useGame";
import { Link } from "./ui/link";
import { Fragment } from "react";

export default function History() {
  const { games } = useGame();
  const router = useRouter();

  // const getScoreColor = (game: Game, teamNumber: 1 | 2) => {
  //   const team = teamNumber === 1 ? game.team1 : game.team2;
  //   const otherTeam = teamNumber === 1 ? game.team2 : game.team1;

  //   if (team.totalGoals > otherTeam.totalGoals) return "text-green-400";
  //   if (team.totalGoals < otherTeam.totalGoals) return "text-red-400";
  //   return "text-gray-400";
  // };

  if (games.length === 0) {
    return (
      <div className="h-[484px] w-[396px] bg-black text-white p-6 flex flex-col items-center justify-center gap-6">
        <div className="text-center space-y-2">
          <Trophy className="w-12 h-12 mx-auto text-yellow-500 mb-4 opacity-20" />
          <h2 className="text-xl font-semibold text-gray-300">
            Sin partidos registrados
          </h2>
          <p className="text-sm text-gray-500">
            Los partidos que registres aparecerán aquí
          </p>
        </div>
        <Link
          href={"/"}
          variant="outline"
          className="bg-transparent border-gray-800 text-gray-300 hover:bg-gray-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="h-[484px] w-[396px] bg-black text-white p-4 flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-4">
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-gray-900 rounded-xl p-4 hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center text-xs text-gray-500 mb-3">
              <Calendar className="w-3 h-3 mr-1" />
              {new Date(game.date).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>

            <div className="flex items-center justify-between mb-3">
              {game.teams.map((team, index) => {
                return (
                  <Fragment key={team.id}>
                    <div className="text-center flex-1">
                      <p className="font-medium mb-1 truncate">{team.name}</p>
                      <span className="text-2xl font-bold">
                        {team.totalGoals}
                      </span>
                    </div>
                    {index < game.teams.length - 1 && (
                      <div className="px-4">
                        <span className="text-sm font-medium text-gray-600">
                          vs
                        </span>
                      </div>
                    )}
                  </Fragment>
                );
              })}
            </div>

            <div className="flex items-center justify-center text-xs">
              <div
                className={`
              px-2 py-1 rounded-full
              ${
                game.result === "Empate"
                  ? "bg-gray-800 text-gray-400"
                  : "bg-yellow-500/10 text-yellow-500"
              }
            `}
              >
                <div className="flex items-center gap-1">
                  <Trophy className="w-3 h-3" />
                  {game.result}
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-800/50">
              Goleadores
              <div className="grid grid-cols-2 gap-16">
                {game.teams.map((team) => {
                  return (
                    <div key={team.id} className="space-y-1">
                      {team.players
                        .filter((p) => p.goals > 0)
                        .map((player) => (
                          <div
                            key={player.id}
                            className="flex items-center justify-between text-xs text-gray-400"
                          >
                            <span className="truncate">{player.name}</span>
                            <span className="font-mono">{player.goals}</span>
                          </div>
                        ))}
                    </div>
                  );
                })}
              </div>
              <Button
                variant="secondary"
                className="w-full mt-2"
                onClick={() => router.push(`/match?id=${game.id}`)}
              >
                Ver
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
      <Link
        className="w-full bg-gray-800 hover:bg-gray-700 text-white text-3xl h-16"
        href={"/"}
      >
        Volver
      </Link>
    </div>
  );
}
