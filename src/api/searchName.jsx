import axios from "axios";

const apiBase = "https://api.spoonacular.com/recipes/complexSearch";
const apiKey = "";
console.log()
export async function searchName(query,diet) {
  try {
    const response = await axios.get(`${apiBase}`, {
      params: {
        query: query,
        number: 3,
        apiKey: apiKey,
        diet:diet
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
