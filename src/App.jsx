import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { use, useActionState, useState } from "react";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { searchName } from "./api/searchName";
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

  // gestione per mostrare calorie nelle card
  const handleCaloriesChange = (value) => {
    setShowCalories(value);
  };

  // gestione errore ricerca da definire
  const handleErrorSearch = () => {
    if (recipes.length === 0) {
      setErrorSearch("Errorrreeeee");
    } else {
      setErrorSearch("");
    }
  };
  //------------------------------------
  // gestione ricerca ricette da barra di ricerca
  async function handleSearch(searchData) {
    setSelect(searchData.input);
    setSearchRecipe(searchData.scelta);
    console.log("Hai cercato:", searchData.input, searchData.scelta);
    const data = await searchName(searchData.input, searchData.scelta);
    console.log(data.results);
    setRecipes(data.results);
  }
  // -----------------------------------

  return (
    <>
      {/* parte Redux */}
      {/* <Provider store={store}>
        < className="App">
          {/* Qui possono essere aggiunti altri componenti che usano Redux */}
      {/* </div>
      </Provider>  */}

      {/* Pagina */}
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
        {/* prova a mano per api finite */}
        {/* <div className="card-style-2">
          <img src={cibo} alt="immagine non disp" className="card-image" />
          <div className="card-content">
            <h3 className="card-title">titolo</h3>
            <p style={{color:"black"}}>500 kcal</p>
            <div className="buttons-style-2">
              <button className="btn btn-view">Vedi Ricetta</button>
              <button className="btn btn-save">Salva</button>
            </div>
          </div>
        </div> */}

        {console.log("App-log ricette:", recipes)}
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <Card
              key={recipe.id}
              id={recipe.id || "id non disp"}
              img={recipe.image || "img non disp"}
              title={recipe.title || "titolo non disp"}
              kcal={recipe.nutricion || "non trovato"}
            ></Card>
          ))
        ) : (
          <h2 style={{ color: "green" }}>{handleErrorSearch}</h2>
        )}
      </div>
    </>
  );
}

export default App;
