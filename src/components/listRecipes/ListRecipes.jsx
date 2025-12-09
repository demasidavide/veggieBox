import "./ListRecipes.css";
import close from "../../assets/icon-close.png";

export function ListRecipes() {
  return (
    <>
      <div className="container-list">
        Ricette selezionate
        <ul>
          <li>
            <button>X</button>
            ricetta pasta 
            <select className="number">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
          </li>
          <li>
            <button>X</button>
            ricetta riso
             <select className="number">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select> 
          </li>
          <li>
            <button>X</button>
            ricetta pomodoro
             <select className="number">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select> 
          </li>
          <li>
            <button>X</button>
            ricetta carne
             <select className="number">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select> 
          </li>
          <li>
            <button>X</button>
            ricetta torta
             <select className="number">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select> 
          </li>
        </ul>
      </div>
    </>
  );
}
