import { useState, createContext, useContext, useEffect } from "react";
import { ConvertToGrams } from "../api/convertUnit";
import { TranslateText } from "../api/translateText";

const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  //const [savedRecipes, setSavedRecipes] = useState([]);
  //--cancellare alla fine-----const [ingredientsList, setIngredientsList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [lastSearch, setLastSearch] = useState({
    input: "",
    scelta: "vegetarian",
    ingredients: false,
  });
  // Carica lingua da localStorage all'avvio (default: 'en')
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem("language");
    return saved || "en"; // Default inglese
  });
  // Salva in localStorage quando cambia
  useEffect(() => {
    localStorage.setItem("language", language);
    console.log("🌍 Lingua impostata:", language);
  }, [language]);

  //local storage ricette e ingredienti------------------------
  const [savedRecipes, setSavedRecipes] = useState(() => {
    const saved = localStorage.getItem("savedRecipes");
    return saved ? JSON.parse(saved) : [];
  });

  const [ingredientsList, setIngredientsList] = useState(() => {
    const saved = localStorage.getItem("ingredientsList");
    return saved ? JSON.parse(saved) : [];
  });
  //salavataggio al cambio
  useEffect(() => {
    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
  }, [savedRecipes]);

  useEffect(() => {
    localStorage.setItem("ingredientsList", JSON.stringify(ingredientsList));
  }, [ingredientsList]);

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
        unit: "g",
      });
    }

    return convertedList;
  };
//---------------------------------------------------------------

  //funzione per aggiungere ricette alla lista-------------------
  const addRecipe = async (recipe) => {
    if (savedRecipes.find((r) => r.id === recipe.id)) {
      console.log("context-Ricetta già salvata");
      return;
    }

    console.log("🔄 Traduzione ricetta in corso...");

    // Traduci il titolo
    const translatedTitle = await TranslateText(recipe.title, "it");

    // Traduci i nomi degli ingredienti
    const translatedIngredients = [];
    for (const ing of recipe.ingredients) {
      const translatedName = await TranslateText(ing.name, "it");
      translatedIngredients.push({
        ...ing,
        name: translatedName,
      });
    }

    console.log("✅ Traduzione completata");

    // Crea la ricetta con traduzioni-----------------
    const newRecipe = {
      ...recipe,
      selectedServings: recipe.servings,
      translations: {
        it: {
          title: translatedTitle,
          ingredients: translatedIngredients,
        },
      },
    };

    const updatedRecipes = [...savedRecipes, newRecipe];
    setSavedRecipes(updatedRecipes);
//-----------------------------------------------------

// Aggiungi ingredienti alla lista---------------------
    addIngredientsFromRecipe(newRecipe);
  };

  // const addRecipe = (recipe) => {
  //   if (savedRecipes.find((r) => r.id === recipe.id)) {
  //     console.log("context-Ricetta già salvata");
  //     return;
  //   }
  //   const newRecipe = {
  //     ...recipe,
  //     selectedServings: recipe.servings,
  //   };

  //   const updatedRecipes = [...savedRecipes, newRecipe];
  //   setSavedRecipes(updatedRecipes);

  // Aggiungi ingredienti alla lista
  //addIngredientsFromRecipe(newRecipe);
  //};
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

  //funzione per aggiungere elementi alla lista ingredienti-----------
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
        lastSearch,
        setLastSearch,
        ingredientsList,
        updateServings,
        language,
        setLanguage,
        addRecipe,
        removeRecipe,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export const useSavedRecipes = () => useContext(RecipeContext);
