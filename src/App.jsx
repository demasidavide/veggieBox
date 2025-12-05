import "./App.css";
import mockData from "./mocks/recipesData.json";
import { use, useActionState, useState, useEffect } from "react";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { SearchName } from "./api/searchName";
import { SearchIngredients } from "./api/searchIngredients";
import { Card } from "./components/card/card";
import cibo from "./assets/cibo.jpg";
import { Modal } from "./components/modal/Modal";
import { ListButton } from "./components/button/lista/listButton";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchRecipe, setSearchRecipe] = useState("");
  const [select, setSelect] = useState("");
  const [errorSearch, setErrorSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showCalories, setShowCalories] = useState(false);

  //gestione apertura e chiusura modale-----------
  const handleShowModal= ()=>{
    console.log(showModal)
    if(!showModal){
       setShowModal(true)
      console.log(showModal)
    }else{
      setShowModal(false)
    }
  }


  // gestione per mostrare calorie nelle card-----
  const handleCaloriesChange = (value) => {
    console.log("valore cal", showCalories);
    setShowCalories(value);
  };
  //--------------------------------------------
  // gestione errore ricerca da definire
  const handleErrorSearch = () => {
    if (recipes.length === 0) {
      console.log("errore trovato");
      setErrorSearch("Nessuna ricetta trovata");
    } else {
      setErrorSearch("");
    }
  };
  //------------------------------------
  // gestione ricerca ricette da barra di ricerca
  async function handleSearch(searchData) {
    //-----------test per api--------pasta---------
    const useMock = import.meta.env.VITE_USE_MOCK === "true";
    if (useMock) {
      console.log("🔧 Modalità test: usando dati mock");
      setRecipes(mockData.results);
      return;
    }
//fine test per api pasta------------------------------
    setSelect(searchData.input);
    setSearchRecipe(searchData.scelta);
    console.log("Hai cercato:", searchData.input, searchData.scelta);

    if (!searchData.ingredients) {
      const data = await SearchName(searchData.input, searchData.scelta);
      console.log(data.results);
      setRecipes(data.results);
      handleErrorSearch();
    } else {
      const data = await SearchIngredients(searchData.input);
      console.log("chiamata 2", data.results);
      setRecipes(data.results);
    }
  }
  // -----------------------------------

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

      <div className="container-card">
       { showModal && (
        <Modal
        onClose={()=>{setShowModal(false);}}
        ></Modal>
       )}

        {recipes.length > 0
          ? recipes.map((recipe) => (
              <Card
                key={recipe.id}
                id={recipe.id || "id non disp"}
                img={recipe.image || "img non disp"}
                title={recipe.title || "titolo non disp"}
                showCalories={showCalories}
                kcal={recipe.nutrition.nutrients.find(n=>n.name === "Calories").amount || "non trovato"}
                viewRecipe={handleShowModal}
              ></Card>
            ))
          : errorSearch && <h2 style={{ color: "green" }}>{errorSearch}</h2>}
      </div>
    </>
  );
}

export default App;
