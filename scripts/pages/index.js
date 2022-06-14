import { recetteFactory } from "../factories/recetteFactory.js";
import { ingredientsFactory } from "../factories/ingredientsFactory.js";
import { appareilsFactory } from "../factories/appareilsFactory.js";
import { ustensilsFactory } from "../factories/ustensilsFactory.js";
import { tagFactory } from "../factories/tagFactory.js";
import { listeIngredient, listeAppareil, listeUstensils } from "../utils/filtres.js";
import { ingredientSearch, appareilSearch, ustensilSearch  } from "../search/index.js";

let recipes = [];
let searchRecipes = [];
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

function searchInputTag(tagTab, inputValue){
    const result = tagTab.filter(function(tag){
        return tag.toLowerCase().includes(inputValue);
    });
    return result;
}

function searchWithTag(tabTag){
    activeRecipesTab = [...searchRecipes];
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
    displayData(activeRecipesTab);
}



async function init() {
    // Récupère les datas des photographes
    const { recipes: recipesJson } = await getMenu();
    recipes = [...recipesJson];
    activeRecipesTab = [...recipes];
    searchRecipes = [...recipes];
    displayData(recipes);

    /* Recherche avec la barre de recherche */

    // accer au DOM 
    const barreDeRecherche = document.querySelector("#barreDeRecherche");
    const erreurRecherche = document.querySelector(".erreur-search");

    barreDeRecherche.addEventListener("keyup", function(e){
        if( /^([a-z]{2,})$/.test(e.target.value) ){
            const rechercheLettre = e.target.value.toLowerCase();
            searchRecipes = search(recipes, rechercheLettre);
            displayData(searchRecipes);
            ingredientTab = listeIngredient(searchRecipes);
            displayIngredient(ingredientTab);
            appareiltTab = listeAppareil(searchRecipes);
            displayAppareils(appareiltTab);
            ustensilTab = listeUstensils(searchRecipes);
            displayUstensils(ustensilTab);
            addIngClickListenerIngredient();
            addIngClickListenerAppareil();
            addIngClickListenerUstensil();
            erreurRecherche.innerText = "";
        }else{
            erreurRecherche.innerText = "* Veuillez saisir 3 caractères minimum. Et pas de signe spéciaux ou de chiffre !";
        }
        //message d'erreu pour l'affichage
        if(searchRecipes.length === 0){
            erreurRecherche.innerText = "* Votre saisi ne correspond à aucun élément des recettes ! Veiller re-saisir !";
        }
    });

    //Recupère les ingredients sans doublant
    ingredientTab = listeIngredient(activeRecipesTab);
    displayIngredient(ingredientTab);

    /** CHearch by input ingredient */
    const inptIngredient = document.querySelector("#ingredients");
    const erreurIngredient = document.querySelector(".errorIngredient");

    inptIngredient.addEventListener("keyup", function(e){
        if( /^([a-z]{2,})$/.test(e.target.value) ){
            const rechercheLettre = e.target.value.toLowerCase();
            let filteredRecipes = searchInputTag(ingredientTab, rechercheLettre);
            displayIngredient(filteredRecipes);
            addIngClickListenerIngredient();
            erreurIngredient.style.display = "none";
            erreurIngredient.innerText = "";
        }else{
            erreurIngredient.style.display = "block";
            erreurIngredient.innerText = "* Veuillez ne pas saisir de chiffre !";
        }
    });



    
    addIngClickListenerIngredient();

    //Recupère les appareils sans doublant
    appareiltTab = listeAppareil(recipes);
    displayAppareils(appareiltTab);

    /** CHearch by input appareil */
    const inptAppareil = document.querySelector("#appareils");
    const erreurAppareil = document.querySelector(".errorAppareil");

    inptAppareil.addEventListener("keyup", function(e){
        if( /^([a-z]{2,})$/.test(e.target.value) ){
        const rechercheLettre = e.target.value.toLowerCase();
        const filteredRecipes = searchInputTag(appareiltTab, rechercheLettre);
        displayAppareils(filteredRecipes);
        addIngClickListenerAppareil();
        erreurAppareil.style.display = "none";
        erreurAppareil.innerText = "";
        }else{
            erreurAppareil.style.display = "block";
            erreurAppareil.innerText = "* Veuillez ne pas saisir de chiffre !";
        }
    });

    
    addIngClickListenerAppareil();

    //Recupère les ustensil sans doublant
    ustensilTab = listeUstensils(recipes);
    displayUstensils(ustensilTab);

    /** CHearch by input appareil */
    const inptUstensil = document.querySelector("#ustensiles");
    const erreurUstensil = document.querySelector(".errorUstensile");

    inptUstensil.addEventListener("keyup", function(e){
        if( /^([a-z]{2,})$/.test(e.target.value) ){
        const rechercheLettre = e.target.value.toLowerCase();
        const filteredRecipes = searchInputTag(ustensilTab, rechercheLettre);
        displayUstensils(filteredRecipes);
        addIngClickListenerUstensil();
        erreurUstensil.style.display = "none";
        erreurUstensil.innerText = "";
        }else{
            erreurUstensil.style.display = "block";
            erreurUstensil.innerText = "* Veuillez ne pas saisir de chiffre !";
        }
    });

    
    addIngClickListenerUstensil();
    
}

init();
function addIngClickListenerIngredient() {
    //recupère les éléments du dom
const ingredientsLiDOM = [...document.querySelectorAll(".ingredientListe li")];
    ingredientsLiDOM.forEach(function(li) {
        li.addEventListener("click", function(){
            if(!tabTag.some((tagObj) => tagObj.value === li.textContent)){
                tabTag.push({value: li.textContent, type: "ingredient"});
                searchWithTag(tabTag);
                ingredientTab = listeIngredient(activeRecipesTab);
                displayIngredient(ingredientTab);
                addIngClickListenerIngredient();
                appareiltTab = listeAppareil(activeRecipesTab);
                displayAppareils(appareiltTab);
                addIngClickListenerAppareil();
                ustensilTab = listeUstensils(activeRecipesTab);
                displayUstensils(ustensilTab);
                addIngClickListenerUstensil();
            }
        });
    });
}
function addIngClickListenerAppareil(){
    //recupère les éléments du dom
    const appareilsLiDOM = [...document.querySelectorAll(".appareilListe li")];

    appareilsLiDOM.forEach(function(li) {
        li.addEventListener("click", function(){
            if(!tabTag.some((tagObj) => tagObj.value === li.textContent)){
                tabTag.push({value: li.textContent, type: "appareil"});
                searchWithTag(tabTag);
                ingredientTab = listeIngredient(activeRecipesTab);
                displayIngredient(ingredientTab);
                addIngClickListenerIngredient();
                appareiltTab = listeAppareil(activeRecipesTab);
                displayAppareils(appareiltTab);
                addIngClickListenerAppareil();
                ustensilTab = listeUstensils(activeRecipesTab);
                displayUstensils(ustensilTab);
                addIngClickListenerUstensil();
            }
        });
    });
}

function addIngClickListenerUstensil(){
    //recupère les éléments du dom
    const ustensilsLiDOM = [...document.querySelectorAll(".ustensilsListe li")];

    ustensilsLiDOM.forEach(function(li) {
        li.addEventListener("click", function(){
            if (!tabTag.some((tagObj) => tagObj.value ===  li.textContent)) {
                tabTag.push({value: li.textContent, type: "ustensil"});
                searchWithTag(tabTag);
                ingredientTab = listeIngredient(activeRecipesTab);
                displayIngredient(ingredientTab);
                addIngClickListenerIngredient();
                appareiltTab = listeAppareil(activeRecipesTab);
                displayAppareils(appareiltTab);
                addIngClickListenerAppareil();
                ustensilTab = listeUstensils(activeRecipesTab);
                displayUstensils(ustensilTab);
                addIngClickListenerUstensil();
            }
        });
    });
}
/**Delet tag */
export async function deleteTag(tabValue){
    let newTabTag = [];

    for(let i = 0 ; i < tabTag.length ; i++){
        if(tabTag[i].value === tabValue){
            newTabTag = tabTag.filter((item) => item.value !== tabValue);
            searchWithTag(newTabTag);
            displayTag(newTabTag);
            ingredientTab = listeIngredient(activeRecipesTab);
            displayIngredient(ingredientTab);
            addIngClickListenerIngredient();
            appareiltTab = listeAppareil(activeRecipesTab);
            displayAppareils(appareiltTab);
            addIngClickListenerAppareil();
            ustensilTab = listeUstensils(activeRecipesTab);
            displayUstensils(ustensilTab);
            addIngClickListenerUstensil();
        }
    }

    tabTag = [...newTabTag];

}

 
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

