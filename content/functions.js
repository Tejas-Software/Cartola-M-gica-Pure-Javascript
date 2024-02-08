export let context = canvas.getContext("2d");

export class Image {
    constructor(imagePath, xpos, ypos, width, height) {
        this.imagePath = imagePath;
        this.xpos = xpos;
        this.ypos = ypos;
        this.width = width;
        this.height = height;
        this.img = new window.Image();
        this.img.src = this.imagePath;
    }

    draw(context) {
        this.img.onload = () => {
            context.drawImage(this.img, this.xpos, this.ypos, this.width, this.height);
        }
    }

    resize(newWidth, newHeight) {
        this.width = newWidth;
        this.height = newHeight;
    }
};

export const renderStartScreen = () => {

    document.body.style.margin = "0 0 0 0"
    document.body.style.overflow = "hidden"

    let canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.margin = "0";
    canvas.height = window.innerHeight;
    canvas.style.background = "black";
};

export const createImage = (context, imagePath, xpos, ypos, width, height) => {
    let myImage = document.createElement("img");
    myImage.src = imagePath;
    myImage.onload = () => {
        context.drawImage(myImage, xpos, ypos, width, height)
    }
};