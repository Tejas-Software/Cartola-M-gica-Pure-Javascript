//ELEMENTS THAT WILL REACT TO MOUSE COLLISION 
let start_button_hover = {x: 0, y: 0, width: 0, height: 0, isColliding: false}


//ALL CLASSES THAT WILL BE RENDERED IN THE GAME
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
        context.globalAlpha = 0.5; // Define a transparência para 50%
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.globalAlpha = 1.0; // Restaura a opacidade para o padrão
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
        this.initialWidth = this.width;
        this.x = (window.innerWidth / 1.18);
        this.y = (window.innerHeight * 1.25) ;
        this.speed = 1.5;
        this.image = document.getElementById("button_start")
    }
    
    draw(context){

        context.drawImage(this.image, this.x, this.y, this.width, this.height);

    }

    tick(){

        const begginingAnimation = (origin) => {

            if(origin === "fromBottom"){
                if(this.y >= (window.innerHeight * 0.95) - this.height){
                    this.y -= this.speed;
                }
                if(this.x >= (window.innerWidth * 0.95) - this.width){
                    this.x -= this.speed;
                }
            }

        }
        begginingAnimation("fromBottom");

        const hoverTransform = () => {
            if (start_button_hover.isColliding){

                if(this.width <= this.initialWidth * 1.1) {
                    this.width += 2;
                    this.height = this.width * 0.4
                    document.body.style.cursor = "pointer"
                }

            } else {
                if(this.width >= this.initialWidth) {
                    this.width -= 2;
                    this.height = this.width * 0.4
                    this.y += 1;
                    this.x += 1;
                    document.body.style.cursor = "auto"
                }
            }
        }
        hoverTransform();

        start_button_hover.x = this.x
        start_button_hover.y = this.y
        start_button_hover.width = this.width
        start_button_hover.height = this.height
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


// MAIN GAME CLASS THAT DEAL WITH ALL CLASSES
class Game {
    constructor(canvas){
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.brand_logo = new BrandLogo(this)
        this.ButtonStart = new ButtonStart(this)
        this.ImageCartas = new ImageCartas(this)
        this.ResolutionMessage = new ResolutionMessage(this)
    }
    render(context){

        this.ButtonStart.draw(context)
        this.ButtonStart.tick();

        this.ImageCartas.draw(context)
        this.ImageCartas.tick()

        this.brand_logo.draw(context)
        this.brand_logo.tick();


    }
    renderResolutionMessage(context){
        this.brand_logo.draw(context)
        this.brand_logo.tick();
        this.ResolutionMessage.draw(context)
    }
}

//RUN THE GAME WHEN EVERYTHING LOADS UP
window.addEventListener('load', ()=>{

    window.addEventListener('resize', () => {location.reload();})

    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth - 10;
    canvas.height = window.innerHeight - 10;

    const game = new Game(canvas);

    const animate = () => {
        if(canvas.width > 650 && canvas.height > 350) {
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

    const checkMouseCollision = (a, b) => {
        if(a.x >= b.x && a.x <= (b.x + b.width) 
        && a.y >= b.y && a.y <= (b.y + b.height)){
            start_button_hover.isColliding = true;
        } else {
            start_button_hover.isColliding = false;
        }
        console.log(a.isColliding)
    }

    const hover_on_element = (hover_this_element) => {

        canvas.addEventListener('click', function(e) {
            e.preventDefault();
    

            if (start_button_hover.isColliding) {
                window.location.href = './src/scenes/scene_1';
            }

        });
        

        canvas.addEventListener('mousemove', function(event) {

            let rect = canvas.getBoundingClientRect();
            let mouseX = event.clientX - rect.left;
            let mouseY = event.clientY - rect.top;

            let mouseToCollide = {x: mouseX, y: mouseY }

            checkMouseCollision(mouseToCollide, hover_this_element);
          
        });
    }
    hover_on_element(start_button_hover);


})

