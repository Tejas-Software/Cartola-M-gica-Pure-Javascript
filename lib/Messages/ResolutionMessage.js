export class ResolutionMessage {
    constructor(game){

        const setAttributes = () => {
            this.game = game;
            this.width = (window.innerWidth * 0.5);
            this.height = (window.innerHeight * 0.5);
            this.x = (window.innerWidth * 0.25)
            this.y = (window.innerHeight * 0.25) ;
        }
        setAttributes();
    }

    draw(context){

        const renderText = () => {
            const text = "Vire o dispositivo | Ajuste a resolução";
            const textX = window.innerWidth * 0.06;
            const textY = window.innerHeight * 0.35;
            context.fillStyle = "white"; 
            context.font = "5vw Arial"; 
            context.fillText(text, textX, textY);
        }
        renderText();

    }

}