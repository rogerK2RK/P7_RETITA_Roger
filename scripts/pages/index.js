import { recetteFactory } from "../factories/recetteFactory.js";
import { ingredientsFactory } from "../factories/ingredientsFactory.js";
import { appareilsFactory } from "../factories/appareilsFactory.js";
import { ustensilsFactory } from "../factories/ustensilsFactory.js";
import { tagFactory } from "../factories/tagFactory.js";
import {listeIngredient, listeAppareil, listeUstensils} from "../utils/filtres.js";

let activeRecipesTab = [];
let ingredientTab = [];
let appareiltTab = [];
let ustensilTab = [];
let tabTag = new Array(); 


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

function searchInputTag(ingredientTab, inputValue){
    const result = ingredientTab.filter(function(tag){
        return tag.toLowerCase().includes(inputValue);
    });
    return result;
}

export function searchWithTag(tabTag){
    for(let i = 0 ; i < tabTag.length ; i++ ){
        if(tabTag[i].type === "ingredient"){
            activeRecipesTab = ingredientSearch(activeRecipesTab, tabTag[i].value);
        } else if(tabTag[i].type === "appareil"){
            activeRecipesTab = appareilSearch(activeRecipesTab, tabTag[i].value);
        } else if(tabTag[i].type === "ustensil"){
            activeRecipesTab = ustensilSearch(activeRecipesTab, tabTag[i].value);
        }  
        displayTag(tabTag);
    }
}

export function ingredientSearch(recipes, ingredient){
    const result = recipes.filter(function(recipe) {
        return recipe.ingredients.some(function(ingredientObj) {
            return ingredientObj.ingredient.toLowerCase().includes(ingredient.toLowerCase())
          });
    });
    displayData(result);
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
    displayData(result);
    return result;
}

async function init() {
    // Récupère les datas des photographes
    const { recipes } = await getMenu();
    activeRecipesTab = [...recipes];
    displayData(recipes);

    /* Recherche avec la barre de recherche */

    // accer au DOM 
    const barreDeRecherche = document.querySelector("#barreDeRecherche");

    barreDeRecherche.addEventListener("keyup", function(e){
        const rechercheLettre = e.target.value.toLowerCase();
        const filteredRecipes = search(recipes, rechercheLettre);
        displayData(filteredRecipes);
    });

    //Recupère les ingredients sans doublant
    ingredientTab = listeIngredient(activeRecipesTab);
    displayIngredient(ingredientTab);

    /** CHearch by input ingredient */
    const inptIngredient = document.querySelector("#ingredients");

    inptIngredient.addEventListener("keyup", function(e){
        const rechercheLettre = e.target.value.toLowerCase();
        const filteredRecipes = searchInputTag(ingredientTab, rechercheLettre);
        displayIngredient(filteredRecipes);
    });

    

    //recupère les éléments du dom
    const ingredientsLiDOM = [...document.querySelectorAll(".ingredientListe li")];

    ingredientsLiDOM.forEach(function(li) {
        li.addEventListener("click", function(){
            // activeRecipesTab = ingredientSearch(activeRecipesTab, li.textContent);
            if(!tabTag.some((tagObj) => tagObj.value === li.textContent)){
                tabTag.push({value: li.textContent, type: "ingredient"});
                searchWithTag(tabTag);
                ingredientTab = listeIngredient(activeRecipesTab);
                displayIngredient(ingredientTab);
                appareiltTab = listeAppareil(activeRecipesTab);
                displayAppareils(appareiltTab);
                ustensilTab = listeUstensils(activeRecipesTab);
                displayUstensils(ustensilTab);
            }
        });
    });

    //Recupère les appareils sans doublant
    appareiltTab = listeAppareil(recipes);
    displayAppareils(appareiltTab);

    /** CHearch by input appareil */
    const inptAppareil = document.querySelector("#appareils");

    inptAppareil.addEventListener("keyup", function(e){
        const rechercheLettre = e.target.value.toLowerCase();
        const filteredRecipes = searchInputTag(appareiltTab, rechercheLettre);
        displayAppareils(filteredRecipes);
    });
    //recupère les éléments du dom
    const appareilsLiDOM = [...document.querySelectorAll(".appareilListe li")];

    appareilsLiDOM.forEach(function(li) {
        li.addEventListener("click", function(){
            if(!tabTag.some((tagObj) => tagObj.value === li.textContent)){
                tabTag.push({value: li.textContent, type: "appareil"});
                searchWithTag(tabTag);
                appareiltTab = listeAppareil(activeRecipesTab);
                displayAppareils(appareiltTab);
                ustensilTab = listeUstensils(activeRecipesTab);
                displayUstensils(ustensilTab);
            }
        });
    });

    //Recupère les ustensil sans doublant
    ustensilTab = listeUstensils(recipes);
    displayUstensils(ustensilTab);

    /** CHearch by input appareil */
    const inptUstensil = document.querySelector("#ustensiles");

    inptUstensil.addEventListener("keyup", function(e){
        const rechercheLettre = e.target.value.toLowerCase();
        const filteredRecipes = searchInputTag(ustensilTab, rechercheLettre);
        displayUstensils(filteredRecipes);
    });
    //recupère les éléments du dom
    const ustensilsLiDOM = [...document.querySelectorAll(".ustensilsListe li")];

    ustensilsLiDOM.forEach(function(li) {
        li.addEventListener("click", function(){
            if (!tabTag.some((tagObj) => tagObj.value ===  li.textContent)) {
                tabTag.push({value: li.textContent, type: "ustensil"});
                searchWithTag(tabTag);
                ingredientTab = listeIngredient(activeRecipesTab);
                displayIngredient(ingredientTab);
                appareiltTab = listeAppareil(activeRecipesTab);
                displayAppareils(appareiltTab);
                ustensilTab = listeUstensils(activeRecipesTab);
                displayUstensils(ustensilTab);
            }
        });
    });
}
/**Delet tag */
export async function deleteTag(tabValue){
    console.log(tabTag);
    for(let i = 0 ; i < tabTag.length ; i++){
        if(tabTag[i].value === tabValue){
            const newTabTag = tabTag.filter((item) => item.value !== tabValue);
            console.log(newTabTag);
            searchWithTag(newTabTag);
            displayTag(newTabTag);
            /**Si le tableau de tag est vide */
            if(newTabTag.length == 0){
                console.log("le tableau est vide");
            }
        }
    }

}

init();

/** appel les factorys pour afficher les ingredients, Ustensils et appareils **/
export async function displayIngredient(ingredientsNoRepeat){
    document.querySelector(".dropdownIngredients").innerHTML = "";
    ingredientsNoRepeat.forEach((ingredient) => {
        const ingredientModel = ingredientsFactory(ingredient);
        const ingredientCardDOM = ingredientModel.getIngredientCardDOM();
        document.querySelector(".dropdownIngredients").appendChild(ingredientCardDOM);
    });
} 

export async function displayAppareils(appareilsNoRepeat){
    document.querySelector(".dropdownAppareils").innerHTML = "";
    appareilsNoRepeat.forEach((appareil) => {
        const appareilModel = appareilsFactory(appareil);
        const appareilCardDOM = appareilModel.getAppareilCardDOM();
        document.querySelector(".dropdownAppareils").appendChild(appareilCardDOM);
    });
} 

export async function displayUstensils(ustensilsNoRepeat){
    document.querySelector(".dropdownUstensiles").innerHTML = "";
    ustensilsNoRepeat.forEach((ingredient) => {
        const ustensilModel = ustensilsFactory(ingredient);
        const ustensilCardDOM = ustensilModel.getUstensilCardDOM();
        document.querySelector(".dropdownUstensiles").appendChild(ustensilCardDOM);
    });
} 
export async function displayTag(tabTag){
    document.querySelector(".allTag").innerHTML = "";
    tabTag.forEach((tag) => {
        const tagModel = tagFactory(tag);
        const tagCardDom = tagModel.getTagCardDOM();
        document.querySelector(".allTag").appendChild(tagCardDom);
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
document.getElementById("body").addEventListener("click", function(e){
    if(!document.querySelector(".allFilter__one").contains(e.target)){
        ingredientList.style.display = "none";
    }
    if(!document.querySelector(".allFilter__two").contains(e.target)){
        appareilList.style.display = "none";
    }
    if(!document.querySelector(".allFilter__three").contains(e.target)){
        outilList.style.display = "none";
    }
});

