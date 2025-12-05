import { useState, useEffect } from "react";
import "./SearchBar.css";
import { searchName } from "../../api/searchName";
import icon from "../../assets/icons-filter.png";

export function SearchBar({ onSearch, onCalories }) {
  const [input, setInput] = useState("");
  const [scelta, setScelta] = useState("");
  const [filter, setFilter] = useState(false);
  const [calories, setCalories] = useState(false);
  const [ingredients, setIngredients] = useState(false);
  const [placeholder, setPlaceholder] = useState("Cerca una ricetta");

  // funzione per gestire placeholder in barra di ricerca
  useEffect(() => {
    if (ingredients) {
      setPlaceholder("Ricerca per ingredienti inserita");
    } else {
      setPlaceholder("Cerca una ricetta");
    }
  }, [ingredients]);

  // funzione per gestire il submit
  function handleSubmit(e) {
    e.preventDefault();
    const searchData = {
      input: input,
      scelta: scelta,
      calories: calories,
      ingredients: ingredients,
    };
    onSearch(searchData);
  }
  // ------------------------------
  return (
    <>
      <form className="search" onSubmit={handleSubmit}>
        <label>
          <input
            type="radio"
            name={scelta}
            value="Vegetariano"
            onChange={(e) => setScelta(e.target.value)}
            defaultChecked
          />
          Vegetariano
        </label>
        <label>
          <input
            type="radio"
            name={scelta}
            value="Vegano"
            onChange={(e) => setScelta(e.target.value)}
          />
          Vegano
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
              Mostra calorie
            </label>
            <label>
              <input
                type="checkbox"
                value="Cerca per ingredienti"
                checked={ingredients}
                onChange={(e) => setIngredients(!ingredients)}
              ></input>
              Cerca per ingredienti
            </label>
          </div>
        )}
        <br></br>
        <input
          className="search-text"
          type="text"
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
        ></input>
        <br></br>
        <input type="submit" value="Cerca"></input>
      </form>
    </>
  );
}
