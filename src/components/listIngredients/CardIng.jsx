import "./CardIng.css";
import { useState } from "react";

export function CardIng({ ing, qta, id, unit }) {
  const [selected, setSelected] = useState(false);
console.log("CardIng ricevuto:", { ing, qta, unit });
  return (
    <>
      <div
        className={selected ? "card-ing selected" : "card-ing"}
        onClick={()=>setSelected(!selected)}
      >
        <span className="name">{ing}</span>
        <span className="number">{qta}</span>
        <p>{unit}</p>
      </div>
    </>
  );
}
