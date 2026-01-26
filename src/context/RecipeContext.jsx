import {
  useState,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

const RecipeContext = createContext();

// reducer per gestire ricette e ingredienti insieme
const recipesReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_BOTH":
      return {
        recipes: action.payload.recipes,
        ingredients: action.payload.ingredients,
      };
    case "ADD_RECIPE":
      return {
        recipes: [...state.recipes, action.payload.recipe],
        ingredients: action.payload.ingredients,
      };
    case "REMOVE_RECIPE":
      return {
        recipes: state.recipes.filter((r) => r.id !== action.payload.recipeId),
        ingredients: action.payload.ingredients,
      };
    case "SET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
      };
    case "SET_INGREDIENTS":
      return {
        ...state,
        ingredients: action.payload,
      };
    default:
      return state;
  }
};

export function RecipeProvider({ children }) {
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
  }, [language]);

  //local storage ricette e ingredienti con useReducer------------------------
  const [recipesState, dispatch] = useReducer(recipesReducer, null, () => {
    const savedRecipes = localStorage.getItem("savedRecipes");
    const savedIngredients = localStorage.getItem("ingredientsList");
    return {
      recipes: savedRecipes ? JSON.parse(savedRecipes) : [],
      ingredients: savedIngredients ? JSON.parse(savedIngredients) : [],
    };
  });

  //salvataggio al cambio
  useEffect(() => {
    localStorage.setItem("savedRecipes", JSON.stringify(recipesState.recipes));
  }, [recipesState.recipes]);

  useEffect(() => {
    localStorage.setItem(
      "ingredientsList",
      JSON.stringify(recipesState.ingredients),
    );
  }, [recipesState.ingredients]);

  // funzioni helper per mantenere retrocompatibilità
  const setSavedRecipes = (recipes) => {
    dispatch({ type: "SET_RECIPES", payload: recipes });
  };

  const setIngredientsList = (ingredients) => {
    dispatch({ type: "SET_INGREDIENTS", payload: ingredients });
  };

  const updateRecipesAndIngredients = (recipes, ingredients) => {
    dispatch({
      type: "UPDATE_BOTH",
      payload: { recipes, ingredients },
    });
  };

  //----------------------------------------------------------
  return (
    <RecipeContext.Provider
      value={{
        savedRecipes: recipesState.recipes,
        setSavedRecipes,
        ingredientsList: recipesState.ingredients,
        setIngredientsList,
        updateRecipesAndIngredients,
        dispatch, 
        searchResults,
        setSearchResults,
        lastSearch,
        setLastSearch,
        language,
        setLanguage,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export const useSavedRecipes = () => useContext(RecipeContext);
