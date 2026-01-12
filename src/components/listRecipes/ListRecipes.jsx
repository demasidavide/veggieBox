import "./ListRecipes.css";
import { useSavedRecipes } from "../../context/RecipeContext";
import { t } from "../../translation/translation";

export function ListRecipes({ onClose, title, id, servings, onViewRecipe }) {
  const {
    savedRecipes,
    setSavedRecipes,
    setIngredientsList,
    ingredientsList,
    language,
  } = useSavedRecipes();
  const recipe = savedRecipes.find((r) => r.id === id);
  // Determina quale titolo mostrare
  const displayTitle =
    language === "it" && recipe?.translations?.it?.title
      ? recipe.translations.it.title
      : title;
  //--------------------------------------------------------------------------
  //funzione per rimuovere dalla lista----------------------------------------
  const removeRecipe = (id) => {
    const recipe = savedRecipes.find((r) => r.id === id);
    removeIngredientsFromRecipe(recipe);
    setSavedRecipes(savedRecipes.filter((r) => r.id !== id));
  };
  //--------------------------------------------------------------------------
  //funzione per rimuovere ingredenti-----------------------------------------
  const removeIngredientsFromRecipe = (recipe) => {
    const servingRatio = recipe.selectedServings / recipe.servings;
    const newIngredients = [...ingredientsList];

    recipe.ingredients.forEach((ing) => {
      const adjustedAmount = ing.amount * servingRatio;
      const existingIndex = newIngredients.findIndex((i) => i.id === ing.id);

      if (existingIndex >= 0) {
        // Decrementa quantità e conteggio
        newIngredients[existingIndex].totalAmount -= adjustedAmount;
        newIngredients[existingIndex].count -= 1;

        // Se count = 0, rimuovi completamente l'ingrediente
        if (newIngredients[existingIndex].count === 0) {
          newIngredients.splice(existingIndex, 1);
        }
      }
    });

    setIngredientsList(newIngredients);
  };
  //--------------------------------------------------------------------------
  //funzione per aggiornare ingredienti con servings----------
  const updateServings = (recipeId, newServings) => {
    // Trova la ricetta da aggiornare
    const recipe = savedRecipes.find((r) => r.id === recipeId);

    if (!recipe) {
      return;
    }

    // Rimuovi gli ingredienti con i vecchi serving
    removeIngredientsFromRecipe(recipe);

    // Aggiorna i serving della ricetta
    const updatedRecipes = savedRecipes.map((r) =>
      r.id === recipeId ? { ...r, selectedServings: newServings } : r
    );

    setSavedRecipes(updatedRecipes);

    // Aggiungi gli ingredienti con i nuovi serving
    const updatedRecipe = updatedRecipes.find((r) => r.id === recipeId);
    addIngredientsFromRecipe(updatedRecipe);
  };

  //----------------------------------------------------------
  //funzione per aggiungere elementi alla lista ingredienti-----------
  const addIngredientsFromRecipe = (recipe) => {
    const servingRatio = recipe.selectedServings / recipe.servings;
    const newIngredients = [...ingredientsList];

    recipe.ingredients.forEach((ing, index) => {
      const adjustedAmount = ing.amount * servingRatio;
      const existingIndex = newIngredients.findIndex((i) => i.id === ing.id);
      // Prendi il nome tradotto dalle traduzioni salvate
      const translatedName =
        recipe.translations?.it?.ingredients?.[index]?.name || ing.name;

      if (existingIndex >= 0) {
        // Ingrediente già esiste: incrementa
        newIngredients[existingIndex].totalAmount += adjustedAmount;
        newIngredients[existingIndex].count += 1;
      } else {
        // Ingrediente nuovo: aggiungi
        newIngredients.push({
          id: ing.id,
          name: ing.name,
          translatedName: translatedName,
          totalAmount: adjustedAmount,
          unit: ing.unit,
          count: 1,
        });
      }
    });

    setIngredientsList(newIngredients);
  };
  //---------------------------------------------------------

  return (
    <>
      <div className="container-list">
        <div key={recipe.id}>
          <h3 onClick={() => onViewRecipe(id)}>{displayTitle}</h3>
          <label>
            {t("servings", language)}
            <select
              value={recipe.selectedServings}
              onChange={(e) =>
                updateServings(recipe.id, Number(e.target.value))
              }
            >
              {Array.from({ length: recipe.servings }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} /pers
                </option>
              ))}
            </select>
          </label>
          <button onClick={() => removeRecipe(recipe.id)}>X</button>
          <hr />
        </div>
      </div>
    </>
  );
}
