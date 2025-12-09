import "./ListRecipes.css";
import close from "../../assets/icon-close.png";

export function ListRecipes() {
  return (
    <>
      <div className="container-list">
        Ricette selezionate
        <ul>
          <li>
            ricetta pasta
            <button>
              <img src={close}></img>
            </button>
          </li>
          <li>ricetta riso<button>
              <img src={close}></img>
            </button></li>
          <li>ricetta pomodoro<button>
              <img src={close}></img>
            </button></li>
          <li>ricetta carne<button>
              <img src={close}></img>
            </button></li>
          <li>ricetta torta<button>
              <img src={close}></img>
            </button></li>
        </ul>
      </div>
    </>
  );
}
