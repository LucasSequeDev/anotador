import GameScreen from "@/components/game-screen";
import { Suspense } from "react";

export default function MatchPage() {
  return (
    <Suspense>
      <GameScreen />
    </Suspense>
  );
}
