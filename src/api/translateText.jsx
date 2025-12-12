import axios from "axios";
import { translationPresets } from "../translation/translation"; 

// Cache per salvare traduzioni già fatte
const translationCache = { ...translationPresets };

export async function TranslateText(text, targetLang = 'it') {
  // Crea chiave unica per questa traduzione
  const cacheKey = `${text}-${targetLang}`;
  
  // Controlla cache
  if (translationCache[cacheKey]) {
    console.log(`✅ Cache HIT traduzione: ${text.substring(0, 30)}...`);
    return translationCache[cacheKey];
  }
  
  // Se non in cache, chiama API
  console.log(`🌐 Cache MISS traduzione: ${text.substring(0, 30)}... - Chiamata API`);
  
  try {
    // MyMemory API - GET request
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`;
    
    const response = await axios.get(url);
    
    // Estrai testo tradotto dalla risposta
    const translatedText = response.data.responseData.translatedText;
    
    // Salva in cache
    translationCache[cacheKey] = translatedText;
    console.log(`💾 Salvato in cache: ${text.substring(0, 30)}...`);
    
    return translatedText;
    
  } catch (e) {
    console.error("❌ Errore traduzione:", e);
    // Fallback: restituisci testo originale
    return text;
  }
}