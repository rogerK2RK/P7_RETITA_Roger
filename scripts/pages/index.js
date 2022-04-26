import { recetteFactory } from "../factories/recetteFactory.js";
import { ingredientsFactory } from "../factories/ingredientsFactory.js";

async function getMenu() {
    
    let dataMenu = await fetch('../../data/recipes.json');
    dataMenu = await dataMenu.json();
    
    return dataMenu;
   
}

// Appel la recetteFactory pour afficher les recettes
async function displayData(recipes) {
    document.querySelector(".all_recipes").innerHTML = "";
    recipes.forEach((recipe) => {
        const recipeModel = recetteFactory(recipe);
        const userCardDOM = recipeModel.getUserCardDOM();
        document.querySelector(".all_recipes").appendChild(userCardDOM);
    });
}

// compare la saisi avec les elements des ingrédients
function search(recipeArray, inputValue) {
    const result = recipeArray.filter(function(recipe) {
        return recipe.name.toLowerCase().includes(inputValue) || recipe.description.toLowerCase().includes(inputValue)
            ||  recipe.ingredients.some(function(ingredientObj) {
              return ingredientObj.ingredient.toLowerCase().includes(inputValue.toLowerCase())
            });
    });

    return result;
}






async function init() {
    // Récupère les datas des photographes
    const { recipes } = await getMenu();
    displayData(recipes);

    /* Recherche avec la barre de recherche */

    const barreDeRecherche = document.querySelector("#barreDeRecherche");

    barreDeRecherche.addEventListener("keyup", function(e){
        const rechercheLettre = e.target.value.toLowerCase();
        const filteredRecipes = search(recipes, rechercheLettre);
        displayData(filteredRecipes);
        // const applianceList = generateAppliance(filteredRecipes);
    });
    //Recupère les ingredients sans doublant
    listeIngredient(recipes);
    //Recupère les appareils sans doublant
    listeAppareil(recipes);
    //Recupère les ustensil sans doublant
    listeUstensils(recipes);
}

function listeIngredient(recipes){
    const allIngredients = [];
    for(let i = 0 ; i < recipes.length; i++){
        let ingredients = recipes[i].ingredients;
        ingredients.map(({ingredient}) => {
            allIngredients.push(`${ingredient.toLowerCase()}`);
        });
    }
    const ingredientsNoRepeat = [...new Set(allIngredients)].sort();
    console.log(ingredientsNoRepeat);
    displayIngredient(ingredientsNoRepeat);
    return ingredientsNoRepeat;
}

async function displayIngredient(ingredientsNoRepeat){
    ingredientsNoRepeat.forEach((ingredient) => {
        const ingredientModel = ingredientsFactory(ingredient);
        const ingredientCardDOM = ingredientModel.getIngredientCardDOM();
        document.querySelector(".dropdownIngredients").appendChild(ingredientCardDOM);
    });
} 

function listeAppareil(recipes){
    const allAppareil = [];
    for(let i = 0 ; i < recipes.length; i++){
        let appareils = recipes[i].appliance;
        allAppareil.push(appareils.toLowerCase());
    }
    const appareilsNoRepeat = [...new Set(allAppareil)].sort();
    console.log(appareilsNoRepeat);
    return appareilsNoRepeat;
}

function listeUstensils(recipes){
    const allUstensils = [];
    for(let i = 0 ; i < recipes.length; i++){
        let ustensils = recipes[i].ustensils;
        allUstensils.push(ustensils);
    }
    const ustensilssNoRepeat = [...new Set(allUstensils.flat())].sort();
    console.log(ustensilssNoRepeat);
    return ustensilssNoRepeat;
}
// //recuperer les elements du dom les input
// const ingredientsInput = document.querySelector(".inputRecherche__filter__ingredients");
// const appareilsInput = document.querySelector(".inputRecherche__filter__appareils");
// const outilsInput = document.querySelector(".inputRecherche__filter__outils");

// const maListeAppliance = listeAppareil(recipes);
init();