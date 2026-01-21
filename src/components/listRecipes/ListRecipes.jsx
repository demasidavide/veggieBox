import "./ListRecipes.css";
import { useSavedRecipes } from "../../context/RecipeContext";
import { t } from "../../translation/translation";
import { getTranslatedTitle } from "../../translation/translation";

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
  //nuovo helper
  const displayTitle = getTranslatedTitle(recipe, language, title);
  //--------------------------------------------------------------------------
  //funzione per rimuovere dalla lista----------------------------------------
  const removeRecipe = (id) => {
    const recipe = savedRecipes.find((r) => r.id === id);
    const updatedIngredients = removeRecipeIngredients(recipe);
    setIngredientsList(updatedIngredients);
    setSavedRecipes(savedRecipes.filter((r) => r.id !== id));
  };
  //funzione per eliminare ingredienti da ricetta cancellata------------------
  const removeRecipeIngredients = (recipe) => {
    const servingRatio = recipe.selectedServings / recipe.servings;
    let updatedIngredients = [...ingredientsList];

    recipe.ingredients.forEach((ing) => {
      const adjustedAmount = ing.amount * servingRatio;
      const existingIndex = updatedIngredients.findIndex(
        (i) => i.id === ing.id,
      );

      if (existingIndex >= 0) {
        updatedIngredients[existingIndex].totalAmount -= adjustedAmount;
        updatedIngredients[existingIndex].count -= 1;

        // se count arriva a 0, rimuovi completamente
        if (updatedIngredients[existingIndex].count <= 0) {
          updatedIngredients = updatedIngredients.filter(
            (_, i) => i !== existingIndex,
          );
        }
      }
    });

    return updatedIngredients;
  };
  //---------------------------------------------------------------------------------
  // raggruppo updateServings,addIngredientsFromRecipe,removeIngredientsFromRecipe(sostituita con removeRecipeIngredients)
  const updateServings = (recipeId, newServings) => {
    const recipe = savedRecipes.find((r) => r.id === recipeId);
    if (!recipe) return;

    const { updatedRecipes, updatedIngredients } = calculateServingsUpdate(
      recipe,
      newServings,
      savedRecipes,
      ingredientsList,
    );
    setSavedRecipes(updatedRecipes);
    setIngredientsList(updatedIngredients);
  };

  const calculateServingsUpdate = (
    recipe,
    newServings,
    recipes,
    ingredients,
  ) => {
    const oldServingRatio = recipe.selectedServings / recipe.servings;
    const newServingRatio = newServings / recipe.servings;

    // crea nuova lista ingredienti
    let updatedIngredients = [...ingredients];

    // qui rimozione serving vecchi
    recipe.ingredients.forEach((ing) => {
      const oldAdjustedAmount = ing.amount * oldServingRatio;
      const existingIndex = updatedIngredients.findIndex(
        (i) => i.id === ing.id,
      );

      if (existingIndex >= 0) {
        updatedIngredients[existingIndex].totalAmount -= oldAdjustedAmount;
        updatedIngredients[existingIndex].count -= 1;

        // rimozione totale se count arirva a 0
        if (updatedIngredients[existingIndex].count <= 0) {
          updatedIngredients = updatedIngredients.filter(
            (_, i) => i !== existingIndex,
          );
        }
      }
    });

    recipe.ingredients.forEach((ing, index) => {
      const newAdjustedAmount = ing.amount * newServingRatio;
      const existingIndex = updatedIngredients.findIndex(
        (i) => i.id === ing.id,
      );

      // traduzione
      const translatedName =
        recipe.translations?.it?.ingredients?.[index]?.name || ing.name;
      //presa dalla vecchia funzione
      if (existingIndex >= 0) {
        // Ingrediente già esiste: incrementa
        updatedIngredients[existingIndex].totalAmount += newAdjustedAmount;
        updatedIngredients[existingIndex].count += 1;
      } else {
        // Ingrediente nuovo: aggiungi(tolto .push)
        updatedIngredients = [
          ...updatedIngredients,
          {
            id: ing.id,
            name: ing.name,
            translatedName: translatedName,
            totalAmount: newAdjustedAmount,
            unit: ing.unit,
            count: 1,
          },
        ];
      }
    });

    const updatedRecipes = recipes.map((r) =>
      r.id === recipe.id ? { ...r, selectedServings: newServings } : r,
    );

    return {
      updatedRecipes,
      updatedIngredients,
    };
  };
  //------------------------------------------------------------------------------------
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
