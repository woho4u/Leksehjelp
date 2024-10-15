"use client";

import React, { useState, useEffect, useRef } from "react";
import AddLekse from "./AddLekse";
// import Lekse from "./Lekse";

const Lekseliste = () => {
  const [lekser, setLekser] = useState<string[]>(() => {
    const storedLekser = localStorage.getItem("lekser");
    return storedLekser ? JSON.parse(storedLekser) : [];
  });
  const [completedLekser, setCompletedLekser] = useState<string[]>(() => {
    const storedLekser = localStorage.getItem("completedLekser");
    return storedLekser ? JSON.parse(storedLekser) : [];
  });
  // const [editState, setEditState] = useState(false);
  const [editingLekse, setEditingLekse] = useState<number | undefined>(
    undefined
  );
  const [editingText, setEditingText] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("lekser", JSON.stringify(lekser));
  }, [lekser]);
  useEffect(() => {
    localStorage.setItem("completedLekser", JSON.stringify(completedLekser));
  }, [completedLekser]);

  const addLekse = (lekse: string) => {
    if (lekser.includes(lekse)) {
      alert("Leksen er allerede lag");
    } else {
      setLekser([...lekser, lekse]);
    }
  };
  const completeLekse = (lekse: string) => {
    if (lekser.includes(lekse)) {
      setCompletedLekser([...completedLekser, lekse]);
      setLekser(lekser.filter((item) => item !== lekse));
    } else if (completedLekser.includes(lekse)) {
      setLekser([...lekser, lekse]);
      setCompletedLekser(completedLekser.filter((item) => item !== lekse));
    }
    //  setCompletedLekser([...completedLekser, lekse]);
    //  setLekser(lekser.filter((item) => item !== lekse));
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
  const deleteLekse = (lekse: number) => {
    setCompletedLekser(
      completedLekser.filter((item, index) => index !== lekse)
    );
    setLekser(lekser.filter((item, index) => index !== lekse));
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
    onDelete: (index: number) => void;
  }
  const Lekse = ({
    lekse,
    index,
    onCompletetion,
    onEdit,
    onSave,
    onDelete,
  }: LekseProps) => {
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
            <div className="flex gap-4">
              <button className="right-0" onClick={onSave}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="green"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                  />
                </svg>
              </button>
              <button className="right-0" onClick={() => onEdit(index)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
              <button className="right-0" onClick={() => onDelete(index)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="red"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <button className="right-0" onClick={() => onEdit(index)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </button>
        )}
      </div>
    );
  };

  //COMPLETED LEKSE COMPONENT ----------------
  interface CompletedLekseProps {
    lekse: string;
    index: number;
    onCompletetion: (lekse: string) => void;
    onDelete: (index: number) => void;
  }
  const CompletedLekse = ({
    lekse,
    index,
    onCompletetion,
    onDelete,
  }: CompletedLekseProps) => {
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
      <div className="flex flex-row space-bet place-content-between bg-green-500/50 rounded-md px-3">
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
        <button className="right-0" onClick={() => onDelete(index)}>
          Delete
        </button>
      </div>
    );
  };

  //LEKSE LISTE -----------
  return (
    <div
      style={{ width: "35rem" }}
      className="flex flex-col gap-2 p-8 bg-gray-300/70 rounded-lg"
    >
      <AddLekse onAdd={addLekse} />
      <h2 className="mt-3">Unfinished Homework</h2>
      {lekser.map((lekse, index) => (
        <Lekse
          index={index}
          lekse={lekse}
          onCompletetion={completeLekse}
          onEdit={startEditingLekse}
          onSave={saveLekse}
          onDelete={deleteLekse}
        />
      ))}
      <h2 className="mt-3">Completed Homework</h2>
      {completedLekser.map((lekse, index) => (
        <CompletedLekse
          index={index}
          lekse={lekse}
          onCompletetion={completeLekse}
          onDelete={deleteLekse}
        />
      ))}
    </div>
  );
};

export default Lekseliste;
