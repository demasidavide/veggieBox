import "./List.css";
import { ListRecipes } from "../components/listRecipes/ListRecipes.jsx";
import { CardIng } from "../components/listIngredients/CardIng.jsx";
import { useSavedRecipes } from "../context/RecipeContext.jsx";

export default function List() {
  const { savedRecipes, removeRecipe } = useSavedRecipes();
  console.log("List- ric salvate n.", savedRecipes.length, savedRecipes.id);
  return (
    <>
      <div className="container-main">
        <div className="container-recipes">
          {savedRecipes.length === 0 ? (
            <p>Nessuna ricetta salvata</p>
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
            <CardIng></CardIng>
          </div>
        </div>
      </div>
    </>
  );
}
