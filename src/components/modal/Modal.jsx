import "./Modal.css";
import cibo from "../../assets/cibo.jpg";
import close from "../../assets/icon-close.png";
import { useEffect } from "react";

export function Modal({ onClose, recipe, loading }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <>
      <div className="container-modal">
        <button className="close" onClick={onClose}>
          <img src={close} alt="chiudi"></img>
        </button>
        {loading ? (
          <div className="loading">Caricamento...</div>
        ) : recipe ? (
          <>
            <div className="container-title">
              <img
                src={recipe.image || cibo}
                alt={recipe.title || "titolo"}
              ></img>
              <h1>{recipe.title}</h1>
            </div>
            <hr></hr>
            <div className="container-ingredients">
              <h5>Tempo di Preparazione: {recipe.readyInMinutes}'</h5>
              <p>Ricetta per: {recipe.servings} pers.</p>
              <h3>Ingredienti</h3>
              <ul>
                {recipe.extendedIngredients?.map((ing) => (
                  <li key={ing.id}>{ing.original}</li>
                ))}
              </ul>
              {recipe.nutrition?.nutrients && (
                <p>
                  Calorie:{" "}
                  {
                    (recipe.nutrition.nutrients.find(
                      (n) => n.name === "Calories"
                    )?.amount / recipe.servings).toFixed(1)
                  }{" "}
                  kcal per persona
                </p>
              )}
            </div>
            <hr></hr>
            <div className="container-prep">
              <h3>Preparazione</h3>
              {recipe.instructions ? (
                <div
                  dangerouslySetInnerHTML={{ __html: recipe.instructions }}
                ></div>
              ) : (
                <p>Istruzioni non disponibili</p>
              )}
            </div>
          </>
        ) : (
          <div>Errore nel caricamento</div>
        )}
      </div>
    </>
  );
}
