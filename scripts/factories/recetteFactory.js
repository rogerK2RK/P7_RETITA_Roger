export function recetteFactory(recipe){

    const {name, time, description, ingredients} = recipe;
    function getUserCardDOM(){

        const article = document.createElement( 'article' );
        article.className = "all_recipes__articles";
        const img = document.createElement( 'img' );
        img.className = "all_recipes__articles__images";
        const nomRecette = document.createElement( 'h2' );
        nomRecette.textContent = name;
        nomRecette.className = "all_recipes__articles__nomRecette";
        const picto = document.createElement( 'i' );
        picto.className = "fa fa-clock-o all_recipes__articles__picto";
        picto.setAttribute("aria-hidden", "true");
        const duree = document.createElement( 'p' );
        duree.textContent = time+" min";
        duree.className = "all_recipes__articles__dures";
        let elements = " ";
        let ingrdt = document.createElement( 'p' );
        for (let i = 0 ; i < ingredients.length ; i++){
            let nameIngredient = ingredients[i].ingredient;
            let quantityIngredient = ingredients[i].quantity;
            let unitIngredient = ingredients[i].unit;
                elements += `<span class="all_recipes__articles__ingredients__nameIngredient">${nameIngredient}</span> : ${quantityIngredient ||""} ${unitIngredient ||""} <br>`;
        }
        ingrdt.innerHTML = elements;
        ingrdt.className = "all_recipes__articles__ingredients";
        const descrpt = document.createElement( 'p' );
        descrpt.textContent = description;
        descrpt.className = "all_recipes__articles__descritpion";
        
        article.appendChild(img);
        article.appendChild(nomRecette);
        article.appendChild(picto);
        article.appendChild(duree);
        article.appendChild(ingrdt);
        article.appendChild(descrpt);

        return (article);
    }
    return {getUserCardDOM}
}