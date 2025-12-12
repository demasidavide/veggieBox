import "./Modal.css";
import cibo from "../../assets/cibo.jpg";
import close from "../../assets/icon-close.png";
import { useEffect, useState } from "react";
import { TranslateText } from "../../api/translateText";
import { useSavedRecipes } from "../../context/RecipeContext";
import { t } from "../../translation/translation";

export function Modal({ onClose, recipe, loading }) {
  const { language, savedRecipes } = useSavedRecipes();
  const [translatedContent, setTranslatedContent] = useState(null);
  const [isTranslating, setIsTranslating] = useState(false);
  // Controlla se è una ricetta salvata
  const savedRecipe = savedRecipes.find((r) => r.id === recipe?.id);

  useEffect(() => {
    const translateContent = async () => {
      if (!recipe || language === "en") {
        setTranslatedContent(null);
        return;
      }

      // Se è salvata, usa traduzioni già pronte
      if (savedRecipe?.translations?.it) {
        setTranslatedContent(savedRecipe.translations.it);
        return;
      }

      // Altrimenti traduci al volo
      setIsTranslating(true);
      console.log("🔄 Traduzione modale in corso...");

      try {
        const [title, summary, instructions] = await Promise.all([
          TranslateText(recipe.title || "", "it"),
          TranslateText(recipe.summary || "", "it"),
          TranslateText(recipe.instructions || "", "it"),
        ]);

        setTranslatedContent({
          title,
          summary,
          instructions,
        });
        console.log("✅ Traduzione modale completata");
      } catch (e) {
        console.error("❌ Errore traduzione modale:", e);
      } finally {
        setIsTranslating(false);
      }
    };

    translateContent();
  }, [recipe, language, savedRecipe]);

  // Determina quale contenuto mostrare
  const displayTitle =
    language === "it" && translatedContent
      ? translatedContent.title
      : recipe?.title;

  const displaySummary =
    language === "it" && translatedContent
      ? translatedContent.summary
      : recipe?.summary;

  const displayInstructions =
    language === "it" && translatedContent
      ? translatedContent.instructions
      : recipe?.instructions;

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <>
      <div className="container-modal">
        <button className="close" onClick={onClose}>
          <img src={close} alt="chiudi"></img>
        </button>
        {loading || isTranslating ? (
          <div className="loading">{t('loading', language)}</div>
        ) : recipe ? (
          <>
            <div className="container-title">
              <img
                src={recipe.image || cibo}
                alt={displayTitle || "titolo"}
              ></img>
              <h1>{displayTitle}</h1>
            </div>
            <hr></hr>
            <div className="container-ingredients">
              <h5>{t('prepTime', language)} {recipe.readyInMinutes}'</h5>
              <p>{t('recipeFor', language)}: {recipe.servings} pers.</p>
              <h3>{t('ingredients', language)}</h3>
              <ul>
                {recipe.extendedIngredients?.map((ing) => (
                  <li key={ing.id}>{ing.original}</li>
                ))}
              </ul>
              {recipe.nutrition?.nutrients && (
                <p>
                  {t('calories', language)}:{" "}
                  {(
                    recipe.nutrition.nutrients.find(
                      (n) => n.name === "Calories"
                    )?.amount / recipe.servings
                  ).toFixed(1)}{" "}
                  kcal per pers
                </p>
              )}
            </div>
            <hr></hr>
            <div className="container-prep">
              <h3>{t('prep', language)}</h3>
              {recipe.instructions ? (
                <div
                  dangerouslySetInnerHTML={{ __html: recipe.instructions }}
                ></div>
              ) : (
                <p>{t('instNotAvailable', language)}</p>
              )}
            </div>
          </>
        ) : (
          <div>{t('errorLoading', language)}</div>
        )}
      </div>
    </>
  );
}
