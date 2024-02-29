import { CheckMouseCollision } from "../Dynamics/Dynamics.js";

export class Character {
    constructor(game, width, height, x, y, speed, image, GameData){
        this.game = game;
        this.width = width;
        this.initialWidth = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.image = GameData.CharacterRiddenIdleRight;
    }

    BeginPlay(context){

        context.drawImage(this.image, this.x, this.y, this.width, this.height);

    }

    HoverTransformScale(GameData){
        
        let bIsMouseColliding = CheckMouseCollision(this, GameData);
        if (bIsMouseColliding && this.width <= this.initialWidth * 1.02) {
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