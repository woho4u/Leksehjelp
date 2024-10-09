import React, { useState, useEffect } from "react";

interface LekseProps {
  lekse: string;
  onRemove: (lekse: string) => void;
  changeLekser: (lekse: string[]) => void;
  isEditing: boolean;
  currentLekser: string[];
}

const Lekse = ({
  lekse,
  onRemove,
  changeLekser,
  isEditing,
  currentLekser,
}: LekseProps) => {
  const [newLekse, setNewLekse] = useState(lekse);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      onRemove(lekse);
    }
  };

  //replace l
  useEffect(() => {
    console.log("newLekse: ", newLekse);
  }, [newLekse]);

  //Change New Lekse
  const handleLekseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLekse(e.target.value);
    console.log("");
    console.log("Lekse changed to: ", newLekse);
  };

  return (
    <div className="flex flex-row gap-2">
      <input type="checkbox" onChange={handleChange} />
      {isEditing ? (
        <input type="text" value={newLekse} onChange={handleLekseChange} />
      ) : (
        <p>{lekse}</p>
      )}
    </div>
  );
};

export default Lekse;
