export function appareilsFactory(appareils){

    function getAppareilCardDOM(){
        let link = document.createElement('a');
        let liste = document.createElement('li');
        liste.textContent = appareils;
        link.className = "appareilListe";
        link.appendChild(liste);
        return (link);
    }
    return {getAppareilCardDOM}
}