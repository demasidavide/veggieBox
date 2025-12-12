import { useSavedRecipes } from '../../context/RecipeContext';
import './ButtonLang.css';

export function ButtonLang() {
  const { language, setLanguage } = useSavedRecipes();
  
  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'it' : 'en';
    setLanguage(newLang);
    console.log('🌍 Lingua cambiata:', newLang);
  };
  
  return (
    <button 
      className="language-switch" 
      onClick={toggleLanguage}
      title={language === 'en' ? 'Cambia in Italiano' : 'Switch to English'}
    >
      {language === 'en' ? '🇬🇧 English' : '🇮🇹 Italiano'}
    </button>
  );
}