export interface Player {
  id: string;
  name: string;
  goals: number;
}

export interface Team {
  id: string;
  name: string;
  players: Player[];
  totalGoals: number;
}

export interface Game {
  status: string;
  id: string;
  date: Date;
  team1: Team;
  team2: Team;
  isFinished: boolean;
}
