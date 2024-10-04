"use client";

import React, { useState, useEffect } from "react";

const Lekseliste = () => {
  const lekseEksempel = ["Lekse 1", "Lekse 2", "Lekse 3"];
  localStorage.setItem("lekser", JSON.stringify(lekseEksempel));

  const [lekser, setLekser] = useState([]);

  useEffect(() => {
    const lekser = localStorage.getItem("lekser");
    if (lekser) {
      setLekser(JSON.parse(lekser));
    }
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2">
        {lekser.map((lekse) => (
          <div className="flex flex-row gap-2">
            <input type="checkbox" />
            <p>{lekse}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Lekseliste;
