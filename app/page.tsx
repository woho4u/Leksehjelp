import Image from "next/image";
import Lekseliste from "./components/Lekseliste";

export default function Home() {
   return (
      <div className="p-28">
         <main className="flex justify-center">
            <Lekseliste />
         </main>
      </div>
   );
}
