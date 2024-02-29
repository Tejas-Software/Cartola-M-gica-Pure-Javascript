export class TimerPanel {
    constructor(game, image){
        const setAttributes = () => {
            this.game = game;
            this.image = image;
    
            this.height = window.innerHeight * 0.1;
            this.width = window.innerWidth * 0.13;
    
            this.x = window.innerWidth * 0.08
            this.y = -50 ;
            this.speed = 1.4;

            this.milliseconds = 0;
            this.seconds = 0;
            this.minutes = 0;
    
            this.opacity = 0;
        }
        setAttributes();
    }

    draw(context){


        const renderImage = () => {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        renderImage();


        const renderTextTimer = () => {
            let text;
            context.font = `4vw agency`; 
            context.fillStyle = 'white'; 
            if(this.seconds < 10 && this.minutes < 10){
                text = `0${this.minutes}:0${this.seconds}`; 
            } else if (this.seconds >= 10 && this.minutes < 10) {
                text = `0${this.minutes}:${this.seconds}`
            }

            context.fillText(text, (this.width * 0.8) , this.height * 0.95);
        }
        renderTextTimer();
        

    }
    

    tick(){

        this.milliseconds += 15;

        if(this.milliseconds >= 1000){
            this.seconds += 1;
            this.milliseconds = 0;
        }

        if(this.seconds === 60){
            this.minutes += 1;
            this.seconds = 0;
        }

        const begginingAnimation = (origin) => {
            if(origin === "fromBottom"){
                if(this.y < window.innerHeight * 0.012){
                    this.y += this.speed;
                }

            }

        }
       begginingAnimation("fromBottom");

    }
}