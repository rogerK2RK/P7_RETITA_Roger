export function ustensilsFactory(ustensils){

    function getUstensilCardDOM(){
        let link = document.createElement('a');
        let liste = document.createElement('li');
        liste.textContent = ustensils;
        link.className = "ustensilsListe";
        link.appendChild(liste);
        return (link);
    }
    return {getUstensilCardDOM}
}