"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function MainMenu() {
  const router = useRouter();

  return (
    <div className="h-full w-full bg-black text-white p-4 flex flex-col gap-4">
      <h1 className="text-center w-full text-5xl py-6">Anotador ⚽</h1>
      <Button
        className="w-full bg-green-600 hover:bg-green-700 text-white text-3xl h-20"
        onClick={() => router.push("/new-game")}
      >
        Crear Partido
      </Button>
      <Button
        className="w-full bg-gray-800 hover:bg-gray-700 text-white text-3xl h-20"
        onClick={() => router.push("/history")}
      >
        Ver historial
      </Button>
    </div>
  );
}