import { CheckMouseCollision } from "../Dynamics/Dynamics.js";

export class Image {
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
        }
        setAttributes();

        const setModalAttributes = () => {
            this.showModal = false;
        }
        setModalAttributes();

    }

    BeginPlay(context){

        context.drawImage(this.image, this.x, this.y, this.width, this.height);

    }

    HoverTransformScale(GameData, params){

        let paramsLength = params?.length;
        let trueParams = 0;

        if(params){
            
            params.map((param)=>{if(param){trueParams+=1;}})

            if(paramsLength === trueParams){
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
        
        } else {
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
    }

    GoToLink(GameData, Link){
        let bIsMouseColliding = CheckMouseCollision(this, GameData);
        if(bIsMouseColliding && GameData.Clicked){

            location.href = Link;
        }

    }

    //callback is the function executed when clicked
    //GameData is used to store variables like mouse position and if is clicked
    //params is optional, when a button needs some variables to be truth they are passed here in the params (array type)
    OnClick(callback, GameData, params){
        let paramsLength = params?.length;
        let trueParams = 0;

        if(params){
            params.map((param)=>{if(param){trueParams+=1;}})

            if(paramsLength === trueParams){
                let bIsMouseColliding = CheckMouseCollision(this, GameData);
                if(bIsMouseColliding && GameData.Clicked){
                    callback();
                }
            }
        } else {
            let bIsMouseColliding = CheckMouseCollision(this, GameData);
            if(bIsMouseColliding && GameData.Clicked){
                callback();
            }
        }


    }


}