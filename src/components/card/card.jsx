import "./card.css";
import { useState } from "react";

export function Card({id,img,title,kcal,showCalories,viewRecipe,onSave,recipe}) {

  const [selected,setSelected] = useState(false);

  console.log(`-card-ricevute ${id}${img}${title}`)
  return (
    <>
      <div className="card-style-2">
        <img
          src={img}
          alt={title || "immagine non disp"}
          className="card-image"
        />
        <div className="card-content">
          <h3 className="card-title">{title}</h3>
          {showCalories &&
          <p>{kcal} Kcal pers.</p>}
          <div className="buttons-style-2">
            <button className="btn btn-view" onClick={viewRecipe}>Vedi Ricetta</button>
            <button className={!selected ? "btn btn-save" : "btn btn-save selected"} onClick={() => {onSave(recipe); setSelected(!selected)}}>{!selected ? "Salva" : "Salvato"}</button>
          </div>
        </div>
      </div>

      {/* card di prova da eliminare alla fine */}
      {/* <div className="card-style-2">
        <img
          src=""
          alt=""
          className="card-image"
        />
        <div className="card-content">
          <h3 className="card-title">pasta al pesto</h3>
          {showCalories &&
          <p>troppi Kcal pers.</p>}
          <div className="buttons-style-2">
            <button className="btn btn-view">Vedi Ricetta</button>
            <button className="btn btn-save " >Salva</button>
          </div>
        </div>
      </div> */}
    </>
  );
}
