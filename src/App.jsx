import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useState } from "react";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { searchName } from "./api/searchName";
import { Card } from "./components/card/card";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchRecipe, setSearchRecipe] = useState("");
  const [select, setSelect] = useState("");

  async function handleSearch(searchData) {
    setSelect(searchData.input);
    setSearchRecipe(searchData.scelta);
    console.log("Hai cercato:", searchData.input, searchData.scelta)
    const data = await searchName(searchData.input, searchData.scelta);
    console.log(data.results)
    setRecipes(data.results);
  }

  return (
    <>
      {/* parte Redux */}
      {/* <Provider store={store}>
        <div className="App">
          {/* Qui possono essere aggiunti altri componenti che usano Redux */}
      {/* </div>
      </Provider>  */}

      {/* Pagina */}
      <div className="container-search">
        <div className="container-logo">
          <span className="veggie">Veggie</span>
          <span className="box">Box</span>
          <p>🌱 Scopri ricette vegetariane deliziose</p>
        </div>
        <SearchBar onSearch={handleSearch}></SearchBar>
        {console.log("App-log ricette:", recipes)}
        {recipes.length > 0 ?(
          recipes.map((recipe)=>(
        <Card
        key={recipe.id}
        id={recipe.id || "id non disp"}
        img={recipe.image || "img non disp"}
        title={recipe.title || "titolo non disp"}
        ></Card>
      ))
      ):(<h2>Attenzione Ricetta non trovata</h2>)}
      </div>
    </>
  );
}

export default App;
