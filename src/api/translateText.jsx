import axios from "axios";
import { translationPresets } from "../translation/translation"; 

// Cache per salvare traduzioni già fatte
const translationCache = { ...translationPresets };

export async function TranslateText(text, targetLang = 'it', sourceLang = 'en') {
  //limite caratteri 499 per limiti api
  const cutText = text.substring(0,499);
  // Crea chiave unica per questa traduzione
  const cacheKey = `${cutText}-${targetLang}`;
  
  // Controlla cache
  if (translationCache[cacheKey]) {
    return translationCache[cacheKey];
  }
  
  try {
    // MyMemory API - GET request
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(cutText)}&langpair=${sourceLang}|${targetLang}`;
    
    const response = await axios.get(url);
    
    // Estrai testo tradotto dalla risposta
    const translatedText = response.data.responseData.translatedText;
    
    // Salva in cache
    translationCache[cacheKey] = translatedText;
    
    return translatedText;
    
  } catch (e) {
    console.error("❌ Errore traduzione:", e);
    // Fallback: restituisci testo originale
    return cutText;
  }
}