import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useActionState, useState } from "react";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { searchName } from "./api/searchName";
import { Card } from "./components/card/card";
import cibo from "./assets/cibo.jpg";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchRecipe, setSearchRecipe] = useState("");
  const [select, setSelect] = useState("");
  const [errorSearch, setErrorSearch] = useState("")

  const handleErrorSearch = ()=>{
    if(recipes.length === 0){
      setErrorSearch("Errorrreeeee")
    }else{
      setErrorSearch("")
    }
  }
  async function handleSearch(searchData) {
    setSelect(searchData.input);
    setSearchRecipe(searchData.scelta);
    console.log("Hai cercato:", searchData.input, searchData.scelta);
    const data = await searchName(searchData.input, searchData.scelta);
    console.log(data.results);
    setRecipes(data.results);
  }

  return (
    <>
      {/* parte Redux */}
      {/* <Provider store={store}>
        < className="App">
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
      </div>
      <div className="container-card">
          {/* prova a mano per api finite */}
          <div className="card-style-2">
        <img
          src={cibo}
          alt="immagine non disp"
          className="card-image"
        />
        <div className="card-content">
          <h3 className="card-title">titolo</h3>
          <div className="buttons-style-2">
            <button className="btn btn-view">Vedi Ricetta</button>
            <button className="btn btn-save">Salva</button>
          </div>
        </div>
      </div>
          <div className="card-style-2">
        <img
          src={cibo}
          alt="immagine non disp"
          className="card-image"
        />
        <div className="card-content">
          <h3 className="card-title">titolo</h3>
          <div className="buttons-style-2">
            <button className="btn btn-view">Vedi Ricetta</button>
            <button className="btn btn-save">Salva</button>
          </div>
        </div>
      </div>
          <div className="card-style-2">
        <img
          src={cibo}
          alt="immagine non disp"
          className="card-image"
        />
        <div className="card-content">
          <h3 className="card-title">titolo</h3>
          <div className="buttons-style-2">
            <button className="btn btn-view">Vedi Ricetta</button>
            <button className="btn btn-save">Salva</button>
          </div>
        </div>
      </div>
          <div className="card-style-2">
        <img
          src={cibo}
          alt="immagine non disp"
          className="card-image"
        />
        <div className="card-content">
          <h3 className="card-title">titolo</h3>
          <div className="buttons-style-2">
            <button className="btn btn-view">Vedi Ricetta</button>
            <button className="btn btn-save">Salva</button>
          </div>
        </div>
      </div>
          <div className="card-style-2">
        <img
          src={cibo}
          alt="immagine non disp"
          className="card-image"
        />
        <div className="card-content">
          <h3 className="card-title">titolo</h3>
          <div className="buttons-style-2">
            <button className="btn btn-view">Vedi Ricetta</button>
            <button className="btn btn-save">Salva</button>
          </div>
        </div>
      </div>
          <div className="card-style-2">
        <img
          src={cibo}
          alt="immagine non disp"
          className="card-image"
        />
        <div className="card-content">
          <h3 className="card-title">titolo</h3>
          <div className="buttons-style-2">
            <button className="btn btn-view">Vedi Ricetta</button>
            <button className="btn btn-save">Salva</button>
          </div>
        </div>
      </div>
          <div className="card-style-2">
        <img
          src={cibo}
          alt="immagine non disp"
          className="card-image"
        />
        <div className="card-content">
          <h3 className="card-title">titolo</h3>
          <div className="buttons-style-2">
            <button className="btn btn-view">Vedi Ricetta</button>
            <button className="btn btn-save">Salva</button>
          </div>
        </div>
      </div>
          <div className="card-style-2">
        <img
          src={cibo}
          alt="immagine non disp"
          className="card-image"
        />
        <div className="card-content">
          <h3 className="card-title">titolo</h3>
          <div className="buttons-style-2">
            <button className="btn btn-view">Vedi Ricetta</button>
            <button className="btn btn-save">Salva</button>
          </div>
        </div>
      </div>
          <div className="card-style-2">
        <img
          src={cibo}
          alt="immagine non disp"
          className="card-image"
        />
        <div className="card-content">
          <h3 className="card-title">titolo</h3>
          <div className="buttons-style-2">
            <button className="btn btn-view">Vedi Ricetta</button>
            <button className="btn btn-save">Salva</button>
          </div>
        </div>
      </div>
          <div className="card-style-2">
        <img
          src={cibo}
          alt="immagine non disp"
          className="card-image"
        />
        <div className="card-content">
          <h3 className="card-title">titolo</h3>
          <div className="buttons-style-2">
            <button className="btn btn-view">Vedi Ricetta</button>
            <button className="btn btn-save">Salva</button>
          </div>
        </div>
      </div>



        {console.log("App-log ricette:", recipes)}
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <Card
              key={recipe.id}
              id={recipe.id || "id non disp"}
              img={recipe.image || "img non disp"}
              title={recipe.title || "titolo non disp"}
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
