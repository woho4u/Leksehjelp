import React, { useState, useEffect } from "react";

interface LekseProps {
   lekse: string;
   onRemove: (lekse: string) => void;
   changeLekser: (lekse: string[]) => void;
   isEditing: boolean;
   currentLekser: string[];
   index: number;
}

const Lekse = ({ lekse, onRemove, changeLekser, isEditing, currentLekser, index }: LekseProps) => {
   const [newLekse, setNewLekse] = useState(lekse);

   console.log(newLekse);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
         onRemove(lekse);
         setNewLekse(lekse);
      }
   };

   //replace l
   useEffect(() => {
      console.log("");

      currentLekser[index] = newLekse;

      changeLekser(currentLekser);
   }, [newLekse]);

   //Change New Lekse
   const handleLekseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewLekse(e.target.value);
   };

   return (
      <div className="flex flex-row gap-2">
         <input type="checkbox" onChange={handleChange} />
         {isEditing ? <input type="text" value={newLekse} onChange={handleLekseChange} /> : <p>{lekse}</p>}
      </div>
   );
};

export default Lekse;
