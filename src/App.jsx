import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useState } from "react";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { searchName } from "./api/searchName";

function App() {
  const [searchRecipe, setSearchRecipe] = useState("");
  const [select, setSelect] = useState("");
  
  function call(rec,sec) {
    searchName(rec, sec);
  }
  function handleSearch(rec, sec) {
    setSelect(sec);
    setSearchRecipe(rec);
    console.log("Hai cercato:", rec, sec);
    call(rec,sec);
  }


  return (
    <>
      {/* parte Redux */}
      <Provider store={store}>
        <div className="App">
          {/* Qui possono essere aggiunti altri componenti che usano Redux */}
        </div>
      </Provider>

      {/* Pagina */}
      <div className="container-search">
        <div className="container-logo">
          <span className="veggie">Veggie</span>
          <span className="box">Box</span>
          <p>🌱 Scopri ricette vegetariane deliziose</p>
        </div>
        <SearchBar
          onSearch={handleSearch}
          onScelta={handleSearch}
          
        ></SearchBar>
      </div>
    </>
  );
}

export default App;
