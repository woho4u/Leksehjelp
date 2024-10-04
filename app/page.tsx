import Image from "next/image";
import Lekseliste from "./components/Lekseliste";

export default function Home() {
  return (
    <div className="p-28">
      <main className="flex flex-col w-full gap-8 row-start-2">
        <Lekseliste />
      </main>
    </div>
  );
}
