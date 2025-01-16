import { StepNewGame } from "@/components/step-new-game";
import { Suspense } from "react";

export default function NewGamePage() {
  return (
    <Suspense>
      <StepNewGame />
    </Suspense>
  );
}
