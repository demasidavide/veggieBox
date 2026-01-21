import { useState, createContext, useContext, useEffect } from "react";

const RecipeContext = createContext();

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

  
  //----------------------------------------------------------
  return (
    <RecipeContext.Provider
      value={{
        savedRecipes,
        setSavedRecipes,
        ingredientsList,
        setIngredientsList,
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
