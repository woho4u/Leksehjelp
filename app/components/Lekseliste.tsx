"use client";

import React, { useState, useEffect } from "react";
import AddLekse from "./AddLekse";
import Lekse from "./Lekse";

const Lekseliste = () => {
   const [lekser, setLekser] = useState<string[]>(["Lekse 1", "Lekse 2", "Lekse 3"]); // Explicitly define the type
   const [isEditing, setIsEditing] = useState(false);
   const [newLekser, setNewLekser] = useState<string[]>([]);

   useEffect(() => {
      localStorage.setItem("lekser", JSON.stringify(lekser));
   }, [lekser]);

   useEffect(() => {
      const storedLekser = localStorage.getItem("lekser");
      let parsedLekser: string[] = [];
      console.log("storedLekser", storedLekser);

      if (storedLekser) {
         try {
            parsedLekser = JSON.parse(storedLekser);
         } catch (error) {
            console.error("Error parsing stored lekser:", error);
            parsedLekser = [];
         }
      }
      console.log("parsedLekser", parsedLekser);
   }, []);

   const removeLekse = (lekseToRemove: string) => {
      setLekser((prevLekser) => {
         const updatedLekser = prevLekser.filter((lekse) => lekse !== lekseToRemove);
         return updatedLekser;
      });
   };

   const addLekse = (lekse: string) => {
      setLekser((prevLekser) => {
         const updatedLekser = [...prevLekser, lekse];
         return updatedLekser;
      });
   };

   const handleEdit = () => {
      setIsEditing(!isEditing);
   };

   const saveLekser = () => {
      setLekser(newLekser);
      setIsEditing(false);
   };

   const changeLekser = (lekser: string[]) => {
      setNewLekser(lekser);
   };

   return (
      <div className="flex flex-col gap-2">
         <button className="w-fit" onClick={handleEdit}>
            Rediger
         </button>
         <button className="w-fit" onClick={saveLekser}>
            Lagre
         </button>

         {lekser.map((lekse, index) => (
            <Lekse
               changeLekser={changeLekser}
               currentLekser={lekser}
               isEditing={isEditing}
               key={index}
               index={index}
               lekse={lekse}
               onRemove={removeLekse}
            />
         ))}
         <AddLekse onAdd={addLekse} />
      </div>
   );
};

export default Lekseliste;
