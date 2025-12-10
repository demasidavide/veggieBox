import "./Home.css";
import mockData from "../mocks/recipesData.json";
import { use, useActionState, useState, useEffect } from "react";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { SearchName } from "../api/searchName";
import { SearchIngredients } from "../api/searchIngredients";
import { Card } from "../components/card/card";
import { Modal } from "../components/modal/Modal";
import { ListButton } from "../components/button/lista/listButton";
import { SearchRecipe } from "../api/searchRecipe";
import { ButtonMore } from "../components/button/loadMore/loadMore";
import { EndLabel } from "../components/label/end";
import { useSavedRecipes } from "../context/RecipeContext";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [searchRecipe, setSearchRecipe] = useState("vegetarian");
  const [offset, Setoffset] = useState(0);
  const [onlyIngredients, setOnlyIngredients] = useState(false);
  const [select, setSelect] = useState("");
  const [errorSearch, setErrorSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showCalories, setShowCalories] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const { addRecipe } = useSavedRecipes();

  //salvataggio ricette in context------------------
  const handleSave = (recipe) => {
    console.log("---",recipe.nutrition.ingredients)
    addRecipe({
      id: recipe.id,
      title: recipe.title,
      servings: recipe.servings,
      ingredients: recipe.nutrition.ingredients,
    });
  };
  //------------------------------------------------

  //gestione apertura e chiusura modale-----------
  const handleShowModal = async (id) => {
    if (!showModal) {
      setShowModal(true);
      setLoadingDetails(true);
      try {
        const data = await SearchRecipe(id);
        console.log("dettagli ricetta:", data);
        setSelectedRecipe(data);
      } catch (e) {
        console.log("errore ricetta-app-:", e);
      } finally {
        setLoadingDetails(false);
      }
    } else {
      setShowModal(false);
    }
  };
  //------------------------------------------------

  // gestione per mostrare calorie nelle card-----
  const handleCaloriesChange = (value) => {
    console.log("valore cal", showCalories);
    setShowCalories(value);
  };
  //--------------------------------------------

  // gestione errore ricerca da definire---------
  const handleErrorSearch = () => {
    if (recipes.length === 0) {
      console.log("errore trovato");
      setErrorSearch("Nessuna ricetta trovata");
    } else {
      setErrorSearch("");
    }
  };
  //-----------------------------------------------

  // gestione ricerca ricette da barra di ricerca
  async function handleSearch(searchData) {
    //controllo ricerca vuota------------------------
    if (!searchData.input || searchData.input.trim() === "") {
      setErrorSearch("Inserisci qualcosa da cercare");
      setTimeout(() => setErrorSearch(""), 3000);
      setRecipes([]);
      setSelect("");
      Setoffset(0);
      return;
    }
    //-----------test per api--------pasta---------
    const useMock = import.meta.env.VITE_USE_MOCK === "false";
    if (useMock) {
      console.log("🔧 Modalità test: usando dati mock");
      setRecipes(mockData.results);
      return;
    }
    //fine test per api pasta------------------------------
    setSelect(searchData.input);
    setSearchRecipe(searchData.scelta);
    setOnlyIngredients(searchData.ingredients);
    setSelect("");
    Setoffset(0);
    console.log("Hai cercato:", searchData.input, searchData.scelta, offset);

    if (!onlyIngredients) {
      const data = await SearchName(searchData.input, searchData.scelta, 0);
      console.log("hai cercato per nome", data.results);
      setRecipes(data.results);
      handleErrorSearch();
    } else {
      const data = await SearchIngredients(searchData.input, 0);
      console.log("primo check", data);
      console.log("secondo check", data.length);
      console.log("hai cercato per ingredienti:", data);
      setRecipes(data);
      handleErrorSearch();
    }
  }
  // -----------------------------------

  //funzione pulsante per caricare altre card--------
  const loadMore = async () => {
    const newOffset = offset + 10;
    if (!onlyIngredients) {
      const data = await SearchName(select, searchRecipe, newOffset);
      setRecipes([...recipes, ...data.results]);
    } else {
      const data = await SearchIngredients(select, newOffset);
      setRecipes([...recipes, ...data]);
    }
    Setoffset(newOffset);
  };
  //-----------------------------------------------------
  return (
    <>
      <ListButton></ListButton>
      <div className="container-search">
        <div className="container-logo">
          <span className="veggie">Veggie</span>
          <span className="box">Box</span>
          <p>🌱 Scopri ricette vegetariane deliziose</p>
        </div>
        <SearchBar
          onSearch={handleSearch}
          onCalories={handleCaloriesChange}
        ></SearchBar>
      </div>

      {showModal && (
        <Modal
          onClose={() => {
            setShowModal(false);
          }}
          recipe={selectedRecipe}
          loading={loadingDetails}
        ></Modal>
      )}
      <div className="container-card">
        {recipes.length > 0
          ? recipes.map((recipe) => (
              <Card
                key={recipe.id}
                id={recipe.id || "id non disp"}
                recipe={recipe}
                img={recipe.image || "img non disp"}
                title={recipe.title || "titolo non disp"}
                showCalories={showCalories}
                kcal={
                  !onlyIngredients
                    ? (
                        recipe.nutrition.nutrients.find(
                          (n) => n.name === "Calories"
                        ).amount / recipe.servings
                      ).toFixed(1) || "non trovato"
                    : "Non disponibile"
                }
                viewRecipe={() => handleShowModal(recipe.id)}
                onSave={handleSave}
              ></Card>
            ))
          : errorSearch && <h2 style={{ color: "green" }}>{errorSearch}</h2>}
        {recipes.length > 0 && recipes.length < 10 && <EndLabel></EndLabel>}
      </div>
        {recipes.length > 0 && recipes.length >= 10 && (
          <ButtonMore load={loadMore}></ButtonMore>
        )}
    </>
  );
}

export default Home;
