export class ResolutionMessage {
    constructor(game){
        this.game = game;
        this.width = (window.innerWidth * 0.5);
        this.height = (window.innerHeight * 0.5);
        this.x = (window.innerWidth * 0.25)
        this.y = (window.innerHeight * 0.25) ;
    }

    draw(context){
        context.fillRect(this.x, this.y, this.width, this.height);
    }

}