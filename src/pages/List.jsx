import "./List.css";
import { ListRecipes } from "../components/listRecipes/ListRecipes.jsx";
import { CardIng } from "../components/listIngredients/CardIng.jsx";
import { useSavedRecipes } from "../context/RecipeContext.jsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ConvertToGrams } from "../api/convertUnit.jsx";
import { Modal } from "../components/modal/Modal.jsx";
import { SearchRecipe } from "../api/searchRecipe.jsx";
import { t } from "../translation/translation";

export default function List() {
  const { savedRecipes, removeRecipe, ingredientsList, language } =
    useSavedRecipes();
  const [convertedIngredients, setConvertedIngredients] = useState([]);
  const [isConverting, setIsConverting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

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

  // Funzione per condividere con Web Share API------------------------------
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
      } catch (error) {
        console.log("Condivisione annullata");
      }
    } else {
      alert("Condivisione non supportata su questo browser");
    }
  };
  //----------------------------------------------------------------

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
  //--------------------------------------------------------------------

  //prova funzione conversione in grammi------------------------------
  useEffect(() => {
    const convertAll = async () => {
      setIsConverting(true);
      try {
        const converted = [];

        for (const ing of ingredientsList) {
          try {
            const grams = await ConvertToGrams(
              ing.name,
              ing.totalAmount,
              ing.unit
            );
            converted.push({
              ...ing,
              totalAmount: grams,
              unit: "g",
            });
          } catch (e) {
            console.error("ConvertToGrams error for", ing.name, e);
            converted.push({
              ...ing,
              totalAmount: ing.totalAmount,
              unit: ing.unit,
            });
          }
        }

        setConvertedIngredients(converted);
      } catch (e) {
        console.error("convertAll error:", e);
      } finally {
        setIsConverting(false);
      }
    };

    if (ingredientsList.length > 0) {
      convertAll();
    }
  }, [ingredientsList]);
  //-----------------------------------------------------------------------
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
            <p style={{ marginRight: "20px" }}>{t("noRecipes", language)}</p>
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
          <h2 className="title">{t("ingredientsList", language)}</h2>
          {ingredientsList.length > 0 ? (
            <div className="buttons-container">
              <button onClick={shareList} className="share-btn">
                ⇧ {t("share", language)}
              </button>
              <button onClick={downloadAsTxt} className="download-btn">
                ⇩ {t("download", language)} TXT
              </button>
            </div>
          ) : (
            ""
          )}
          <div className="container-card-ing">
            {ingredientsList.length === 0 ? (
              <p>{t("noIngredients", language)}</p>
            ) : isConverting ? (
              <p>⏳ {t("converting", language) || "Conversione in corso..."}</p>
            ) : (
              convertedIngredients.map((ing) => {
                // Dichiara displayName qui, fuori dal JSX
                const displayName =
                  language === "it" && ing.translatedName
                    ? ing.translatedName
                    : ing.name;

                return (
                  <CardIng
                    key={ing.id}
                    id={ing.id}
                    ing={displayName}
                    qta={ing.totalAmount.toFixed(2)}
                    unit="g"
                  ></CardIng>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}
