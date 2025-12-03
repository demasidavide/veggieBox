import "./SearchBar.css";

export function SearchBar() {
  return (
    <>
      <form action="" className="search">
        <label>
          <input type="radio" name="scelta" value="Vegetariano" />
          Vegetariano
        </label>
        <label>
          <input type="radio" name="scelta" value="Vegano" />
          Vegano
        </label>
        <br></br>
        <input
          className="search-text"
          type="text"
          placeholder="Cerca una ricetta"
        ></input><br></br>
        <input type="submit" value="Cerca"></input>
      </form>
    </>
  );
}
