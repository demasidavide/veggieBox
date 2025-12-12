import "./listButton.css";
import { Link } from 'react-router-dom'
import { useSavedRecipes } from "../../../context/RecipeContext";
import { t } from "../../../translation/translation";

export function ListButton() {
  const { savedRecipes, language } = useSavedRecipes();
  return (
    <>
      <div className="container-button">
    <Link to = "/list" >
        <button>{t('list', language)} ➜ </button>
      </Link>
        <p key={savedRecipes.length}>
          {savedRecipes.length === 1 
    ? `${savedRecipes.length} ${t('recipe', language)}`
    : `${savedRecipes.length} ${t('recipes', language)}`
  } </p>
      </div>
    </>
  );
}
