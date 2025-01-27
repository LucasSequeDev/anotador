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
  result?: string;
  id: string;
  date: Date;
  teams: Team[];
  isFinished: boolean;
}
