import { useState } from "react";
import "./SearchBar.css";
import { searchName } from "../../api/searchName";

export function SearchBar({ onSearch, onScelta }) {
  const [input, setInput] = useState("");
  const [scelta,setScelta] = useState("")

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(input);
    onScelta(scelta);
    call();
  }

  return (
    <>
      <form className="search" onSubmit={handleSubmit}>
        <label>
          <input type="radio" name={scelta} value="Vegetariano" onChange={(e)=> setScelta(e.target.value)} defaultChecked/>
          Vegetariano
        </label>
        <label>
          <input type="radio" name={scelta} value="Vegano" onChange={(e)=> setScelta(e.target.value)} />
          Vegano
        </label>
        <br></br>
        <input
          className="search-text"
          type="text"
          onChange={(e) => setInput(e.target.value)}
          placeholder="Cerca una ricetta"
        ></input>
        <br></br>
        <input type="submit" value="Cerca"></input>
      </form>
    </>
  );
}
