import "./App.css";
import { useState } from "react";
import { SearchBar } from "./components/SearchBar/SearchBar";

function App() {
  const [searchRecipe, setSearchRecipe] = useState("");
  const [select,setSelect] = useState("")
  function handleSearch(rec,sec) {
    setSelect(sec)
    setSearchRecipe(rec);
    console.log("Hai cercato:", rec,sec);
  }

  return (
    <>
      <div className="container-search">
        <div className="container-logo">
          <span className="veggie">Veggie</span>
          <span className="box">Box</span>
          <p>🌱 Scopri ricette vegetariane deliziose</p>
        </div>
        <SearchBar onSearch={handleSearch} onScelta={handleSearch}></SearchBar>
      </div>
    </>
  );
}

export default App;
