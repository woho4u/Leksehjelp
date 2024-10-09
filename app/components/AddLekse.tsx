import React, { useState } from "react";

interface AddLekseProps {
  onAdd: (lekse: string) => void;
}

const AddLekse = ({ onAdd }: AddLekseProps) => {
  const [lekse, setLekse] = useState("");

  const handleAddLekse = () => {
    if (lekse) {
      onAdd(lekse);
      setLekse("");
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Legg til leksen"
          onChange={(e) => setLekse(e.target.value)}
          value={lekse}
        />
        <button onClick={handleAddLekse}>Legg til</button>
      </div>
    </div>
  );
};

export default AddLekse;
