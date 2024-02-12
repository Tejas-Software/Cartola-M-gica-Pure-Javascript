/**THESE VARIABLES EXISTS TO EXECUTE THE HOVERING ANIMATION */

/**add all variables (elements) that will be hovered here */
let start_button_hover = {x: 0, y: 0, width: 0, height: 0, isMouseColliding: false}
/** */

const checkMouseCollision = (a, b) => {

    /**IF X AXIS IS INSIDE THE AREA OF THE OTHER ACTOR X AXIS */
    /**IF Y AXIS IS INSIDE THE AREA OF THE OTHER ACTOR Y AXIS */
    if(a.x >= b.x && a.x <= (b.x + b.width) 
    && a.y >= b.y && a.y <= (b.y + b.height)){
        b.isMouseColliding = true;
    } else {
        b.isMouseColliding = false;
    }
}
const hoverTransform = (element, e) => {

    //UPDATES ITS VARIABLE POSITION TO DEAL WITH RENDERING NEW FRAMES
    element.x = e.x
    element.y = e.y
    element.width = e.width
    element.height = e.height

    if (element.isMouseColliding){

        if(e.width <= e.initialWidth * 1.1) {
            e.width += 2;
            e.height = e.width * 0.4
            document.body.style.cursor = "pointer"
        }

    } else {
        if(e.width >= e.initialWidth) {
            e.width -= 2;
            e.height = e.width * 0.4
            e.y += 1;
            e.x += 1;
            document.body.style.cursor = "auto"
        }
    }
}
const hover_on_element = (hover_this_element, canvas) => {
    
    canvas.addEventListener('click', function(e) {
        e.preventDefault();


        if (hover_this_element.isMouseColliding) {
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
/********************************************************** */




/**ALL CLASSES THAT WILL RUN IN THIS GAME */
class Player {
    constructor(game){
        this.game = game;
        this.points = 0;
    }
}
class BrandLogo {
    constructor(game){
        this.game = game;
        this.image = document.getElementById("brand_logo")

        this.width = window.innerWidth * 0.25;
        this.height = this.width * 0.20;
        this.x = (window.innerWidth / 100);
        this.y = window.innerWidth /  window.innerWidth * window.innerHeight ;
        this.speed = 1.5;

    }

    draw(context){
        context.globalAlpha = 0.5; // defines 50% transparency
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.globalAlpha = 1.0; // defines 0% transparency
    }
    

    tick(){

        /**THIS ANIMATION RUNS IN THE BEGINNING OF THE GAME */
        const begginingAnimation = (origin) => {
            if(origin === "fromBottom") {
                if(this.y >= (window.innerHeight - (this.height * 1.5))){
                    this.y -= this.speed;
                }
            }

        }
        begginingAnimation("fromBottom");


    }
}
class ButtonStart {
    constructor(game){
        this.game = game;
        this.image = document.getElementById("button_start")

        this.width = (window.innerWidth * 0.10);
        this.height = this.width * 0.4
        this.initialWidth = this.width; /**INITIAL WIDTH IS USED TO HOVER ANIMATIONS */
        this.x = (window.innerWidth / 1.18);
        this.y = (window.innerHeight * 1.25) ;
        this.speed = 1.5;

    }
    
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    tick(){

        /**THIS ANIMATION RUNS IN THE BEGINNING OF THE GAME */
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


        /**HOVER ANIMATION WHEN MOUSE OVER */
        hoverTransform(start_button_hover, this);


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
        // CENTER THE TEXT
        const text = "Vire o dispositivo | Ajuste a resolução";
        const textX = window.innerWidth * 0.06;
        const textY = window.innerHeight * 0.35;

        // DRAW TEXT
        context.fillStyle = "black"; 
        context.font = "5vw Arial"; 
        context.fillText(text, textX, textY);
    }

}
class ImageCartola {
    constructor(game){
        this.game = game;
        this.image = document.getElementById("image_cartola")

        this.width = window.innerWidth * 0.5;
        this.height = this.width * 0.50;
        this.x = (window.innerWidth * 0.20)
        this.y = (window.innerHeight * -0.5) ;
        this.speed = 4.5;

    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    tick(){

        const begginingAnimation = (origin) => {
            if (origin === "fromBottom") {
                if(this.y <= (window.innerHeight - (window.innerHeight * 0.98))){
                    this.y += this.speed;
                }
            }
        }
        begginingAnimation("fromBottom");

    }
}
class ImageCartas {
    constructor(game){
        this.game = game;
        this.image = document.getElementById("image_cartas")

        this.width = window.innerWidth * 0.6;
        this.height = this.width * 0.50;
        this.x = (window.innerWidth * 0.20)
        this.y = (window.innerHeight * 1.5) ;
        this.speed = 4.5;

    }

    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    tick(){

        const begginingAnimation = (origin) => {
            if(origin === "fromBottom"){
                if(this.y >= (window.innerHeight * 0.98) - this.height){
                    this.y -= this.speed;
                }
            }
        }
        begginingAnimation("fromBottom");

    }
}
/**************************************** */




// MAIN GAME CLASS THAT DEAL WITH ALL CLASSES
class Game {
    constructor(canvas){
        /**GAME CLASS WILL STORE THE CANVAS DATA */
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        /**GAME CLASS WILL EXECUTE AND OWN ALL THESE CLASSES */
        this.brand_logo = new BrandLogo(this)
        this.ButtonStart = new ButtonStart(this)
        this.ImageCartola = new ImageCartola(this)
        this.ImageCartas = new ImageCartas(this)
        this.ResolutionMessage = new ResolutionMessage(this)
    }
    /**THIS METHOD WILL RENDER THE GAME */
    render(context){

        this.ButtonStart.draw(context);
        this.ButtonStart.tick();

        this.ImageCartas.draw(context);
        this.ImageCartas.tick();

        this.ImageCartola.draw(context);
        this.ImageCartola.tick(context);

        this.brand_logo.draw(context);
        this.brand_logo.tick();

    }
    /**THIS METHOD WILL RENDER AN WARNING TO UPDATE THE RESOLUTION IF DOESN'T FIT THE REQUIRED MIN RESOLUTION */
    renderResolutionMessage(context){
        this.brand_logo.draw(context);
        this.brand_logo.tick();
        this.ResolutionMessage.draw(context);
    }
}
/***************************************** */




//THIS FUNCTIONS RUNS WHEN APPLICATION STARTS
/******************************************** */
const BeginPlay = () => {

    /**THIS FUNCTION RUN AFTER EVERYTHING IS LOADED */
    window.addEventListener('load', ()=>{



        /**THIS FUNCTION RELOADS THE PAGE WHEN RESIZING THE SCREEN */
        window.addEventListener('resize', () => {location.reload();})



        /**VARIABLE CANVAS IS DEFINED AND GET THE CANVAS ELEMENT FIXED INSIDE THE HTML */
        const canvas = document.getElementById('canvas1');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth - 10;
        canvas.height = window.innerHeight - 10;
    


        /**CALL THE GAME CLASS AND ANIMATE IT*/
        const game = new Game(canvas);
        const animate = () => {
            /**ONLY RENDER THE GAME IF RESOLUTION FITS THESE REQUIREMENTS */
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
    
        /**CALL THIS FUNCTION WILL ACTIVATE THE HOVERING EFFECT ON THE ELEMENT PASSED AS PARAMETER */
        hover_on_element(start_button_hover, canvas);
    
    
    })
}
BeginPlay();


