class Player {
    constructor(game){
        this.game = game;
        this.points = 0;
    }
}

class BrandLogo {
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = (window.innerHeight / 10);
        this.x = (window.innerWidth / 100);
        this.y = (window.innerHeight - 10) ;
        this.speed = 1.5;
    }

    draw(context){
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    tick(){

        if(this.y >= (window.innerHeight / 1.16)){
            this.y -= this.speed;
        }
    }
}

class ButtonStart {
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = (window.innerHeight / 10);
        this.x = (window.innerWidth / 1.18);
        this.y = (window.innerHeight * 1.15) ;
        this.speed = 1.5;
    }

    draw(context){
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    tick(){

        if(this.y >= (window.innerHeight / 1.3)){
            this.y -= this.speed;
        }
    }
}

class ImageCartola {
    constructor(game){
        this.game = game;
        this.width = (window.innerWidth * 0.5);
        this.height = (window.innerHeight * 0.2);
        this.x = (window.innerWidth * 0.25)
        this.y = (window.innerHeight * 0.1) - 200 ;
        this.speed = 1.5;
    }

    draw(context){
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    tick(){

        if(this.y <= (window.innerHeight * 0.15)){
            this.y += this.speed;
        }
    }
}

class Background {

}

class Actors {

}

class Game {
    constructor(canvas){
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.brand_logo = new BrandLogo(this)
        this.ButtonStart = new ButtonStart(this)
        this.ImageCartola = new ImageCartola(this)
    }
    render(context){
        this.brand_logo.draw(context)
        this.brand_logo.tick();

        this.ButtonStart.draw(context)
        this.ButtonStart.tick();

        this.ImageCartola.draw(context)
        this.ImageCartola.tick()
    }
}

window.addEventListener('load', ()=>{
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth - 10;
    canvas.height = window.innerHeight - 10;

    const game = new Game(canvas);


    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.render(ctx);
        requestAnimationFrame(animate);
    }
    animate();
})

window.addEventListener('resize', () => {location.reload();})