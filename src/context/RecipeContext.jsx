import { useState, createContext, useContext } from "react";

const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  const [savedRecipes, setSavedRecipes] = useState([]);

  const addRecipe = (recipe) => {
    // Controlla se la ricetta è già salvata
    if (savedRecipes.find(r => r.id === recipe.id)) {
      console.log("context-Ricetta già salvata");
      return;
    }
    setSavedRecipes([...savedRecipes, recipe]);
    console.log("context-Ricetta salvata:", recipe);
  };

  const removeRecipe = (id) => {
    setSavedRecipes(savedRecipes.filter(r => r.id !== id));
    console.log("context-Ricetta rimossa:", id);
  };

  return (
    <RecipeContext.Provider value={{ savedRecipes, addRecipe, removeRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
}

export const useSavedRecipes = () => useContext(RecipeContext);