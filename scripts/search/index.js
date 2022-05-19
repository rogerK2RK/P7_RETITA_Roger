export function ingredientSearch(recipes, ingredient){
    const result = recipes.filter(function(recipe) {
        return recipe.ingredients.some(function(ingredientObj) {
            return ingredientObj.ingredient.toLowerCase().includes(ingredient.toLowerCase())
          });
    });

    return result;
} 

export function appareilSearch(recipes, appareil){
    const result = recipes.filter(function(recipe) {
        return recipe.appliance.toLowerCase().includes(appareil.toLowerCase())
    });

    return result;
}

export function ustensilSearch(recipes, ustensil){
    const result = recipes.filter(function(recipe) {
        return recipe.ustensils.some(function(ust){
            return ust.toLowerCase().includes(ustensil.toLowerCase())
        });
    });

    return result;
}

