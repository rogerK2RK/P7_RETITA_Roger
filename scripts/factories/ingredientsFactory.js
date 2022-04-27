// import { ingredientSearch } from "../pages/index.js";

export function ingredientsFactory(ingredient, recipes){

    function getIngredientCardDOM(){
        let link = document.createElement('a');
        let liste = document.createElement('li');
        liste.textContent = ingredient;
        link.className = "ingredientListe";
        link.addEventListener("click", function(){
            // ingredientSearch(recipes, ingredient);
            console.log(recipes);
        });

        link.appendChild(liste);
        return (link);
    }
    return {getIngredientCardDOM}
}