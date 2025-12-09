import "./List.css";
import { ListRecipes } from '../components/listRecipes/ListRecipes.jsx'
import { CardIng } from "../components/listIngredients/CardIng.jsx";

export default function List() {
  return (
    <>
    <div className="container-main">
        <div className="container-recipes">
      <ListRecipes></ListRecipes>

        </div>
        <div className="container-ingredients">
        <h2 className="title">Lista ingredienti totali</h2>
        <div className="container-card-ing">
        <CardIng></CardIng>
        <CardIng></CardIng>
        <CardIng></CardIng>
        <CardIng></CardIng>
        <CardIng></CardIng>
        <CardIng></CardIng>
        <CardIng></CardIng>
        <CardIng></CardIng>
        <CardIng></CardIng>
        <CardIng></CardIng>
        <CardIng></CardIng>
        <CardIng></CardIng>
        <CardIng></CardIng>
        <CardIng></CardIng>
        <CardIng></CardIng>
        <CardIng></CardIng>
        <CardIng></CardIng>
        <CardIng></CardIng>
        <CardIng></CardIng>
        </div>
        </div>


    </div>
    </>
  );
}
