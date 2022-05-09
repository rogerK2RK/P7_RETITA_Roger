export function tagFactory(tabTag){

    function getTagCardDOM(){
        let tag = document.createElement("button");
        tag.textContent = tabTag;
        return (tag);
    }
    return {getTagCardDOM}
}