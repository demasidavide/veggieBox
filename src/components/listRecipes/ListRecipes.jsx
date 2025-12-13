import "./ListRecipes.css";
import { useSavedRecipes } from "../../context/RecipeContext";
import { t } from "../../translation/translation";

export function ListRecipes({ onClose, title, id, servings,onViewRecipe }) {
  const { savedRecipes, updateServings, removeRecipe, language } = useSavedRecipes();
  const recipe = savedRecipes.find(r => r.id === id);
   // Determina quale titolo mostrare
  const displayTitle = language === 'it' && recipe?.translations?.it?.title
    ? recipe.translations.it.title
    : title;
  return (
    <>
      <div className="container-list">
       
          <div key={recipe.id}>
            <h3 onClick={()=>onViewRecipe(id)}>{displayTitle}</h3>
            <label>
              {t('servings', language)}
              <select
                value={recipe.selectedServings}
                onChange={(e) =>
                  updateServings(recipe.id, Number(e.target.value))
                }
              >
                {Array.from({ length: recipe.servings }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} /pers
                  </option>
                ))}
              </select>
            </label>
            <button onClick={() => removeRecipe(recipe.id)}>X</button>
            <hr />
          </div>
       
      </div>
    </>
  );
}
