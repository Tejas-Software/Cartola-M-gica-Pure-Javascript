/**THESE VARIABLES EXISTS TO EXECUTE THE HOVERING ANIMATION */

/**add all variables (elements) that will be hovered here */
let continue_button_hover = {x: 0, y: 0, width: 0, height: 0, isMouseColliding: false}
let back_button_hover = {x: 0, y: 0, width: 0, height: 0, isMouseColliding: false}
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

        if(e.width <= e.initialWidth * 1.02) {
            e.width += 1;
            e.height = e.width * 0.2
            document.body.style.cursor = "pointer"
        }

    } else {
        if(e.width >= e.initialWidth) {
            e.width -= 2;
            e.height = e.width * 0.2
            
            document.body.style.cursor = "auto"
        }
    }
}
const hover_on_element = (hover_this_element, canvas, link) => {
    
    canvas.addEventListener('click', function(e) {
        e.preventDefault();


        if (hover_this_element.isMouseColliding) {
            window.location.href = link;
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
class ButtonBack {
    constructor(game){
        this.game = game;
        this.image = document.getElementById("button_back")

        this.height = window.innerHeight * 0.7
        this.width = this.height * 0.5
        
        this.initialWidth = this.width; /**INITIAL WIDTH IS USED TO HOVER ANIMATIONS */

        this.x = (window.innerWidth / 100);
        this.y = window.innerHeight - this.height * 0.01 ;
        this.speed = 10;

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

            }

        }
       begginingAnimation("fromBottom");

       hoverTransform(back_button_hover, this);


    }
}
class ButtonContinue {
    constructor(game){
        this.game = game;
        this.image = document.getElementById("button_continue")

        this.height = window.innerHeight * 0.21
        this.width = this.height * 2

        this.initialWidth = this.width; /**INITIAL WIDTH IS USED TO HOVER ANIMATIONS */
        this.x = (window.innerWidth - this.width * 1.10);
        this.y = window.innerHeight - this.height * 0.01 ;
        this.speed = 10;

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

            }


        }
        begginingAnimation("fromBottom");


        /**HOVER ANIMATION WHEN MOUSE OVER */
        hoverTransform(continue_button_hover, this);


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
        context.fillStyle = "white"; 
        context.font = "5vw Arial"; 
        context.fillText(text, textX, textY);
    }

}
class ImageMagician {
    constructor(game){
        this.game = game;
        this.image = document.getElementById("image_magician")

        this.height = window.innerHeight * 0.95;
        this.width = window.innerWidth * 0.6;

        this.x = 0
        this.y = window.innerHeight - this.height ;
        this.speed = 10;

        this.opacity = 0;

    }

    draw(context){
        context.globalAlpha = this.opacity;
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.globalAlpha = 1;
    }

    tick(){

        const begginingAnimation = (origin) => {
 
            if(origin === "AppearGradient"){
                if(this.opacity < 1){
                    this.opacity += 0.1;
                }
            }
        }
        begginingAnimation("AppearGradient");

    }
}
class Rabbit {
    constructor(game){
        this.game = game;
        this.image = document.getElementById("rabbit")

        this.height = window.innerHeight;
        this.width = window.innerWidth * 0.6;

        this.x = (window.innerWidth * 0.35) 
        this.y = 0 ;
        this.speed = 10;

        this.opacity = 0;

    }

    draw(context){
        context.globalAlpha = this.opacity;
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.globalAlpha = 1;
    }

    tick(){

        const begginingAnimation = (origin) => {
 
            if(origin === "AppearGradient"){
                if(this.opacity < 1){
                    this.opacity += 0.1;
                }
            }
        }
        begginingAnimation("AppearGradient");

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
        this.back_button = new ButtonBack(this)
        this.ButtonContinue = new ButtonContinue(this)
        this.ImageMagician = new ImageMagician(this)
        this.Rabbit = new Rabbit(this)
        this.ResolutionMessage = new ResolutionMessage(this)
    }
    /**THIS METHOD WILL RENDER THE GAME */
    render(context){



        this.ImageMagician.draw(context);
        this.ImageMagician.tick();

        this.Rabbit.draw(context);
        this.Rabbit.tick();

        //this.back_button.draw(context);
        //this.back_button.tick();

        this.ButtonContinue.draw(context);
        this.ButtonContinue.tick();

    }
    /**THIS METHOD WILL RENDER AN WARNING TO UPDATE THE RESOLUTION IF DOESN'T FIT THE REQUIRED MIN RESOLUTION */
    renderResolutionMessage(context){
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
            if(canvas.width > 650) {
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
        hover_on_element(continue_button_hover, canvas, "../scene_7/");
        hover_on_element(back_button_hover, canvas, "../scene_2")
    
    
    })
}
BeginPlay();


