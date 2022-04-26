export function ingredientsFactory(ingredient){

    function getIngredientCardDOM(){
        let liste = document.createElement('li');
        liste.textContent = ingredient;
        
        return (liste);
    }
    return {getIngredientCardDOM}
}