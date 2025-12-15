import { useState, useEffect } from "react";
import "./SearchBar.css";
import { SearchName } from "../../api/searchName";
import icon from "../../assets/icons-filter.png";
import { useSavedRecipes } from "../../context/RecipeContext";
import { t } from "../../translation/translation";

export function SearchBar({ onSearch, onCalories }) {
  const { lastSearch, language } = useSavedRecipes();
  const [input, setInput] = useState("");
  const [scelta, setScelta] = useState("vegetarian");
  const [filter, setFilter] = useState(false);
  const [calories, setCalories] = useState(false);
  const [ingredients, setIngredients] = useState(false);
  const [placeholder, setPlaceholder] = useState("Cerca una ricetta");

  useEffect(() => {
    console.log("SS", lastSearch);
    setInput(lastSearch.input || "");
    setScelta(lastSearch.scelta || "vegetarian");
    setIngredients(lastSearch.ingredients || false);
  }, [lastSearch]);

  // funzione per gestire placeholder in barra di ricerca
  useEffect(() => {
    if (ingredients) {
      setPlaceholder(t("placeholdering", language));
    } else {
      setPlaceholder(t("placeholdername", language));
    }
  }, [ingredients, language]);

  // funzione per gestire il submit
  function handleSubmit(e) {
    e.preventDefault();
    const searchData = {
      input: input,
      scelta: scelta,
      calories: calories,
      ingredients: ingredients,
    };
    console.log("controllo", searchData);
    onSearch(searchData);
  }
  // ------------------------------
  return (
    <>
      <form className="search" onSubmit={handleSubmit}>
        <label>
          <input
            type="radio"
            name="diet"
            value="vegetarian"
            onChange={(e) => setScelta(e.target.value)}
            defaultChecked
          />
          {t("vegetarian", language)}
        </label>
        <label>
          <input
            type="radio"
            name="diet"
            value="vegan"
            onChange={(e) => setScelta(e.target.value)}
          />
          {t("vegan", language)}
        </label>
        <button
          type="button"
          className="button-filter"
          onClick={() => {
            setFilter(!filter);
          }}
        >
          <img src={icon}></img>
        </button>
        {/* div per filtri */}
        {filter && (
          <div className={"container-filter"}>
            <label>
              <input
                type="checkbox"
                value="Mostra calorie"
                checked={calories}
                onChange={(e) => {
                  setCalories(!calories), onCalories(e.target.checked);
                }}
              ></input>
              {t("showInfo", language)}
            </label>
            <label>
              <input
                type="checkbox"
                value="Cerca per ingredienti"
                checked={ingredients}
                onChange={(e) => setIngredients(!ingredients)}
              ></input>
              {t("searchbying", language)}
            </label>
          </div>
        )}
        <br></br>
        <input
          className="search-text"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
        ></input>
        <br></br>
        <input type="submit" value={t("search", language)}></input>
      </form>
    </>
  );
}
