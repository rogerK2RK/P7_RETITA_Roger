import { recetteFactory } from "../factories/recetteFactory.js";

async function getMenu() {
    
    let dataMenu = await fetch('../../data/recipes.json');
    dataMenu = await dataMenu.json();
    
    return dataMenu;
   
}

async function displayData(recipes) {
    recipes.forEach((recipe) => {
        const recipeModel = recetteFactory(recipe);
        const userCardDOM = recipeModel.getUserCardDOM();
        document.querySelector(".all_recipes").appendChild(userCardDOM);
    });
    // console.log(recipes);
}

async function init() {
    // Récupère les datas des photographes
    const { recipes } = await getMenu();
    displayData(recipes);
}

init();