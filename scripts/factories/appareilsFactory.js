export function appareilsFactory(appareils){

    function getAppareilCardDOM(){
        let liste = document.createElement('li');
        liste.textContent = appareils;
        return (liste);
    }
    return {getAppareilCardDOM}
}