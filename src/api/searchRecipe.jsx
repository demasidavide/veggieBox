import axios from "axios";

const apiBase = `https://api.spoonacular.com/recipes/`;
const apiKey = import.meta.env.VITE_API_KEY;

export const SearchRecipe = async (id)=>{
try{
    const response = await axios.get(`${apiBase}${id}/information`,{
        params:{
            id:id,
            apiKey:apiKey,
            includeNutrition:true,
            addWineParing:false,
            addTasteData:false
        }
    });
    console.log('-searchrecipe- dati:',response.data)
    return response.data;
}catch(e){
    console.log('errore chiamata -cearchRecipe-', e)
}
}