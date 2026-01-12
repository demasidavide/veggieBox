import axios from "axios";

const apiBase = "https://api.spoonacular.com/recipes/complexSearch";
const apiKey = import.meta.env.VITE_API_KEY;
export async function SearchName(query, diet, offset = 0) {
  try {
    const response = await axios.get(`${apiBase}`, {
      params: {
        query: query,
        number: 6,
        offset: offset,
        apiKey: apiKey,
        diet: diet,
        addRecipeNutrition: false,
        addRecipeInformation: true,
      },
    });
    console.log(`Status code: ${response.status}`);

    return response.data;
  } catch (e) {
    console.log("-searchname-", e);
    if (e.response.status === 402) {
      alert("Abbonamento Spoonacular scaduto!Raggiunto limite giornaliero.");
    }
    alert("Attenzione chiamata api non riuscita-searchName-");
  }
}
