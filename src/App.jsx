import "./App.css";
import { useState } from "react";
import { ConfirmButton } from "./components/button/confirm/ConfirmButton";
import { SearchBar } from "./components/SearchBar/SearchBar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="container-search">
        <div className="container-logo">
          <span className="veggie">Veggie</span>
          <span className="box">Box</span>
          <p>🌱 Scopri ricette vegetariane deliziose</p>
        </div>
        <SearchBar></SearchBar>
        <ConfirmButton name="Cerca"></ConfirmButton>
      </div>
    </>
  );
}

export default App;
