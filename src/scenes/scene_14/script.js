import { CheckMouseCollision } from "../../../lib/Dynamics/Dynamics.js"
import {Image} from "../../../lib/Image/Image.js"

/**THESE VARIABLES EXISTS TO EXECUTE THE HOVERING ANIMATION */

/**add all variables (elements) that will be hovered here */
let continue_button_hover = {x: 0, y: 0, width: 0, height: 0, isMouseColliding: false}
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

let GameData = {}
let doubtButton = document.getElementById("doubt_button")
let continueButton = document.getElementById("continue_button")
let showDoubtModal = false;

let showWrongAnswerModal = false;
let showRightAnswerModal = false;
let modalBackButton = document.getElementById("back_button");
let modalText = document.getElementById("modal_message");
let playerPoints = 0;
let magicianPoints = 0;

let word1Discovered = false;
let word2Discovered = false;
let word3Discovered = false;

let canDoubtButtonHover = () => {
    return showWrongAnswerModal === false && showRightAnswerModal === false && showDoubtModal === false; 
}

let canWordPanelBeClicked = () => {
    return showRightAnswerModal === false && showWrongAnswerModal === false && showDoubtModal === false;
}




/**ALL CLASSES THAT WILL RUN IN THIS GAME */
class Player {
    constructor(game){
        const setAttributes = () => {
            this.game = game;
            this.points = 0;
        }
        setAttributes();
    }
}
class DoubtButton extends Image {
    constructor(game, width, height, x, y, speed, image){

        super(game, width, height, x, y, speed, image);

        this.showModal = false;

        this.modalBackground = document.getElementById("black_background");
        this.modalBackButton = document.getElementById("back_button");
        this.modalText = document.getElementById("modal_message");


    }

    BeginPlay(context){
        super.BeginPlay(context); 

        if(showDoubtModal){
            context.drawImage(this.modalBackground, 0, 0, window.innerWidth, window.innerHeight);
        }

    }

    renderModal(){
        showDoubtModal = true;
    }
    

    tick(){

        const begginingAnimation = (origin) => {
            if(origin === "fromBottom"){
                if(this.y < window.innerHeight * 0.012){
                    this.y += this.speed;
                }

            }

        }
        begginingAnimation("fromBottom");

        this.HoverTransformScale(GameData, [canDoubtButtonHover()])

        this.OnClick(this.renderModal, GameData, [canDoubtButtonHover()]);

    }
}
class BackButton extends Image {
    constructor(game, width, height, x, y, speed, image){
        super(game, width, height, x, y, speed, image);
    }

    renderModal(){
        showDoubtModal = false;
        document.body.style.cursor = "pointer";
    }

    Tick(){
        this.HoverTransformScale(GameData);
        this.OnClick(this.renderModal, GameData)
    }
}
class ContinueButton extends Image {
    constructor(game, width, height, x, y, speed, image){
        super(game, width, height, x, y, speed, image);
    }


    Tick(){
        this.HoverTransformScale(GameData);
        this.OnClick(this.GoToLink(GameData, "../scene_15"), GameData)
    }
}
class BackButtonModal extends Image {
    constructor(game, width, height, x, y, speed, image){
        super(game, width, height, x, y, speed, image);
    }

    renderModal(){
        showWrongAnswerModal = false;
        showRightAnswerModal = false;
        showDoubtModal = false;
        document.body.style.cursor = "pointer";
    }

    Tick(){
        this.HoverTransformScale(GameData);
        this.OnClick(this.renderModal, GameData)
    }
}
class TextModal extends Image {
    constructor(game, width, height, x, y, speed, image){
        super(game, width, height, x, y, speed, image);
    }


    Tick(){
        this.HoverTransformScale(GameData);
    }
}
class ResolutionMessage {
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
class TimePanel {
    constructor(game){
        const setAttributes = () => {
            this.game = game;
            this.image = document.getElementById("time_panel")
    
            this.height = window.innerHeight * 0.1;
            this.width = window.innerWidth * 0.13;
    
            this.x = window.innerWidth * 0.08
            this.y = -50 ;
            this.speed = 10;

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
class MagicianPanel {
    constructor(game){

        const setAttributes = () => {
            this.game = game;
            this.image = document.getElementById("magician_panel")
    
            this.height = window.innerHeight * 0.25;
            this.width = window.innerWidth * 0.12;
    
            this.x = (window.innerWidth - this.width * 2.5) 
            this.y = 0 ;
            this.speed = 10;
    
            this.points = 0;
    
            this.opacity = 0;
        }
        setAttributes();


    }

    draw(context){

        const renderImage = () => {
            context.globalAlpha = this.opacity;
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.globalAlpha = 1;
        }
        renderImage();
        

        const renderTextTitle = () => {
            context.font = '2.5vw bigDots'; 
            context.fillStyle = '#00FFFF'; 
            let text = 'MÁGICO'; 
        
            context.fillText(text, this.x + (this.x * 0.017) , this.y + (this.height * 0.3));
        }
        renderTextTitle()


        const renderTextPoints = () => {
            context.font = '5.2vw bigDots'; 
            context.fillStyle = 'white'; 
            let textPoints = `${magicianPoints > 0 ? magicianPoints : "000"}`; 
        
            context.fillText(textPoints, this.x + (this.x * 0.017) , this.y + (this.height * 0.89));
        }
        renderTextPoints();
    }

    tick(){

        const begginingAnimation = (origin) => {
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

        const setAttributes = () => {
            this.game = game;
            this.image = document.getElementById("you_panel")
    
            this.height = window.innerHeight * 0.25;
            this.width = window.innerWidth * 0.12;
    
            this.x = (window.innerWidth - this.width * 1.25) 
            this.y = 0 ;
            this.speed = 10;
    
            this.opacity = 0;
        }
        setAttributes();

    }

    draw(context){


        const renderImage = () => {
            context.globalAlpha = this.opacity;
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.globalAlpha = 1;
        }
        renderImage();


        const renderTextTitle = () => {
            context.font = '3.3vw bigDots'; 
            context.fillStyle = '#00FFFF'; 
            let text = 'VOCÊ'; 
            context.fillText(text, this.x + (this.x * 0.017) , this.y + (this.height * 0.335));
        }
        renderTextTitle();
    

        const renderPoints = () => {
            context.font = '5.2vw bigDots'; 
            context.fillStyle = 'white'; 
            let textPoints = `${playerPoints > 0 ? playerPoints : "000"}`; 
        
            context.fillText(textPoints, this.x + (this.x * 0.014) , this.y + (this.height * 0.89));
        }
        renderPoints();


    }

    tick(){

        const begginingAnimation = (origin) => {
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
                    this.opacity += 0.009;
                }
            }
        }
        begginingAnimation("AppearGradient");

    }
}
class WordPanel {

    constructor(game, number){

        const setAttributes = () => {
            this.game = game;
            this.image = document.getElementById("word_panel")
            this.imageError = document.getElementById("image_error")
            this.imageRight = document.getElementById("image_right")
            this.modalBackground = document.getElementById("black_background");
            this.modalBackButton = document.getElementById("back_button");
            this.magicianPanel = document.getElementById("magician_panel");
            this.youPanel = document.getElementById("you_panel");

    
            this.height = window.innerHeight * 0.13
            this.width = this.height * 3.5
            this.initialWidth = this.height * 3.5

            this.textX = window.innerWidth * 0.5;
            this.textY = window.innerHeight * 0.5;

            this.discovered = false;
    
            //this.x and this.y and opacity is defined by these conditionals
            if(number === 1) { 
                this.x = window.innerWidth * 0.02
                this.y = window.innerHeight - (this.height * 1.2)
                this.opacity = 0;
            } else if (number === 2){
                this.x = (window.innerWidth * 0.5) - (this.width * 0.5) 
                this.y = window.innerHeight - (this.height * 1.2)
                this.opacity = 0;
            } else if (number === 3){
                this.x = window.innerWidth - (this.width * 1.14)
                this.y = window.innerHeight - (this.height * 1.2)
                this.opacity = 0;
            }
    
            this.speed = 10;
            
            if(number === 1) { this.number = 1 }
            if(number === 2) { this.number = 2 }
            if(number === 3) { this.number = 3 }
        }
        setAttributes();

    }

    draw(context, number){

        
        const renderImage = () => {
            context.globalAlpha = this.opacity;
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.globalAlpha = 1;
        }
        renderImage();

        const renderTextTimer = (text, color, width, X) => {

            if(text === "Arquipélago"){
                context.font = `${width * 0.138}px eurostyle`;
            } else if (text === "Elefante") {
                context.font = `${width * 0.145}px eurostyle`; 
            } else if (text === "Constelação") {
                context.font = `${width * 0.135}px eurostyle`; 
            }

            context.fillStyle = color; 
            context.globalAlpha = this.opacity;
            let thisText = text; 
            context.fillText(thisText, X, this.textY);  
        }

        if(number === 1){
            renderTextTimer('Constelação', "#FF0000", this.width, this.textX * 1.5);
        } else if(number === 2){
            renderTextTimer('Elefante', "#0066FF", this.width, this.textX * 1.01);
        } else if(number === 3){
            renderTextTimer('Arquipélago', "#009966", this.width, this.textX * 1);
        }
 
    }

    HoverTransformScale(GameData, params){

        let paramsLength = params?.length;
        let trueParams = 0;

        params.map((param)=>{if(param === true){trueParams+=1;}})
 

        if(paramsLength === trueParams){
            let bIsMouseColliding = CheckMouseCollision(this, GameData);
            if (bIsMouseColliding && this.width <= this.initialWidth * 1.02) {
                this.width += 1;
                this.height += 1;
                document.body.style.cursor = "pointer"
            } else if (!bIsMouseColliding && this.width >= this.initialWidth){
                this.width -= 1;
                this.height -= 1;
                document.body.style.cursor = "auto"
            }
        }
        


    }

    OnClick(callback, GameData, number, context, params){

        let paramsLength = params?.length;
        let trueParams = 0;

        params?.map((param)=>{if(param === true){trueParams+=1;}})
 

        if(params){
            if(paramsLength === trueParams){
                let bIsMouseColliding = CheckMouseCollision(this, GameData);
                if(bIsMouseColliding && GameData.Clicked){
                    callback(number, context);
                }
            }
        } else {
            let bIsMouseColliding = CheckMouseCollision(this, GameData);
            if(bIsMouseColliding && GameData.Clicked){
                callback(number, context);
            }
        }




    }

    RenderModalWrong(context){

        context.drawImage(this.modalBackground, 0, 0, window.innerWidth, window.innerHeight);
        context.drawImage(this.imageError, (window.innerWidth * 0.5) - (window.innerWidth * 0.18), (window.innerHeight * 0.1), (window.innerWidth * 0.5), (window.innerWidth * 0.5) * 0.3 );

        const drawMagicianPanel = () => {

            const renderImage = () => {
                context.globalAlpha = this.opacity;
                context.drawImage(this.magicianPanel, (window.innerWidth * 0.25), (window.innerHeight * 0.45), (window.innerWidth * 0.2), (window.innerHeight * 0.35));
                context.globalAlpha = 1;
            }
            renderImage();
            
    
            const renderTextTitle = () => {
                context.font = '2.5vw bigDots'; 
                context.fillStyle = '#00FFFF'; 
                let text = 'MÁGICO'; 
            
                context.fillText(text, (window.innerWidth * 0.25) + ((window.innerWidth * 0.25) * 0.2) , (window.innerHeight * 0.45) + ((window.innerHeight * 0.45) * 0.25));
            }
            renderTextTitle()
        }
        drawMagicianPanel();

        const renderTextPointsMagician = () => {
            context.font = '5.2vw bigDots'; 
            context.fillStyle = 'white'; 
            let textPoints = `${magicianPoints}`; 
        
            context.fillText(textPoints,(window.innerWidth * 0.25) + ((window.innerWidth * 0.25) * 0.25) , (window.innerHeight * 0.65) + ((window.innerHeight * 0.45) * 0.25));
        }
        renderTextPointsMagician();





        const drawYouPanel = () => {

            const renderImage = () => {
                context.globalAlpha = this.opacity;
                context.drawImage(this.magicianPanel, (window.innerWidth * 0.55), (window.innerHeight * 0.45), (window.innerWidth * 0.2), (window.innerHeight * 0.35));
                context.globalAlpha = 1;
            }
            renderImage();
            
    
            const renderTextTitle = () => {
                context.font = '2.5vw bigDots'; 
                context.fillStyle = '#00FFFF'; 
                let text = 'VOCÊ'; 
            
                context.fillText(text, (window.innerWidth * 0.25) + ((window.innerWidth * 0.5) * 0.75) , (window.innerHeight * 0.45) + ((window.innerHeight * 0.45) * 0.25));
            }
            renderTextTitle()
        }
        drawYouPanel();

        const renderTextPointsYou = () => {
            context.font = '5.2vw bigDots'; 
            context.fillStyle = 'white'; 
            let textPoints = `${playerPoints > 0 ? playerPoints : "000"}`; 
        
            context.fillText(textPoints,(window.innerWidth * 0.25) + ((window.innerWidth * 0.5) * 0.75) , (window.innerHeight * 0.65) + ((window.innerHeight * 0.45) * 0.25));
        }
        renderTextPointsYou();

    }

    RenderModalRight(context){

        context.drawImage(this.modalBackground, 0, 0, window.innerWidth, window.innerHeight);
        context.drawImage(this.imageRight, (window.innerWidth * 0.5) - this.width, (window.innerHeight * 0.1), (window.innerWidth * 0.5), (window.innerWidth * 0.5) * 0.3 );

        const drawMagicianPanel = () => {

            const renderImage = () => {
                context.globalAlpha = this.opacity;
                context.drawImage(this.magicianPanel, (window.innerWidth * 0.25), (window.innerHeight * 0.45), (window.innerWidth * 0.2), (window.innerHeight * 0.35));
                context.globalAlpha = 1;
            }
            renderImage();
            
    
            const renderTextTitle = () => {
                context.font = '2.5vw bigDots'; 
                context.fillStyle = '#00FFFF'; 
                let text = 'MÁGICO'; 
            
                context.fillText(text, (window.innerWidth * 0.25) + ((window.innerWidth * 0.25) * 0.2) , (window.innerHeight * 0.45) + ((window.innerHeight * 0.45) * 0.25));
            }
            renderTextTitle()
        }
        drawMagicianPanel();

        const renderTextPointsMagician = () => {
            context.font = '5.2vw bigDots'; 
            context.fillStyle = 'white'; 
            let textPoints = `${magicianPoints}`; 
        
            context.fillText(textPoints,(window.innerWidth * 0.25) + ((window.innerWidth * 0.25) * 0.25) , (window.innerHeight * 0.65) + ((window.innerHeight * 0.45) * 0.25));
        }
        renderTextPointsMagician();


        const drawYouPanel = () => {

            const renderImage = () => {
                context.globalAlpha = this.opacity;
                context.drawImage(this.magicianPanel, (window.innerWidth * 0.55), (window.innerHeight * 0.45), (window.innerWidth * 0.2), (window.innerHeight * 0.35));
                context.globalAlpha = 1;
            }
            renderImage();
            
    
            const renderTextTitle = () => {
                context.font = '2.5vw bigDots'; 
                context.fillStyle = '#00FFFF'; 
                let text = 'VOCÊ'; 
            
                context.fillText(text, (window.innerWidth * 0.25) + ((window.innerWidth * 0.5) * 0.75) , (window.innerHeight * 0.45) + ((window.innerHeight * 0.45) * 0.25));
            }
            renderTextTitle()
        }
        drawYouPanel();

        const renderTextPointsYou = () => {
            context.font = '5.2vw bigDots'; 
            context.fillStyle = 'white'; 
            let textPoints = `${playerPoints > 0 ? playerPoints : "000"}`; 
        
            context.fillText(textPoints,(window.innerWidth * 0.25) + ((window.innerWidth * 0.5) * 0.75) , (window.innerHeight * 0.65) + ((window.innerHeight * 0.45) * 0.25));
        }
        renderTextPointsYou();

    }

    RenderModalAnswer(number, context){

        if(number === 1){
            if(!word1Discovered){ word1Discovered = true;}
            if(word1Discovered && !word2Discovered){
                playerPoints = 5;
            } else if (word1Discovered && word2Discovered){
                playerPoints = 10;
            }
            showWrongAnswerModal = false;
            showRightAnswerModal = true;
            showDoubtModal = false;


        } else if (number === 3){

            if(!word2Discovered){
                word2Discovered = true;
            }

            if(word2Discovered && !word1Discovered){
                playerPoints = 5;

            } else if (word2Discovered && word1Discovered){
                playerPoints = 10;
            }

            showWrongAnswerModal = false;
            showRightAnswerModal = true;
            showDoubtModal = false;


        } else if (number === 2) {


            if(!word3Discovered){
                word3Discovered = true;
            }

            if(word3Discovered){
                magicianPoints = 5;

            }

            showWrongAnswerModal = true;
            showRightAnswerModal = false;
            showDoubtModal = false;

        }
        





    }

    tick(context){


        const begginingAnimation = (origin) => {
            if(origin === "AppearGradient"){
                if(this.opacity < 1){
                    this.opacity += 0.009;
                }
            }
        }
        begginingAnimation("AppearGradient");


        const appearFromHat = () => {

            if(this.number !== 3){
                if (this.textX > (this.x + this.width * 0.05)){
                    this.textX -= 18;
                }
            } else {
                if (this.textX < (this.x + this.width * 0.05)){
                    this.textX += 12;
                }
            }

            

            if (this.textY < (window.innerHeight - this.width * 0.15)){
                this.textY += 8;
            }
        }
        appearFromHat();

        this.HoverTransformScale(GameData, [canDoubtButtonHover()])

        this.OnClick(this.RenderModalAnswer, GameData, this.number, context, [canWordPanelBeClicked()]);

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
        this.doubt_button = new DoubtButton(this, window.innerWidth * 0.06, (window.innerWidth * 0.1) * 0.5, window.innerWidth * 0.01, window.innerHeight * 0.01, 10, doubtButton )
        this.YouPanel = new YouPanel(this)
        this.TimePanel = new TimePanel(this)
        this.MagicianPanel = new MagicianPanel(this)
        this.Cartola = new Cartola(this)
        this.ResolutionMessage = new ResolutionMessage(this)

        this.Word1 = new WordPanel(this, 1)
        this.Word2 = new WordPanel(this, 2)
        this.Word3 = new WordPanel(this, 3)

        this.BackButton = new BackButton(this, window.innerWidth * 0.15, (window.innerWidth * 0.1) * 0.5, window.innerWidth * 0.01, window.innerHeight * 0.30, 10, modalBackButton )

        this.ContinueButton = new ContinueButton(this, window.innerWidth * 0.2, (window.innerWidth * 0.1) * 0.5, window.innerWidth * 0.78, window.innerHeight * 0.70, 10, continueButton )
        
        this.BackButtonModal = new BackButtonModal(this, window.innerWidth * 0.15, (window.innerWidth * 0.1) * 0.5, window.innerWidth * 0.01, window.innerHeight * 0.70, 10, modalBackButton )
        this.TextModal = new TextModal(this, window.innerWidth * 0.5, (window.innerWidth * 0.1) * 0.5, window.innerWidth * 0.01, window.innerHeight * 0.15, 10, modalText )
    }
    /**THIS METHOD WILL RENDER THE GAME */
    render(context){



        this.TimePanel.draw(context);
        this.TimePanel.tick();

        this.MagicianPanel.draw(context);
        this.MagicianPanel.tick();


        this.YouPanel.draw(context);
        this.YouPanel.tick();

        this.Cartola.draw(context);
        this.Cartola.tick();

        this.Word1.draw(context, 1)
        this.Word1.tick(context)

        this.Word2.draw(context, 2)
        this.Word2.tick(context)

        this.Word3.draw(context, 3)
        this.Word3.tick(context)

        this.doubt_button.BeginPlay(context);
        this.doubt_button.tick();

        if(showDoubtModal){
            this.BackButton.BeginPlay(context);
            this.BackButton.Tick();

            this.TextModal.BeginPlay(context);
            this.TextModal.Tick();

        }

        if(showWrongAnswerModal){
            this.Word1.RenderModalWrong(context);
            this.BackButtonModal.BeginPlay(context);
            this.BackButtonModal.Tick();
        }

        if(showRightAnswerModal){
            this.Word1.RenderModalRight(context);

            if(playerPoints >= 10){
                this.ContinueButton.BeginPlay(context);
                this.ContinueButton.Tick();
            } else {
                this.BackButtonModal.BeginPlay(context);
                this.BackButtonModal.Tick();
            }

        }


        

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

        GameData.Context = ctx;


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

        /**GETS MOUSE X AND Y POSITION*/
        canvas.addEventListener('mousemove', function(event) {
            let rect = canvas.getBoundingClientRect();
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;
            GameData.MouseX = x;
            GameData.MouseY = y;       

        });
            /**GETS IF MOUSE IS CLICKED */
            canvas.addEventListener('click', function(event) {
                let rect = canvas.getBoundingClientRect();
                let x = event.clientX - rect.left;
                let y = event.clientY - rect.top;
            GameData.Clicked = true;
            setTimeout(() => {
                GameData.Clicked = false;
            }, 75);  

             


        });
    
        /**CALL THIS FUNCTION WILL ACTIVATE THE HOVERING EFFECT ON THE ELEMENT PASSED AS PARAMETER */
        hover_on_element(continue_button_hover, canvas, "../scene_15/");
    
    
    })
}
BeginPlay();


