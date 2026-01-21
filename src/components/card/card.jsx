import "./card.css";
import { useEffect, useState } from "react";
import { useSavedRecipes } from "../../context/RecipeContext";
import { t, getTranslatedTitle } from "../../translation/translation";

export function Card({
  id,
  img,
  title,
  prepTime,
  showInfo,
  viewRecipe,
  onSave,
  recipe,
  glutenFree,
  healthS,
  score,
}) {
  const [selected, setSelected] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { savedRecipes, language } = useSavedRecipes();

  const isSaved = savedRecipes.some((r) => r.id === id);
  // Determina quale titolo mostrare con helper prova
  const displayTitle = getTranslatedTitle(recipe, language, title);

  useEffect(() => {
    if (isSaved && isSaving) {
      setIsSaving(false);
    }
  }, [isSaved, isSaving]);

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
          {showInfo && (
            <>
              <p>
                {t("prepTime", language)} {prepTime} min.
              </p>
              <p>Gluten Free: {glutenFree}</p>
              <p>
                {t("healthScore", language)}: {healthS}
              </p>
              <p>
                {t("score", language)}: {score}
              </p>
            </>
          )}
          <div className="buttons-style-2">
            <button className="btn btn-view" onClick={viewRecipe}>
              {t("viewRecipe", language)}
            </button>
            <button
              className={!isSaved ? "btn btn-save" : "btn btn-save selected"}
              onClick={async () => {
                setIsSaving(true);
                try {
                  await onSave(recipe);
                  setSelected((s) => !s);
                } catch (e) {
                  console.error("Error saving recipe:", e);
                } finally {
                  setIsSaving(false);
                }
              }}
            >
              {!isSaved ? `${t("save", language)}` : `${t("saved", language)}`}
              {isSaving && <span className="spinner">⏳</span>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
