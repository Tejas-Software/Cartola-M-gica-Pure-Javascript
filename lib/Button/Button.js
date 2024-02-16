import { CheckMouseCollision } from "../Dynamics/Dynamics.js";

export class Button {
    /**
     * The Button class starts with an instance of the game, and receives also width, height, x position, y position, speed and an image source to render it
     * inside a the game canvas. 
     * The Button class has some methods that deals with animating itself and also giving click functions as it is needed to be called after instanciating a new
     * class.
     */
    constructor(game, width, height, x, y, speed, image){
        this.game = game;
        this.width = width;
        this.initialWidth = width;
        this.height = height;
        this.initialHeight = height;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.image = image;
    }

    /**
     * This method needs to be called to start this element into canvas, the rest is not so necessary, but this one is mandatory.
     */
    BeginPlay(context){
        if(this.image){
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }

    }

    HoverTransformScale(GameData){
        
        let bIsMouseColliding = CheckMouseCollision(this, GameData);
        if (bIsMouseColliding && this.width <= this.initialWidth * 1.1) {
            this.width += 1;
            this.height += 1;
            document.body.style.cursor = "pointer"
        } else if (!bIsMouseColliding && this.width >= this.initialWidth){
            this.width -= 1;
            this.height -= 1;
            document.body.style.cursor = "auto"
        }

    }

    GoToLink(GameData, Link){
        let bIsMouseColliding = CheckMouseCollision(this, GameData);
        if(bIsMouseColliding && GameData.Clicked){

            location.href = Link;
        }

    }

}