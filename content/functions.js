export const createBackground = (image) => {
    document.body.style.width = "100vw";
    document.body.style.height = "100vh"
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

