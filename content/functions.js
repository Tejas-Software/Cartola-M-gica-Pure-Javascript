export const createBackground = (image) => {
    document.body.style.width = "100vw";
    document.body.style.height = "100vh"; 
    document.body.style.backgroundImage = `url(${image})`;
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    document.body.style.overflow = "hidden";
    document.body.style.scrollBehavior = "none";
}
export const insertImage = (src, bottom, left, opacity, width, height, zIndex) => {
    let currentImage = document.createElement("img");
    currentImage.src = src
    currentImage.classList.add("image") 
    currentImage.style.opacity = opacity
    currentImage.style.userSelect = "none"
    currentImage.style.position = "absolute"
    currentImage.style.bottom = bottom
    currentImage.style.left = left
    currentImage.style.width = width
    currentImage.style.height = height
    currentImage.style.zIndex = zIndex
    document.body.appendChild(currentImage)
}
export const insertImageWithHoverAndLink = (src, bottom, left, opacity, width, height, zIndex, link) => {
  
    let currentImage = document.createElement("img"); 
    currentImage.src = src
    currentImage.classList.add("image") 
    currentImage.style.opacity = opacity
    currentImage.style.position = "absolute"
    currentImage.style.bottom = bottom
    currentImage.style.left = left
    currentImage.style.width = width
    currentImage.style.transition = "0.3s"
    currentImage.style.cursor = "pointer"
    currentImage.style.height = height
    currentImage.style.zIndex = zIndex
    currentImage.style.userSelect = "none"

    const scaleImageUp = () => {
        currentImage.style.transform = "scale(1.1)"
        currentImage.style.transition = "0.3s"
    }

    const scaleImageDown = () => {
        currentImage.style.transform = "scale(1)"
        currentImage.style.transition = "0.3s"
    }


    currentImage.addEventListener("mouseenter", scaleImageUp)
    currentImage.addEventListener("mouseleave", scaleImageDown)

    
    document.body.appendChild(currentImage)
}
export const turnPhoneToPlay = () => {


    let message = document.createElement("p");
    message.id = "turnPhoneToPlay";
    message.style.position = "absolute";
    message.style.left = "5vw"
    message.style.top = "1vh"
    message.style.userSelect = "none"
    message.style.color = "white";
    message.style.textAlign = "center";
    message.style.textShadow = "2pt 1pt 5pt black";
    message.style.fontSize = "12vw"
    message.style.fontFamily = "arial"
    message.style.fontWeight = "bold"

    message.innerText = "VIRE O DISPOSITIVO PARA JOGAR."

    let brand_logo = document.createElement("img");
    brand_logo.style.position = "absolute";
    brand_logo.id = "brand_logo";
    brand_logo.style.userSelect = "none"
    brand_logo.style.left = "18vw"
    brand_logo.style.bottom = "5vh"
    brand_logo.style.opacity = "0.5"
    brand_logo.style.width = "65vw"
    brand_logo.src = '/content/tela_01/brand_logo.png'



    document.body.append(message, brand_logo)
}
export const unrenderTurnPhoneToPlay = () => {

    let element = document.getElementById('turnPhoneToPlay');
    let brand_logo = document.getElementById('brand_logo')
    if(element){
        element.parentNode.removeChild(element);
    }
    if(brand_logo){
        brand_logo.parentNode.removeChild(brand_logo);
    }


}

