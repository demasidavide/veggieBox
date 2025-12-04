import axios from "axios";

const apiBase = "https://api.spoonacular.com/recipes/complexSearch";
const apiKey = import.meta.env.VITE_API_KEY;
export async function searchName(query,diet) {
  try {
    const response = await axios.get(`${apiBase}`, {
      params: {
        query: query,
        number: 10,
        apiKey: apiKey,
        diet:diet
      }
    });
    return response.data;
   
  } catch (e) {
    console.log(e);
    alert('Attenzione chiamata api non riuscita-searchName-')
  }
}
