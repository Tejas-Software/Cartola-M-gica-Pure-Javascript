import { CheckMouseCollision } from "../Dynamics/Dynamics.js";

export class Timer {
    constructor(game, width, height, x, y, speed, image){

        const setAttributes = () => {
            this.game = game;
            this.width = width;
            this.initialWidth = width;
            this.height = height;
            this.x = x;
            this.y = y;
            this.speed = speed;
            this.image = image;
    
            this.interval = 0;
            this.minutes = 0;
            this.seconds = 0;
            this.milliseconds = 0;
            this.isPaused = 0;
        }
        setAttributes();



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

    StartTimer(){
        this.interval = setInterval(() => {
            if(!isPaused){
                this.milliseconds += 10;
                if(this.milliseconds === 1000) {
                    this.seconds++;
                    this.milliseconds = 0;
                }

                if(seconds === 60) {
                    this.minutes++;
                    seconds = 0;
                }

                
            }
        }, 10)
    }

}