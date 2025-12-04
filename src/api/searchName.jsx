import axios from "axios";

const apiBase = "https://api.spoonacular.com/recipes/complexSearch";
const apiKey = "99d8bd2437e0452c842e9f70b75859af";
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
