import "./listButton.css";
import { Link } from 'react-router-dom'
import { useSavedRecipes } from "../../../context/RecipeContext";

export function ListButton() {
  const { savedRecipes } = useSavedRecipes();
  return (
    <>
      <div className="container-button">
    <Link to = "/list" >
        <button>Lista ➜ </button>
      </Link>
        <p>{savedRecipes.length} Elementi</p>
      </div>
    </>
  );
}
