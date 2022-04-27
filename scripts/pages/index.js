import { recetteFactory } from "../factories/recetteFactory.js";
import { ingredientsFactory } from "../factories/ingredientsFactory.js";
import { appareilsFactory } from "../factories/appareilsFactory.js";
import { ustensilsFactory } from "../factories/ustensilsFactory.js";
import {listeIngredient, listeAppareil, listeUstensils} from "../utils/filtres.js";

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

init();

/** appel les factorys pour afficher les ingredients, Ustensils et appareils **/
export async function displayIngredient(ingredientsNoRepeat){
    ingredientsNoRepeat.forEach((ingredient) => {
        const ingredientModel = ingredientsFactory(ingredient);
        const ingredientCardDOM = ingredientModel.getIngredientCardDOM();
        document.querySelector(".dropdownIngredients").appendChild(ingredientCardDOM);
    });
} 

export async function displayAppareils(appareilsNoRepeat){
    appareilsNoRepeat.forEach((appareil) => {
        const appareilModel = appareilsFactory(appareil);
        const appareilCardDOM = appareilModel.getAppareilCardDOM();
        document.querySelector(".dropdownAppareils").appendChild(appareilCardDOM);
    });
} 

export async function displayUstensils(ingredientsNoRepeat){
    ingredientsNoRepeat.forEach((ingredient) => {
        const ingredientModel = ustensilsFactory(ingredient);
        const ingredientCardDOM = ingredientModel.getUstensilCardDOM();
        document.querySelector(".dropdownUstensiles").appendChild(ingredientCardDOM);
    });
} 

//affiche la liste au click de l'input
const ingredientsInput = document.querySelector(".inputRecherche__filter__ingredients");
const ingredientList = document.querySelector(".dropdownIngredients");
ingredientsInput.addEventListener("click", function(){
    ingredientList.style.display = "flex";
});

const appareilsInput = document.querySelector(".inputRecherche__filter__appareils");
const appareilList = document.querySelector(".dropdownAppareils");
appareilsInput.addEventListener("click", function(){
    appareilList.style.display = "flex";
});

//elève l'affichage des listes au click sur la page sauf dans les inputs
document.getElementById("body").addEventListener("click", function(e){
    if(e.target != document.getElementById("ingredients")){
    ingredientList.style.display = "none";
    }
});


// const outilsInput = document.querySelector(".inputRecherche__filter__outils");

// const maListeAppliance = listeAppareil(recipes);
