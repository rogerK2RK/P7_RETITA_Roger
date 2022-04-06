import { recetteFactory } from "../factories/recetteFactory.js";

async function getMenu() {
    
    let dataMenu = await fetch('../../data/recipes.json');
    dataMenu = await dataMenu.json();
    
    return dataMenu;
   
}

// Appel la recetteFactory pour afficher les recettes
async function displayData(recipes) {
    recipes.forEach((recipe) => {
        const recipeModel = recetteFactory(recipe);
        const userCardDOM = recipeModel.getUserCardDOM();
        document.querySelector(".all_recipes").appendChild(userCardDOM);
    });
    // console.log(recipes);
}


/* Recherche avec la barre de recherche */

const barreDeRecherche = document.querySelector("#barreDeRecherche");

barreDeRecherche.addEventListener("keyup", function(e){
    const rechercheLettre = e.target.value;const allResultatRechercheRectte = [];
    const cards = document.querySelectorAll(".all_recipes__articles");
    filterElements(rechercheLettre, cards, allResultatRechercheRectte);
});

function filterElements(letters, elements, newtTab){
    
    if(letters.length > 2){
        for(let i = 0 ; i < elements.length ; i++){
            if(elements[i].textContent.toLowerCase().includes(letters)){ //verifie si la cards contien les lettres saisies
                elements[i].style.display = "block";
            } else {
                elements[i].style.display = "none";
            }
        }
    }
}

async function init() {
    // Récupère les datas des photographes
    const { recipes } = await getMenu();
    displayData(recipes);
}

init();