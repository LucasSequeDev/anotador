import { useGameStore } from "@/store/useGameStore";
import { Game, Team } from "@/types/game";

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

export function useGame() {
  const {
    setGames,
    games,
    saveCurrentGame,
    currentGame,
    resetGames,
    resetCurrentGame,
  } = useGameStore();

  const loadGames = () => {};

  const findGameById = (id: string) => {
    const existGame = games.find((game: Game) => game.id === id);

    if (existGame) saveCurrentGame(existGame);
  };

  const updateTeam = (team: Team) => {
    if (!currentGame) throw new Error("Current game is empty.");

    const { teams } = currentGame;

    const teamIndexFound = teams.findIndex((t) => t.id === team.id);

    if (teamIndexFound === -1) throw new Error("Team not found.");

    teams[teamIndexFound] = team;

    saveCurrentGame({ ...currentGame, teams: [...teams] });
  };

  const createGame = () => {
    if (currentGame) return;

    const newGame: Game = {
      id: Date.now().toString(),
      date: new Date(),
      teams: [DEFAULT_TEAM_1, DEFAULT_TEAM_2],
      isFinished: false,
      status: "Creado",
    };

    setGames([...games, newGame]);
    saveCurrentGame(newGame);
  };

  const playGame = () => {
    if (!currentGame) return;
    const startedGame = {
      ...currentGame,
      status: "Jugando",
    };
    saveCurrentGame(startedGame);

    const newGames = games.filter((game) => game.id !== currentGame.id);

    setGames([...newGames, startedGame]);
  };

  const finishGame = () => {
    if (!currentGame) return;

    let result = "";

    if (!currentGame.teams || currentGame.teams.length === 0) {
      result = "No hay equipos";
    }

    // 1. Encontrar la mayor cantidad de goles.
    const maxGoles = Math.max(...currentGame.teams.map((t) => t.totalGoals));

    // 2. Filtrar los equipos que tienen la mayor cantidad de goles.
    const equiposGanadores = currentGame.teams.filter(
      (t) => t.totalGoals === maxGoles
    );

    // 3. Verificar si solo hay un equipo con esa cantidad de goles.
    if (equiposGanadores.length === 1) {
      // Si es solo uno, devolvemos el ganador.
      result = `Ganador ${equiposGanadores[0].name}`;
    } else {
      // Si hay más de uno, hay un empate.
      result = "Empate";
    }

    const finishedGame = {
      ...currentGame,
      isFinished: true,
      result,
      status: "Terminado",
    };
    saveCurrentGame(finishedGame);

    const newGames = games.filter((game) => game.id !== currentGame.id);

    setGames([...newGames, finishedGame]);
  };

  const deleteGames = () => {
    resetGames();
    resetCurrentGame();
  };

  const deleteGameById = (id: string) => {
    console.log({ id });
    console.log({ games });
    const finalGames = games.filter((game) => game.id !== id);
    console.log({ finalGames });

    setGames(finalGames);
    resetCurrentGame();
  };

  const resetGame = () => {
    resetCurrentGame();
  };

  return {
    loadGames,
    games,
    findGameById,
    currentGame,
    updateTeam,
    deleteGames,
    deleteGameById,
    createGame,
    playGame,
    finishGame,
    resetGame,
  };
}
