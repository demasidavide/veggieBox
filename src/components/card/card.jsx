import "./card.css";
import { useState } from "react";
import { useSavedRecipes } from "../../context/RecipeContext";
import { t } from "../../translation/translation";

export function Card({
  id,
  img,
  title,
  prepTime,
  showCalories,
  viewRecipe,
  onSave,
  recipe,
}) {
  const [selected, setSelected] = useState(false);
  const { savedRecipes, language } = useSavedRecipes();

  const isSaved = savedRecipes.some(r => r.id === id);
  // Determina quale titolo mostrare
  const displayTitle = language === 'it' 
    ? (recipe?.translatedTitle || title)  // Usa tradotto se esiste
    : title;  // Altrimenti originale

  console.log(`-card-ricevute ${id}${img}${title}`);
  return (
    <>
      <div className={!isSaved ? "card-style-2" : "card-style-2 selected"}>
        <img
          src={img}
          alt={displayTitle || "immagine non disp"}
          className="card-image"
        />
        <div className="card-content">
          <h3 className="card-title">{displayTitle}</h3>
          {showCalories && <p>{prepTime} min.</p>}
          <div className="buttons-style-2">
            <button className="btn btn-view" onClick={viewRecipe}>
              {t('viewRecipe', language)}
            </button>
            <button
              className={!isSaved ? "btn btn-save" : "btn btn-save selected"}
              onClick={() => {
                onSave(recipe);
                setSelected(!selected);
              }}
            >
              {!isSaved ? `${t('save', language)}` : `${t('saved', language)}`}
            </button>
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
