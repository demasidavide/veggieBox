import axios from "axios";

const apiBase = "https://api.spoonacular.com/recipes/complexSearch";
const apiKey = "";
export async function searchName(query,diet) {
  try {
    const response = await axios.get(`${apiBase}`, {
      params: {
        query: query,
        number: 5,
        apiKey: apiKey,
        diet:diet
      },
    });
    console.log( response.data);
  } catch (e) {
    console.log(e);
  }
}
