
export function ingredientsFactory(ingredient){

    function getIngredientCardDOM(){
        let link = document.createElement('a');
        let liste = document.createElement('li');
        liste.textContent = ingredient;
        link.className = "ingredientListe callTag";
        link.appendChild(liste);
        return (link);
    }
    return {getIngredientCardDOM}
    
    
}