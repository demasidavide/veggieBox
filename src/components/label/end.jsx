import "./end.css";
import { t } from "../../translation/translation";
import { useSavedRecipes } from "../../context/RecipeContext";

export function EndLabel(){
    const {language} = useSavedRecipes();
    return(
        <>
        <div className="end">
            <label>{t("end",language)}</label>
        </div>
        </>
    )
}