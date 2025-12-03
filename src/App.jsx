import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useState } from "react";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { searchName } from "./api/searchName";
import { CreateCard } from "./components/card/card";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchRecipe, setSearchRecipe] = useState("");
  const [select, setSelect] = useState("");

  async function handleSearch(searchData) {
    setSelect(searchData.input);
    setSearchRecipe(searchData.scelta);
    console.log("Hai cercato:", searchData.input, searchData.scelta)
    const data = await searchName(searchData.input, searchData.scelta);
    console.log(data)
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
        {recipes.map((recipe)=>(
        <CreateCard
        id={recipe.id}
        img={recipe.image}
        title={recipe.title}
        descr={recipe.descr}
        ></CreateCard>
        ))}
      </div>
    </>
  );
}

export default App;
