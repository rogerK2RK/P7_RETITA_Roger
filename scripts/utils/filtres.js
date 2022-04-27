import {displayIngredient, displayAppareils, displayUstensils} from "../pages/index.js";


export function listeIngredient(recipes){
    const allIngredients = [];
    for(let i = 0 ; i < recipes.length; i++){
        let ingredients = recipes[i].ingredients;
        ingredients.map(({ingredient}) => {
            allIngredients.push(`${ingredient.toLowerCase()}`);
        });
    }
    const ingredientsNoRepeat = [...new Set(allIngredients)].sort();
    displayIngredient(ingredientsNoRepeat, recipes);
    return ingredientsNoRepeat;
}
export function listeAppareil(recipes){
    const allAppareil = [];
    for(let i = 0 ; i < recipes.length; i++){
        let appareils = recipes[i].appliance;
        allAppareil.push(appareils.toLowerCase());
    }
    const appareilsNoRepeat = [...new Set(allAppareil)].sort();
    displayAppareils(appareilsNoRepeat);
    return appareilsNoRepeat;
}

export function listeUstensils(recipes){
    const allUstensils = [];
    for(let i = 0 ; i < recipes.length; i++){
        let ustensils = recipes[i].ustensils;
        allUstensils.push(ustensils);
    }
    const ustensilsNoRepeat = [...new Set(allUstensils.flat())].sort();
    displayUstensils(ustensilsNoRepeat);
    return ustensilsNoRepeat;
}