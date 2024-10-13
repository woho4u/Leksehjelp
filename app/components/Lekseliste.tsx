"use client";

import React, { useState, useEffect, useRef } from "react";
import AddLekse from "./AddLekse";
// import Lekse from "./Lekse";

const Lekseliste = () => {
   const [lekser, setLekser] = useState<string[]>(() => {
      const storedLekser = localStorage.getItem("lekser");
      return storedLekser ? JSON.parse(storedLekser) : [];
   });
   // const [editState, setEditState] = useState(false);
   const [editingLekse, setEditingLekse] = useState<number | undefined>(undefined);
   const [editingText, setEditingText] = useState<string>("");

   useEffect(() => {
      localStorage.setItem("lekser", JSON.stringify(lekser));
   }, [lekser]);

   const addLekse = (lekse: string) => {
      setLekser([...lekser, lekse]);
   };
   const completeLekse = (lekse: string) => {
      setLekser(lekser.filter((item) => item !== lekse));
   };
   const startEditingLekse = (index: number) => {
      if (editingLekse === index) {
         // Cancel editing
         setEditingLekse(undefined);
         setEditingText("");
      } else {
         // Start editing
         setEditingLekse(index);
         setEditingText(lekser[index]);
      }
   };
   const saveLekse = () => {
      if (editingLekse !== undefined) {
         const updatedLekser = [...lekser];
         updatedLekser[editingLekse] = editingText;
         setLekser(updatedLekser);
         setEditingLekse(undefined);
         setEditingText("");
      }
   };

   //
   //
   //
   //
   //LEKSE COMPONENT--------------------
   interface LekseProps {
      lekse: string;
      index: number;
      onCompletetion: (lekse: string) => void;
      onEdit: (index: number) => void;
      onSave: () => void;
   }
   const Lekse = ({ lekse, index, onCompletetion, onEdit, onSave }: LekseProps) => {
      const inputRef = useRef<HTMLInputElement>(null);

      useEffect(() => {
         // Focus the input when editing starts
         if (editingLekse === index && inputRef.current) {
            inputRef.current.focus();
         }
      }, [editingLekse, index]);

      const handleCompletion = () => {
         onCompletetion(lekse);
      };
      const handleLekseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
         setEditingText(e.target.value);
      };
      return (
         <div className="flex flex-row space-bet place-content-between">
            <div className="flex flex-row gap-2">
               <input type="checkbox" onChange={handleCompletion} />
               {editingLekse === index ? (
                  <input
                     ref={inputRef}
                     type="text"
                     value={editingText}
                     onChange={handleLekseChange}
                  />
               ) : (
                  <p>{lekse}</p>
               )}
            </div>

            {editingLekse === index ? (
               <>
                  <button className="right-0" onClick={onSave}>
                     Save
                  </button>
                  <button className="right-0" onClick={() => onEdit(index)}>
                     Cancel
                  </button>
               </>
            ) : (
               <button className="right-0" onClick={() => onEdit(index)}>
                  Edit
               </button>
            )}
         </div>
      );
   };

   //LEKSE LISTE -----------
   return (
      <div style={{ width: "35rem" }} className="flex flex-col gap-2 p-8 bg-gray-300/70 rounded-lg">
         {lekser.map((lekse, index) => (
            <Lekse
               index={index}
               lekse={lekse}
               onCompletetion={completeLekse}
               onEdit={startEditingLekse}
               onSave={saveLekse}
            />
         ))}
         <AddLekse onAdd={addLekse} />
      </div>
   );
};

export default Lekseliste;
