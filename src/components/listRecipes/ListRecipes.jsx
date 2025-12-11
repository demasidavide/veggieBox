import "./ListRecipes.css";
import { useSavedRecipes } from "../../context/RecipeContext";

export function ListRecipes({ onClose, title, id, servings }) {
  const { savedRecipes, updateServings, removeRecipe } = useSavedRecipes();
  const recipe = savedRecipes.find(r => r.id === id);
  return (
    <>
      <div className="container-list">
       
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <label>
              Porzioni:
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
