import "./List.css";
import { ListRecipes } from "../components/listRecipes/ListRecipes.jsx";
import { CardIng } from "../components/listIngredients/CardIng.jsx";
import { useSavedRecipes } from "../context/RecipeContext.jsx";
import { ConfirmButton } from "../components/button/confirm/ConfirmButton.jsx";
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";
import { ConvertToGrams } from "../api/convertUnit.jsx";


export default function List() {
  const { savedRecipes, removeRecipe, ingredientsList } = useSavedRecipes();
  const [convertedIngredients, setConvertedIngredients] = useState([]);
  const [isConverting, setIsConverting] = useState(false);
  console.log("Numero ricette salvate", savedRecipes.length);
  console.log("Lista ingredienti", ingredientsList);

  //prova funzione conversione in grammi-----------------------------------
   useEffect(() => {
    const convertAll = async () => {
      setIsConverting(true);
      const converted = [];
      
      for (const ing of ingredientsList) {
        const grams = await ConvertToGrams(ing.name, ing.totalAmount, ing.unit);
        converted.push({
          ...ing,
          totalAmount: grams,
          unit: 'g'
        });
      }
      
      setConvertedIngredients(converted);
      setIsConverting(false);
    };
    
    if (ingredientsList.length > 0) {
      convertAll();
    }
  }, [ingredientsList]);

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
              convertedIngredients.map((ing) => (
                <CardIng
                  key={ing.id}
                  id={ing.id}
                  ing={ing.name}
                  qta={ing.totalAmount.toFixed(2)}
                  unit="g"                
                  ></CardIng>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
