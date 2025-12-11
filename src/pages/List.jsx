import "./List.css";
import { ListRecipes } from "../components/listRecipes/ListRecipes.jsx";
import { CardIng } from "../components/listIngredients/CardIng.jsx";
import { useSavedRecipes } from "../context/RecipeContext.jsx";
import { ConfirmButton } from "../components/button/confirm/ConfirmButton.jsx";
import { Link } from 'react-router-dom'


export default function List() {
  const { savedRecipes, removeRecipe, ingredientsList } = useSavedRecipes();
  console.log("HH", savedRecipes.length);
  console.log("HH", ingredientsList);
  return (
        <>
        <Link to="/">
        <button className="home">↩ Home</button>
        </Link>
    <div className="container-main">
        <div className="container-recipes">
          {savedRecipes.length === 0 ? (
            <p style={{marginRight:"20px"}}>Nessuna ricetta salvata</p>
          ) : (
            savedRecipes.map((recipe) => (
              <ListRecipes
                title={recipe.title}
                id={recipe.id}
                key={recipe.id}
                servings={recipe.servings}
                onClose={() => removeRecipe(recipe.id)}
              ></ListRecipes>
            ))
          )}
        </div>
        <div className="container-ingredients">
          <h2 className="title">Lista ingredienti totali</h2>
          <div className="container-card-ing">
            {ingredientsList.length === 0 ? (
              <p>Nessun ingrediente da mostrare</p>
            ) : (
              ingredientsList.map((ing) => (
                <CardIng
                  key={ing.id}
                  id={ing.id}
                  ing={ing.name}
                  qta={ing.totalAmount.toFixed(2)}
                  unit={ing.unit}
                ></CardIng>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
