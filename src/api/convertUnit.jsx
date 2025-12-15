import axios from "axios";

const apiBase = "https://api.spoonacular.com/recipes/convert";
const apiKey = import.meta.env.VITE_API_KEY;

// Cache per salvare le conversioni
const conversionCache = {};

export async function ConvertToGrams(ingredientName, sourceAmount, sourceUnit) {
  // Validazione dei parametri
  if (!ingredientName || !sourceUnit || sourceAmount === undefined) {
    console.warn("⚠️ Parametri non validi:", {
      ingredientName,
      sourceAmount,
      sourceUnit,
    });
    return sourceAmount || 0;
  }

  // Crea una chiave unica per questo ingrediente + unità
  const cacheKey = `${ingredientName.toLowerCase()}-${sourceUnit.toLowerCase()}`;

  // Se l'unità è già grammi, restituisci subito
  if (
    sourceUnit.toLowerCase() === "g" ||
    sourceUnit.toLowerCase() === "grams"
  ) {
    return sourceAmount;
  }

  // Controlla se la conversione è già in cache
  if (conversionCache[cacheKey]) {
    console.log(`✅ Cache HIT: ${cacheKey}`);
    // Moltiplica la quantità per il fattore di conversione salvato
    return sourceAmount * conversionCache[cacheKey];
  }

  // Se non è in cache, fai la chiamata API
  console.log(`🌐 Cache MISS: ${cacheKey} - Chiamata API`);

  try {
    const response = await axios.get(apiBase, {
      params: {
        ingredientName: ingredientName,
        sourceAmount: 1, // Chiedi la conversione per 1 unità
        sourceUnit: sourceUnit,
        targetUnit: "grams",
        apiKey: apiKey,
      },
    });

    // Salva il fattore di conversione nella cache
    const conversionFactor = response.data.targetAmount;
    conversionCache[cacheKey] = conversionFactor;

    console.log(`💾 Salvato in cache: ${cacheKey} = ${conversionFactor}g`);

    // Restituisci il valore convertito
    return sourceAmount * conversionFactor;
  } catch (e) {
    console.error("❌ Errore conversione:", e);
    // Fallback: restituisci valore originale
    return sourceAmount;
  }
}
