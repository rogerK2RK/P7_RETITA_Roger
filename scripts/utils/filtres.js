

export function listeIngredient(activeRecipesTab){
    const allIngredients = [];
    for(let i = 0 ; i < activeRecipesTab.length; i++){
        let ingredients = activeRecipesTab[i].ingredients;
        ingredients.map(({ingredient}) => {
            allIngredients.push(`${ingredient.toLowerCase()}`);
        });
    }
    const ingredientsNoRepeat = [...new Set(allIngredients)].sort();
    return ingredientsNoRepeat;
}

export function listeAppareil(recipes){
    const allAppareil = [];
    for(let i = 0 ; i < recipes.length; i++){
        let appareils = recipes[i].appliance;
        allAppareil.push(appareils.toLowerCase());
    }
    const appareilsNoRepeat = [...new Set(allAppareil)].sort();
    return appareilsNoRepeat;
}

export function listeUstensils(recipes){
    const allUstensils = [];
    for(let i = 0 ; i < recipes.length; i++){
        let ustensils = recipes[i].ustensils;
        allUstensils.push(ustensils);
    }
    const ustensilsNoRepeat = [...new Set(allUstensils.flat())].sort();
    return ustensilsNoRepeat;
}