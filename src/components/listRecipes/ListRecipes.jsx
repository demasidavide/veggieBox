import "./ListRecipes.css";
import { useSavedRecipes } from "../../context/RecipeContext";

export function ListRecipes({ onClose, title, id, key,servings }) {
  const { savedRecipes, updateServings, removeRecipe } = useSavedRecipes();
  return (
    <>
      <div className="container-list">
        {savedRecipes.map(recipe => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <label>
            Porzioni:
            <select 
              value={recipe.selectedServings}
              onChange={(e) => updateServings(recipe.id, Number(e.target.value))}
            >
              {Array.from({ length: recipe.servings }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </label>
          <button onClick={() => removeRecipe(recipe.id)}>Rimuovi</button>
        </div>
      ))}
        
        
        
        
        
        
        
        
        {/* Ricette selezionate
        <ul>
          <li>
            <button onClick={onClose}>X</button>
            {title}
            <select className="number">
              {Array.from({ length: servings }, (_, i) => (
                <option key={i + 1} value={i + 1} selected>
                  {i + 1} /pers
                </option>
              ))}
            </select>
          </li>
        </ul> */}
      </div>
    </>
  );
}
