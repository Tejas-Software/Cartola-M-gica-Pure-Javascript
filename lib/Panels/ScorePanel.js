export class ScorePanel {
    constructor(game, image, height, width, x, y, speed, score, opacity, titleText, titleFont, titleSize, titleColor, scoreFont, scoreTextSize, scoreTextColor){

        const setAttributes = () => {
            this.game = game;
            this.image = image;
            this.height = height;
            this.width = width;
            this.x = x;
            this.y = y ;
            this.speed = speed;
            this.score = score;
            this.opacity = opacity;
            this.titleText = titleText;
            this.titleFont = titleFont;
            this.titleSize = titleSize;
            this.titleColor = titleColor;
            this.scoreFont = scoreFont;
            this.scoreTextSize = scoreTextSize;
            this.scoreTextColor = scoreTextColor;
            
        }
        setAttributes();


    }

    BeginPlay(context){



        const renderImage = () => {
            context.globalAlpha = this.opacity;
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.globalAlpha = 1;
        }
        renderImage();
        

        const renderTextTitle = () => {

            console.log()

            context.font = this.titleSize + " " + this.titleFont; 
            context.fillStyle = this.titleColor; 
        
           context.fillText(this.titleText, this.x + (this.x * 0.017) , this.y + (this.height * 0.3));
        }
        renderTextTitle()


        const renderTextPoints = () => {
            context.font = this.scoreTextSize + " " + this.scoreFont; 
            context.fillStyle = this.scoreTextColor; 
            let textPoints = `${this.score > 0 ? this.score : "000"}`; 
        
            context.fillText(textPoints, this.x + (this.x * 0.017) , this.y + (this.height * 0.89));
        }
        renderTextPoints();
    }

    Tick(score){

        const begginingAnimation = (origin) => {
            if(origin === "AppearGradient"){
                if(this.opacity < 1){
                    this.opacity += 0.009;

                }
            }
        }
        begginingAnimation("AppearGradient");

        this.score = score;


    }
}