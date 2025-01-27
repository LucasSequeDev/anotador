"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { useGame } from "@/hooks/useGame";
import { useRouter } from "next/navigation";

export default function MainMenu() {
  const router = useRouter();
  const { deleteGames } = useGame();

  const handleDeleteHistory = () => {
    deleteGames();
    router.refresh();
  };

  return (
    <div className="h-full w-full bg-black text-white p-4 flex flex-col gap-4">
      <h1 className="text-center w-full text-5xl">Anotador 🧮</h1>
      <h2 className="text-center w-full text-xl">Un sentimiento</h2>
      <Link
        className="w-full bg-green-600 hover:bg-green-700 text-white text-3xl h-20"
        href={"/new-game"}
      >
        Crear Partido
      </Link>
      <Link
        className="w-full bg-gray-800 hover:bg-gray-700 text-white text-3xl h-20"
        href={"/history"}
      >
        Ver historial
      </Link>
      <Button
        variant={"destructive"}
        className="w-full  text-white text-3xl h-20"
        onClick={handleDeleteHistory}
      >
        Eliminar historias
      </Button>
    </div>
  );
}
