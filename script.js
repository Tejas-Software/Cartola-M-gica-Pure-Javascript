let start_button_hover = {x: 0, y: 0, width: 0, height: 0}


class Player {
    constructor(game){
        this.game = game;
        this.points = 0;
    }
}

class BrandLogo {
    constructor(game){
        this.game = game;
        this.width = window.innerWidth * 0.25;
        this.height = this.width * 0.20;
        this.x = (window.innerWidth / 100);
        this.y = window.innerWidth /  window.innerWidth * window.innerHeight ;
        this.speed = 1.5;
        this.image = document.getElementById("brand_logo")
    }

    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    tick(){

        if(this.y >= (window.innerHeight - (this.height * 1.5))){
            this.y -= this.speed;
        }
    }
}

class ButtonStart {
    constructor(game){
        this.game = game;
        this.width = (window.innerWidth * 0.10);
        this.height = this.width * 0.4
        this.x = (window.innerWidth / 1.18);
        this.y = (window.innerHeight * 1.25) ;
        this.speed = 1.5;
        this.image = document.getElementById("button_start")
    }
    

    draw(context){

        context.drawImage(this.image, this.x, this.y, this.width, this.height);

    }

    tick(){
        if(this.y >= (window.innerHeight * 0.95) - this.height){
            this.y -= this.speed;
        }
        if(this.x >= (window.innerWidth * 0.95) - this.width){
            this.x -= this.speed;
        }
        start_button_hover.x = this.x
        start_button_hover.y = this.y
        start_button_hover.width = this.width
        start_button_hover.height = this.height
    }
}

class ImageCartola {
    constructor(game){
        this.game = game;
        this.width = window.innerWidth * 0.5;
        this.height = this.width * 0.50;
        this.x = (window.innerWidth * 0.20)
        this.y = (window.innerHeight * -0.5) ;
        this.speed = 4.5;
        this.image = document.getElementById("image_cartola")
    }

    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    tick(){

        if(this.y <= (window.innerHeight - (window.innerHeight * 0.98))){
            this.y += this.speed;
        }
    }
}

class ResolutionMessage {
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

class ImageCartas {
    constructor(game){
        this.game = game;
        this.width = window.innerWidth * 0.6;
        this.height = this.width * 0.50;
        this.x = (window.innerWidth * 0.20)
        this.y = (window.innerHeight * 1.5) ;
        this.speed = 4.5;
        this.image = document.getElementById("image_cartas")
    }

    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    tick(){

        if(this.y >= (window.innerHeight * 0.98) - this.height){
            this.y -= this.speed;
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
        this.ImageCartas = new ImageCartas(this)
        this.ResolutionMessage = new ResolutionMessage(this)
    }
    render(context){

        this.ButtonStart.draw(context)
        this.ButtonStart.tick();

        this.ImageCartas.draw(context)
        this.ImageCartas.tick()

        this.ImageCartola.draw(context)
        this.ImageCartola.tick()

        this.brand_logo.draw(context)
        this.brand_logo.tick();


    }
    renderResolutionMessage(context){
        this.brand_logo.draw(context)
        this.brand_logo.tick();
        this.ResolutionMessage.draw(context)
    }
}

window.addEventListener('load', ()=>{
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth - 10;
    canvas.height = window.innerHeight - 10;

    const game = new Game(canvas);


    const animate = () => {
        if(canvas.width > 650 && canvas.height > 375) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            game.render(ctx);
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            game.renderResolutionMessage(ctx);
            requestAnimationFrame(animate);
        }

    }
    animate();


    const hover_on_element = (hover_this_element) => {

        canvas.addEventListener('mousemove', function(event) {

            let rect = canvas.getBoundingClientRect();
            let mouseX = event.clientX - rect.left;
            let mouseY = event.clientY - rect.top;
    
            console.log("Mx: " + mouseX);
            console.log("Hx: " + hover_this_element.x);
            
            console.log("My: " + mouseY);
            console.log("Hy " + hover_this_element.y);

            if(mouseX >= hover_this_element.x && mouseX <= (hover_this_element.x + hover_this_element.width)){
                console.log("colisão detectada no eixo X")
            }
        
    
        });
    }
    hover_on_element(start_button_hover);


})

window.addEventListener('resize', () => {location.reload();})