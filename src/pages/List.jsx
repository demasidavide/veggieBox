import "./List.css";
import { ListRecipes } from "../components/listRecipes/ListRecipes.jsx";
import { CardIng } from "../components/listIngredients/CardIng.jsx";
import { useSavedRecipes } from "../context/RecipeContext.jsx";
import { ConfirmButton } from "../components/button/confirm/ConfirmButton.jsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ConvertToGrams } from "../api/convertUnit.jsx";
import { Modal } from "../components/modal/Modal.jsx";
import { SearchRecipe } from "../api/searchRecipe.jsx";

export default function List() {
  const { savedRecipes, removeRecipe, ingredientsList } = useSavedRecipes();
  const [convertedIngredients, setConvertedIngredients] = useState([]);
  const [isConverting, setIsConverting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  console.log("Numero ricette salvate", savedRecipes.length);
  console.log("Lista ingredienti", ingredientsList);

  // Funzione per aprire la modale----------------------------------------
  const handleShowModal = async (id) => {
    setShowModal(true);
    setLoadingDetails(true);
    try {
      const data = await SearchRecipe(id);
      setSelectedRecipe(data);
    } catch (e) {
      console.error("Errore dettagli ricetta:", e);
    } finally {
      setLoadingDetails(false);
    }
  };
  //-------------------------------------------------------------------------

  //condivisione-----------------------------------------------------------
  // Funzione per condividere con Web Share API
  const shareList = async () => {
    const text = convertedIngredients
      .map((ing) => `${ing.totalAmount.toFixed(0)}g - ${ing.name}`)
      .join("\n");

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Lista della Spesa VeggieBox",
          text: `🛒 Lista Ingredienti:\n\n${text}`,
        });
        console.log("Lista condivisa con successo!");
      } catch (error) {
        console.log("Condivisione annullata");
      }
    } else {
      alert("Condivisione non supportata su questo browser");
    }
  };

  // Funzione per scaricare come TXT
  const downloadAsTxt = () => {
    const header = "🛒 LISTA DELLA SPESA - VeggieBox\n\n";
    const ingredients = convertedIngredients
      .map((ing) => `☐ ${ing.totalAmount.toFixed(0)}g - ${ing.name}`)
      .join("\n");

    const text = header + ingredients;

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lista-spesa-veggieBox.txt";
    a.click();
    URL.revokeObjectURL(url); // Pulisci l'URL dopo il download
  };

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
          unit: "g",
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
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          recipe={selectedRecipe}
          loading={loadingDetails}
        />
      )}
      <Link to="/">
        <button className="home">↩ Home</button>
      </Link>
      <div className="container-main">
        <div className="container-recipes">
          {savedRecipes.length === 0 ? (
            <p style={{ marginRight: "20px" }}>Nessuna ricetta salvata</p>
          ) : (
            savedRecipes.map((recipe) => (
              <ListRecipes
                title={recipe.title}
                id={recipe.id}
                key={recipe.id}
                servings={recipe.servings}
                onClose={() => removeRecipe(recipe.id)}
                onViewRecipe={handleShowModal}
              ></ListRecipes>
            ))
          )}
        </div>
        <div className="container-ingredients">
          <h2 className="title">Lista ingredienti totali</h2>
          {ingredientsList.length > 0 ? (
            <div className="buttons-container">
              <button onClick={shareList} className="share-btn">
                ⇧ Condividi
              </button>
              <button onClick={downloadAsTxt} className="download-btn">
                ⇩ Scarica TXT
              </button>
            </div>
          ) : (
            ""
          )}
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
