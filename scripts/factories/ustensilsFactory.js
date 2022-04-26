export function ustensilsFactory(ustensils){

    function getUstensilCardDOM(){
        let liste = document.createElement('li');
        liste.textContent = ustensils;
        return (liste);
    }
    return {getUstensilCardDOM}
}