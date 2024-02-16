/**CHECK IF MOUSE X AND Y ARE INSIDE THE ELEMENT POSITION */
export const CheckMouseCollision = (Element, GameData) => {

    if(GameData.MouseX > Element.x && GameData.MouseX < Element.x + Element.width
    && GameData.MouseY > Element.y && GameData.MouseY < Element.y + Element.height) {
        return true;
    } else {
        return false;
    }

}