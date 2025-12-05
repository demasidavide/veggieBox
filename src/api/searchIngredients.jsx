import axios from "axios";

const apiBase = "https://api.spoonacular.com/recipes/findByIngredients";
const apiKey = import.meta.env.VITE_API_KEY;

export async function SearchIngredients(ingredients) {
  try {
    const response = await axios.get(apiBase, {
      params: {
        ingredients: ingredients,
        number: 10,
        ranking: 1,
        apiKey: apiKey,
        ignorePantry: true,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
    alert("Attenzione chiamata api non riuscita-searchIngredient-");
  }
}
