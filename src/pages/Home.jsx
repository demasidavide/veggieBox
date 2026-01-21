import "./Home.css";
import { useState, useEffect, useRef } from "react";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { SearchName } from "../api/searchName";
import { SearchIngredients } from "../api/searchIngredients";
import { Card } from "../components/card/card";
import { Modal } from "../components/modal/Modal";
import { ListButton } from "../components/button/lista/listButton";
import { SearchRecipe } from "../api/searchRecipe";
import { ButtonMore } from "../components/button/loadMore/loadMore";
import { EndLabel } from "../components/label/end";
import { useSavedRecipes } from "../context/RecipeContext";
import { TranslateText } from "../api/translateText";
import { ButtonLang } from "../components/buttonLang/ButtonLang";
import { t, getTranslatedIngredientName } from "../translation/translation";
import { SkeletonCard } from "../components/skeletonCard/SkeletonCard";

function Home() {
  const [searchRecipe, setSearchRecipe] = useState("vegetarian");
  const [offset, Setoffset] = useState(0);
  const [onlyIngredients, setOnlyIngredients] = useState(false);
  const [select, setSelect] = useState("");
  const [errorSearch, setErrorSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showInformation, setShowInformation] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showEnd, setShowEnd] = useState(false);
  const [loadingCard, setLoadingCard] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const {
    savedRecipes,
    setSavedRecipes,
    ingredientsList,
    setIngredientsList,
    searchResults,
    setSearchResults,
    setLastSearch,
    language,
  } = useSavedRecipes();

  const PAGE_SIZE = 6;

  //funzione per aggiornare traduzione titoli al cambio lingua-----
  //utilizzo useRef per tenere traccia della lingua usata
  const languageRef = useRef(language);
  useEffect(() => {
    const updateLanguage = async () => {
      if (searchResults.length > 0 && languageRef.current !== language) {
        try {
          const translated = await translateRecipeTitles(searchResults);
          setSearchResults(translated);
          languageRef.current = language; // aggiorno language dopo la traduzione per loop infinito di errori
        } catch (e) {
          console.error("updateLanguage error:", e);
        }
      }
    };
    updateLanguage();
  }, [language, searchResults]);//includo searchResult senza loop peche controllato da languageRef nella if
  //----------------------------------------------------------------
  //funzione per far apparire la scritta end a ricerca finita
  useEffect(() => {
    if (searchResults.length > 0 && searchResults.length < 6) {
      setShowEnd(true);
    } else {
      setShowEnd(false);
    }
  }, [searchResults]);
  //------------------------------------------------------------------
  // Funzione per tradurre titoli ricette-----------------------------
  const translateRecipeTitles = async (recipes) => {
    if (language === "en") {
      return recipes; // Nessuna traduzione necessaria
    }
    try {
      const translated = await Promise.all(
        recipes.map(async (recipe) => {
          try {
            const translatedTitle = await TranslateText(recipe.title, "it");
            return { ...recipe, translatedTitle };
          } catch (e) {
            console.error("translateRecipeTitles item error:", e);
            return { ...recipe, translatedTitle: recipe.title };
          }
        })
      );
      return translated;
    } catch (e) {
      console.error("translateRecipeTitles error:", e);
      return recipes;
    }
  };
  //---------------------------------------------------------------------

  //salvataggio ricette in context-------------------------------------
  const handleSave = async (recipe) => {
    try {
      const isSaved = savedRecipes.some((r) => r.id === recipe.id);
      if (isSaved) {
        return;
      }

      const fullRecipe = await SearchRecipe(recipe.id);

      // Traduzioni...
      const [translatedTitle, translatedInstructions] = await Promise.all([
        TranslateText(fullRecipe.title, "it"),
        TranslateText(fullRecipe.instructions || "", "it"),
      ]);

      const translatedIngredients = [];
      for (const ing of fullRecipe.extendedIngredients) {
        const translatedName = await TranslateText(ing.name, "it");
        translatedIngredients.push({
          id: ing.id,
          name: ing.name,
          translatedName,
          original: ing.original,
          amount: ing.amount || "N/D",
          unit: ing.unit || "g",
        });
      }

      // Crea ricetta
      const newRecipe = {
        id: fullRecipe.id,
        title: fullRecipe.title,
        servings: fullRecipe.servings,
        selectedServings: fullRecipe.servings,
        instructions: fullRecipe.instructions,
        ingredients: translatedIngredients.map((ing) => ({
          id: ing.id,
          name: ing.name,
          original: ing.original,
          amount: ing.amount,
          unit: ing.unit,
        })),
        translations: {
          it: {
            title: translatedTitle,
            instructions: translatedInstructions,
            ingredients: translatedIngredients.map((ing) => ing.translatedName),
          },
        },
      };

      // Salva ricetta
      setSavedRecipes([...savedRecipes, newRecipe]);

      // Aggiungi ingredienti (logica di addIngredientsFromRecipe)
      const servingRatio = newRecipe.selectedServings / newRecipe.servings;
      const newIngredients = [...ingredientsList];

      newRecipe.ingredients.forEach((ing, index) => {
        const adjustedAmount = ing.amount * servingRatio;
        const existingIndex = newIngredients.findIndex((i) => i.id === ing.id);
        const translatedName = translatedIngredients[index].translatedName;//gia tradotti in riga 143

        if (existingIndex >= 0) {
          newIngredients[existingIndex].totalAmount += adjustedAmount;
          newIngredients[existingIndex].count += 1;
        } else {
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
      
    } catch (error) {
      console.error("❌ Errore:", error);
    }
  };
  //---------------------------------------------------------------------
  //gestione apertura e chiusura modale----------------------------------
  const handleShowModal = async (id) => {
    if (!showModal) {
      setShowModal(true);
      setLoadingDetails(true);
      try {
        const data = await SearchRecipe(id);
        setSelectedRecipe(data);
      } catch (e) {
        console.log("errore ricetta-app-:", e);
      } finally {
        setLoadingDetails(false);
      }
    } else {
      setShowModal(false);
    }
  };
  //-----------------------------------------------

  // gestione per mostrare calorie nelle card------
  const handleInformationsChange = (value) => {
    setShowInformation(value);
  };
  //-----------------------------------------------

  // gestione errore ricerca da definire-----------
  const handleErrorSearch = () => {
    if (searchResults.length === 0) {
      setErrorSearch(t("errorSearch", language));
    } else {
      setErrorSearch("");
    }
  };
  //-----------------------------------------------

  // gestione ricerca ricette da barra di ricerca
  async function handleSearch(searchData) {
    setLoadingCard(true);
    setLastSearch(searchData);
    try {
      // controllo ricerca vuota
      if (!searchData.input || searchData.input.trim() === "") {
        setErrorSearch(t("searchEmpty", language));
        setTimeout(() => setErrorSearch(""), 3000);
        setSearchResults([]);
        setSelect("");
        Setoffset(0);
        return;
      }

      setSelect(searchData.input);
      setSearchRecipe(searchData.scelta);
      setOnlyIngredients(searchData.ingredients);
      setLastSearch(searchData);
      Setoffset(0);

      let searchText = searchData.input;
      if (language === "it") {
        searchText = await TranslateText(searchData.input, "en", "it");
        setSelect(searchText);
      }

      if (!onlyIngredients) {
        const data = await SearchName(searchText, searchData.scelta, 0);
        const translated = await translateRecipeTitles(data.results);
        setSearchResults(translated);
        // usa il total fornito dal server se disponibile, altrimenti fallback alla lunghezza ricevuta
        setTotalRecipes(data.totalResults ?? translated.length);
      } else {
        const data = await SearchIngredients(searchText, 0);
        const translated = await translateRecipeTitles(data);
        setSearchResults(translated);
        // SearchIngredients non fornisce totalResults: usa la lunghezza ricevuta
        setTotalRecipes(translated.length);
      }

      handleErrorSearch();
    } catch (error) {
      console.error("handleSearch error:", error);
      setErrorSearch(t("errorSearch", language));
    } finally {
      setLoadingCard(false);
    }
  }
  // ------------------------------------------------

  //funzione pulsante per caricare altre card--------
  const loadMore = async () => {
    setLoadingCard(true);
    const newOffset = offset + PAGE_SIZE;
    try {
      if (!onlyIngredients) {
        const data = await SearchName(select, searchRecipe, newOffset);
        const translated = await translateRecipeTitles(data.results);
        setSearchResults((prev) => {
          const next = [...prev, ...translated];
          // aggiorna total usando il server se presente, altrimenti la nuova lunghezza
          setTotalRecipes(data.totalResults ?? next.length);
          return next;
        });
      } else {
        const data = await SearchIngredients(select, newOffset);
        const translated = await translateRecipeTitles(data);
        setSearchResults((prev) => {
          const next = [...prev, ...translated];
          // best-effort: aggiorna total con la nuova lunghezza
          setTotalRecipes(next.length);
          return next;
        });
      }
      Setoffset(newOffset);
    } catch (e) {
      console.error("loadMore error:", e);
    } finally {
      setLoadingCard(false);
    }
  };
  //-----------------------------------------------------
  return (
    <>
      <div className="wrap">
        <ListButton></ListButton>
        <ButtonLang></ButtonLang>
        <div className="container-search">
          <div className="container-logo">
            <span className="veggie">Veggie</span>
            <span className="box">Box</span>
            <p>🌱 {t("disct", language)}</p>
          </div>
          <SearchBar
            onSearch={handleSearch}
            onCalories={handleInformationsChange}
          ></SearchBar>
        </div>
        {showModal && (
          <Modal
            onClose={() => {
              setShowModal(false);
            }}
            recipe={selectedRecipe}
            loading={loadingDetails}
          ></Modal>
        )}
        <div className="container-card">
          {loadingCard && (
            <>
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </>
          )}

          {searchResults.length > 0
            ? searchResults.map((recipe) => (
                <Card
                  key={recipe.id}
                  id={recipe.id || "id non disp"}
                  recipe={recipe}
                  img={recipe.image || "img non disp"}
                  title={recipe.title || "titolo non disp"}
                  showInfo={showInformation}
                  prepTime={recipe.readyInMinutes || "N/D"}
                  glutenFree={recipe.glutenFree ? t("yes", language) : "No"}
                  healthS={recipe.healthScore.toFixed(1) || "N/D"}
                  score={recipe.spoonacularScore.toFixed(1) || "N/D"}
                  viewRecipe={() => handleShowModal(recipe.id)}
                  onSave={handleSave}
                ></Card>
              ))
            : errorSearch && <h2 style={{ color: "green" }}>{errorSearch}</h2>}
        </div>
        {showEnd ? (
          <div style={{ display: "block", width: "100%" }}>
            <EndLabel></EndLabel>
          </div>
        ) : (
          ""
        )}
        {searchResults.length > 0 && totalRecipes > searchResults.length ? (
          <ButtonMore load={loadMore}></ButtonMore>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Home;
