import { useState, createContext, useContext } from "react";
import { ConvertToGrams } from '../api/convertUnit';

const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

//funzione per convertire unita di misura in grammi------------
const convertIngredientsToGrams = async () => {
  const convertedList = [];
  
  for (const ing of ingredientsList) {
    const gramsAmount = await ConvertToGrams(
      ing.name,
      ing.totalAmount,
      ing.unit
    );
    
    convertedList.push({
      ...ing,
      totalAmount: gramsAmount,
      unit: 'g'
    });
  }
  
  return convertedList;
};


  //funzione per aggiungere ricette alla lista-----------------
  const addRecipe = (recipe) => {
    if (savedRecipes.find((r) => r.id === recipe.id)) {
      console.log("context-Ricetta già salvata");
      return;
    }
    const newRecipe = {
      ...recipe,
      selectedServings: recipe.servings,
    };

    const updatedRecipes = [...savedRecipes, newRecipe];
    setSavedRecipes(updatedRecipes);

    // Aggiungi ingredienti alla lista
    addIngredientsFromRecipe(newRecipe);
  };
  //----------------------------------------------------------

  //funzione per rimuovere elementi dall lista ricette--------
  const removeRecipe = (id) => {
    const recipe = savedRecipes.find((r) => r.id === id);
    removeIngredientsFromRecipe(recipe);
    setSavedRecipes(savedRecipes.filter((r) => r.id !== id));
    console.log("HH-context-Ricetta rimossa:", id);
  };
  //----------------------------------------------------------

  //funzione per rimuovere elementi lista ingredienti---------
  const removeIngredientsFromRecipe = (recipe) => {
    const servingRatio = recipe.selectedServings / recipe.servings;
    const newIngredients = [...ingredientsList];

    recipe.ingredients.forEach((ing) => {
      const adjustedAmount = ing.amount * servingRatio;
      const existingIndex = newIngredients.findIndex((i) => i.id === ing.id);

      if (existingIndex >= 0) {
        // Decrementa quantità e conteggio
        newIngredients[existingIndex].totalAmount -= adjustedAmount;
        newIngredients[existingIndex].count -= 1;

        // Se count = 0, rimuovi completamente l'ingrediente
        if (newIngredients[existingIndex].count === 0) {
          newIngredients.splice(existingIndex, 1);
        }
      }
    });

    setIngredientsList(newIngredients);
  };

  //funzione per aggiungere elementi alla lista ingredienti---
  const addIngredientsFromRecipe = (recipe) => {
    const servingRatio = recipe.selectedServings / recipe.servings;
    const newIngredients = [...ingredientsList];

    recipe.ingredients.forEach((ing) => {
      const adjustedAmount = ing.amount * servingRatio;
      const existingIndex = newIngredients.findIndex((i) => i.id === ing.id);

      if (existingIndex >= 0) {
        // Ingrediente già esiste: incrementa
        newIngredients[existingIndex].totalAmount += adjustedAmount;
        newIngredients[existingIndex].count += 1;
      } else {
        // Ingrediente nuovo: aggiungi
        newIngredients.push({
          id: ing.id,
          name: ing.name,
          totalAmount: adjustedAmount,
          unit: ing.unit,
          count: 1,
        });
      }
    });

    setIngredientsList(newIngredients);
  };
  //----------------------------------------------------------

  //funzione per aggiornare ingredienti con servings----------
  const updateServings = (recipeId, newServings) => {
    // Trova la ricetta da aggiornare
    const recipe = savedRecipes.find((r) => r.id === recipeId);

    if (!recipe) {
      console.log("Ricetta non trovata");
      return;
    }

    // Rimuovi gli ingredienti con i vecchi serving
    removeIngredientsFromRecipe(recipe);

    // Aggiorna i serving della ricetta
    const updatedRecipes = savedRecipes.map((r) =>
      r.id === recipeId ? { ...r, selectedServings: newServings } : r
    );

    setSavedRecipes(updatedRecipes);

    // Aggiungi gli ingredienti con i nuovi serving
    const updatedRecipe = updatedRecipes.find((r) => r.id === recipeId);
    addIngredientsFromRecipe(updatedRecipe);

    console.log("Serving aggiornati per ricetta:", recipeId, newServings);
  };

  //----------------------------------------------------------
  return (
    <RecipeContext.Provider
      value={{
        savedRecipes,
        searchResults,
        setSearchResults,
        ingredientsList,
        updateServings,
        addRecipe,
        removeRecipe,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export const useSavedRecipes = () => useContext(RecipeContext);
