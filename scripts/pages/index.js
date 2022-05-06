import { recetteFactory } from "../factories/recetteFactory.js";
import { ingredientsFactory } from "../factories/ingredientsFactory.js";
import { appareilsFactory } from "../factories/appareilsFactory.js";
import { ustensilsFactory } from "../factories/ustensilsFactory.js";
import {listeIngredient, listeAppareil, listeUstensils} from "../utils/filtres.js";

let activeRecipesTab = [];
let ingredientTab = [];
let appareiltTab = [];
let ustensilTab = [];


async function getMenu() {
    
    let dataMenu = await fetch('../../data/recipes.json');
    dataMenu = await dataMenu.json();
    
    return dataMenu;
   
}

// Appel la recetteFactory pour afficher les recettes
async function displayData(recipes) {
    document.querySelector(".all_recipes").innerHTML = "";
    // créer un tableau récuperant les elements afficher pour pouvoir l'utiliser dans les fintres 
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

export function ingredientSearch(recipes, ingredient){
    const result = recipes.filter(function(recipe) {
        return recipe.ingredients.some(function(ingredientObj) {
            return ingredientObj.ingredient.toLowerCase().includes(ingredient.toLowerCase())
          });
    });
    displayData(result);
    // console.log(result);
    return result;
}

export function appareilSearch(recipes, appareil){
    const result = recipes.filter(function(recipe) {
        return recipe.appliance.toLowerCase().includes(appareil.toLowerCase())
    });
    displayData(result);
    return result;
}

export function ustensilSearch(recipes, ustensil){
    const result = recipes.filter(function(recipe) {
        return recipe.ustensils.some(function(ust){
            return ust.toLowerCase().includes(ustensil.toLowerCase())
        });
    });
    // console.log(result);
    displayData(result);
    return result;
}

async function init() {
    // Récupère les datas des photographes
    const { recipes } = await getMenu();
    activeRecipesTab = [...recipes];
    displayData(recipes);

    /* Recherche avec la barre de recherche */

    const barreDeRecherche = document.querySelector("#barreDeRecherche");

    barreDeRecherche.addEventListener("keyup", function(e){
        const rechercheLettre = e.target.value.toLowerCase();
        const filteredRecipes = search(recipes, rechercheLettre);
        displayData(filteredRecipes);
        // const applianceList = generateAppliance(filteredRecipes);
    });
    let tabTag = new Array(); 

    //Recupère les ingredients sans doublant
    ingredientTab = listeIngredient(recipes);
    displayIngredient(ingredientTab);

    //recupère les éléments du dom
    const ingredientsLiDOM = [...document.querySelectorAll(".ingredientListe li")];

    ingredientsLiDOM.forEach(function(li) {
        li.addEventListener("click", function(){
            // console.log(li.textContent);
            activeRecipesTab = ingredientSearch(activeRecipesTab, li.textContent);
            tabTag.push(li.textContent);
            console.log(tabTag);
        });
    });

    
    //Recupère les appareils sans doublant
    appareiltTab = listeAppareil(recipes);
    displayAppareils(appareiltTab);

    //recupère les éléments du dom
    const appareilsLiDOM = [...document.querySelectorAll(".appareilListe li")];

    appareilsLiDOM.forEach(function(li) {
        li.addEventListener("click", function(){
            // console.log(li.textContent);
            activeRecipesTab = appareilSearch(activeRecipesTab, li.textContent);
            tabTag.push(li.textContent);
            console.log(tabTag);
        });
    });

    //Recupère les ustensil sans doublant
    ustensilTab = listeUstensils(recipes);
    displayUstensils(ustensilTab);

    //recupère les éléments du dom
    const ustensilsLiDOM = [...document.querySelectorAll(".ustensilsListe li")];

    ustensilsLiDOM.forEach(function(li) {
        li.addEventListener("click", function(){
            // console.log(li.textContent);
            activeRecipesTab = ustensilSearch(activeRecipesTab, li.textContent);
            tabTag.push(li.textContent);
            console.log(tabTag);
        });
    });
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

const outilsInput = document.querySelector(".inputRecherche__filter__outils");
const outilList = document.querySelector(".dropdownUstensiles");
outilsInput.addEventListener("click", function(){
    outilList.style.display = "flex";
});

//elève l'affichage des listes au click sur la page sauf dans les inputs
// document.getElementById("body").addEventListener("click", function(e){
//     if(e.target != document.getElementById("ingredients")){
//         ingredientList.style.display = "none";
//         console.log("Hello");
//     }
//     if(e.target != document.getElementById("appareils")){
//         appareilList.style.display = "none";
//     }
//     if(e.target != document.getElementById("ustensiles")){
//         outilList.style.display = "none";
//     }
// });



// const maListeAppliance = listeAppareil(recipes);
