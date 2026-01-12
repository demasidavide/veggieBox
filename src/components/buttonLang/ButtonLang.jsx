import { useSavedRecipes } from "../../context/RecipeContext";
import "./ButtonLang.css";
import gb from "../../assets/gb.png";
import it from "../../assets/it.png";

export function ButtonLang() {
  const { language, setLanguage } = useSavedRecipes();

  const toggleLanguage = () => {
    const newLang = language === "en" ? "it" : "en";
    setLanguage(newLang);
  };

  return (
    <div className="container">
      <button
        className="language-switch"
        onClick={toggleLanguage}
        title={language === "en" ? "Cambia in Italiano" : "Switch to English"}
      >
        <img
          src={language === "en" ? gb : it}
          alt={language === "en" ? "English" : "Italiano"}
        />
      </button>
    </div>
  );
}
