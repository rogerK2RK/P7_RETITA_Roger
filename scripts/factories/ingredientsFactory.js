import { ingredientSearch } from "../pages/index.js";

export function ingredientsFactory(ingredient, recipes, tabTag){

    function getIngredientCardDOM(){
        let link = document.createElement('a');
        let liste = document.createElement('li');
        liste.textContent = ingredient;
        link.className = "ingredientListe";
        link.addEventListener("click", function(){
            ingredientSearch(recipes, ingredient);
            tabTag.push(ingredient);
            console.log(tabTag);
        });
        link.appendChild(liste);
        return (link , tabTag);
    }
    return {getIngredientCardDOM}
    
    
}