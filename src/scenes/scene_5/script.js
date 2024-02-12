/**THESE VARIABLES EXISTS TO EXECUTE THE HOVERING ANIMATION */

/**add all variables (elements) that will be hovered here */
let continue_button_hover = {x: 0, y: 0, width: 0, height: 0, isMouseColliding: false}
let doubt_button_hover = {x: 0, y: 0, width: 0, height: 0, isMouseColliding: false}
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

        if(e.width <= e.initialWidth * 1.04) {
            e.width += 1;
            e.height += 1;
            document.body.style.cursor = "pointer"
        }

    } else {

        if(e.width > e.initialWidth ) {
            e.width -= 1;
            e.height -= 1;
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
class DoubtButton {
    constructor(game){
        this.game = game;
        this.image = document.getElementById("doubt_button")

        this.height = window.innerHeight * 0.1
        this.width = this.height * 1
        
        this.initialWidth = this.width; /**INITIAL WIDTH IS USED TO HOVER ANIMATIONS */

        this.x = window.innerWidth * 0.012
        this.y = window.innerHeight * -0.1
        this.speed = 1.4;

    }

    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    

    tick(){

        /**THIS ANIMATION RUNS IN THE BEGINNING OF THE GAME */
        const begginingAnimation = (origin) => {
            if(origin === "fromBottom"){
                if(this.y < window.innerHeight * 0.012){
                    this.y += this.speed;
                }

            }

        }
       begginingAnimation("fromBottom");

       hoverTransform(doubt_button_hover, this);


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
class TimePanel {
    constructor(game){
        this.game = game;
        this.image = document.getElementById("time_panel")

        this.height = window.innerHeight * 0.1;
        this.width = window.innerWidth * 0.13;

        this.x = window.innerWidth * 0.08
        this.y = -50 ;
        this.speed = 1.4;

        this.opacity = 0;

    }

    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    tick(){

        /**THIS ANIMATION RUNS IN THE BEGINNING OF THE GAME */
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
class MagicianPanel {
    constructor(game){
        this.game = game;
        this.image = document.getElementById("magician_panel")

        this.height = window.innerHeight * 0.25;
        this.width = window.innerWidth * 0.12;

        this.x = (window.innerWidth - this.width * 2.5) 
        this.y = 0 ;
        this.speed = 4.5;

        this.opacity = 0;

    }

    draw(context){
        context.globalAlpha = this.opacity;
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.globalAlpha = 1;
    }

    tick(){

        const begginingAnimation = (origin) => {
            console.log(this.y)
            if(origin === "AppearGradient"){
                if(this.opacity < 1){
                    this.opacity += 0.009;
                }
            }
        }
        begginingAnimation("AppearGradient");

    }
}
class YouPanel {
    constructor(game){
        this.game = game;
        this.image = document.getElementById("you_panel")

        this.height = window.innerHeight * 0.25;
        this.width = window.innerWidth * 0.12;

        this.x = (window.innerWidth - this.width * 1.25) 
        this.y = 0 ;
        this.speed = 4.5;

        this.opacity = 0;

    }

    draw(context){
        context.globalAlpha = this.opacity;
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.globalAlpha = 1;
    }

    tick(){

        const begginingAnimation = (origin) => {
            console.log(this.y)
            if(origin === "AppearGradient"){
                if(this.opacity < 1){
                    this.opacity += 0.009;
                }
            }
        }
        begginingAnimation("AppearGradient");

    }
}
class Cartola {
    constructor(game){
        this.game = game;
        this.image = document.getElementById("cartola")

        this.height = window.innerHeight * 0.9;
        this.width = this.height * 1;

        this.x = (window.innerWidth * 0.5) - (this.width * 0.5) 
        this.y = window.innerHeight - (this.height * 1.25) ;
        this.speed = 4.5;

        this.opacity = 0;

    }

    draw(context){
        context.globalAlpha = this.opacity;
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.globalAlpha = 1;
    }

    tick(){

        const begginingAnimation = (origin) => {
            console.log(this.y)
            if(origin === "AppearGradient"){
                if(this.opacity < 1){
                    this.opacity += 0.009;
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
        this.doubt_button = new DoubtButton(this)
        this.YouPanel = new YouPanel(this)
        this.TimePanel = new TimePanel(this)
        this.MagicianPanel = new MagicianPanel(this)
        this.Cartola = new Cartola(this)
        this.ResolutionMessage = new ResolutionMessage(this)
    }
    /**THIS METHOD WILL RENDER THE GAME */
    render(context){



        this.TimePanel.draw(context);
        this.TimePanel.tick();

        this.MagicianPanel.draw(context);
        this.MagicianPanel.tick();

        this.doubt_button.draw(context);
        this.doubt_button.tick();

        this.YouPanel.draw(context);
        this.YouPanel.tick();

        this.Cartola.draw(context);
        this.Cartola.tick();

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
        hover_on_element(continue_button_hover, canvas, "../scene_5/");
        hover_on_element(doubt_button_hover, canvas, "../scene_3")
    
    
    })
}
BeginPlay();

