import { deleteTag } from "../pages/index.js";
export function tagFactory(tabTag){

    function getTagCardDOM(){
        let tag = document.createElement("button");
        tag.textContent = tabTag.value;
        let icon = document.createElement("i");
        icon.className = "fa fa-times-circle-o icone"; 
        if (tabTag.type === "ustensil"){
            tag.classList.add("inputRecherche__filter__outils");
        }else if( tabTag.type === "appareil"){
            tag.classList.add("inputRecherche__filter__appareils");
        }else if(tabTag.type === "ingredient"){
            tag.classList.add("inputRecherche__filter__ingredients");
        }
        tag.classList.add("tag");

        icon.addEventListener("click", function(){
            deleteTag(tabTag.value);
        });

        tag.appendChild(icon);
        return (tag);
    }
    return {getTagCardDOM}
}