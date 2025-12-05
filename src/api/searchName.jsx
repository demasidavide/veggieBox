import axios from "axios";

const apiBase = "https://api.spoonacular.com/recipes/complexSearch";
const apiKey = import.meta.env.VITE_API_KEY;
export async function SearchName(query,diet) {
  try {
    const response = await axios.get(`${apiBase}`, {
      params: {
        query: query,
        number: 10,
        apiKey: apiKey,
        diet:diet,
        addRecipeNutrition:true
      }

    });
    console.log(response.status)
    
    return response.data;
  } catch (e) {
    console.log(e);
    if(e.response.status === 402){
     alert("abbonamento scaduto")
    }
    alert('Attenzione chiamata api non riuscita-searchName-')
  }
}
