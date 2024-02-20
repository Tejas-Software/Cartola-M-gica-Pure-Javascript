import { CheckMouseCollision } from "../../../lib/Dynamics/Dynamics.js"
import {Image} from "../../../lib/Image/Image.js"

let GameData = {
    doubtButton: document.getElementById("doubt_button"),
    continueButton: document.getElementById("continue_button"),
    modalBackButton: document.getElementById("back_button"),
    modalText: document.getElementById("modal_message"),
    showDoubtModal: false,
    showWrongAnswerModal: false,
    showRightAnswerModal: false,
    playerPoints: 0,
    magicianPoints: 0,
    word1Discovered: false,
    word2Discovered: false,
    word3Discovered: false,
    canDoubtButtonHover: () => {
        return GameData.showWrongAnswerModal === false && GameData.showRightAnswerModal === false && GameData.showDoubtModal === false; 
    },
    canWordPanelBeClicked: () => {
        return GameData.showRightAnswerModal === false && GameData.showWrongAnswerModal === false && GameData.showDoubtModal === false;
    }
};

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

        if(GameData.showDoubtModal){
            context.drawImage(this.modalBackground, 0, 0, window.innerWidth, window.innerHeight);
        }

    }

    renderModal(){
        GameData.showDoubtModal = true;
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

        this.HoverTransformScale(GameData, [GameData.canDoubtButtonHover()])

        this.OnClick(this.renderModal, GameData, [GameData.canDoubtButtonHover()]);

    }
}
class BackButton extends Image {
    constructor(game, width, height, x, y, speed, image){
        super(game, width, height, x, y, speed, image);
    }

    renderModal(){
        GameData.showDoubtModal = false;
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
        this.OnClick(this.GoToLink(GameData, "../scene_18"), GameData)
    }
}
class BackButtonModal extends Image {
    constructor(game, width, height, x, y, speed, image){
        super(game, width, height, x, y, speed, image);
    }

    renderModal(){
        GameData.showWrongAnswerModal = false;
        GameData.showRightAnswerModal = false;
        GameData.showDoubtModal = false;
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
class MagicianPanel {
    constructor(game){

        const setAttributes = () => {
            this.game = game;
            this.image = document.getElementById("magician_panel")
    
            this.height = window.innerHeight * 0.25;
            this.width = window.innerWidth * 0.12;
    
            this.x = (window.innerWidth - this.width * 2.5) 
            this.y = 0 ;
            this.speed = 4.5;
    
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
            let textPoints = `${GameData.magicianPoints > 0 ? GameData.magicianPoints : "000"}`; 
        
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
            this.speed = 4.5;
    
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
            let textPoints = `${GameData.playerPoints > 0 ? GameData.playerPoints : "000"}`; 
        
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
    
            this.speed = 4.5;
            
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

            if(text === "Trabalharam"){
                context.font = `${width * 0.138}px eurostyle`;
            } else if (text === "Marmelada") {
                context.font = `${width * 0.145}px eurostyle`; 
            } else if (text === "Desenharam") {
                context.font = `${width * 0.135}px eurostyle`; 
            }

            context.fillStyle = color; 
            context.globalAlpha = this.opacity;
            let thisText = text; 
            context.fillText(thisText, X, this.textY);  
        }

        if(number === 1){
            renderTextTimer('Desenharam', "#FF0000", this.width, this.textX * 1.5);
        } else if(number === 2){
            renderTextTimer('Marmelada', "#0066FF", this.width, this.textX * 1.01);
        } else if(number === 3){
            renderTextTimer('Trabalharam', "#009966", this.width, this.textX * 1);
        }
 
    }

    HoverTransformScale(GameData, params){

        let paramsLength = params?.length;
        let trueParams = 0;

        params.map((param)=>{if(param === true){trueParams+=1;}})

        console.log(params.length)
        console.log(trueParams)

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

        console.log(params?.length)
        console.log(trueParams)

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
            let textPoints = `${GameData.magicianPoints}`; 
        
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
            let textPoints = `${GameData.playerPoints > 0 ? GameData.playerPoints : "000"}`; 
        
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
            let textPoints = `${GameData.magicianPoints}`; 
        
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
            let textPoints = `${GameData.playerPoints > 0 ? GameData.playerPoints : "000"}`; 
        
            context.fillText(textPoints,(window.innerWidth * 0.25) + ((window.innerWidth * 0.5) * 0.75) , (window.innerHeight * 0.65) + ((window.innerHeight * 0.45) * 0.25));
        }
        renderTextPointsYou();

    }

    RenderModalAnswer(number, context){

        if(number === 1){
            if(!GameData.word1Discovered){ GameData.word1Discovered = true;}
            if(GameData.word1Discovered && !GameData.word2Discovered){
                GameData.playerPoints = 5;
            } else if (GameData.word1Discovered && GameData.word2Discovered){
                GameData.playerPoints = 10;
            }
            GameData.showWrongAnswerModal = false;
            GameData.showRightAnswerModal = true;
            GameData.showDoubtModal = false;


        } else if (number === 3){

            if(!GameData.word2Discovered){
                GameData.word2Discovered = true;
            }

            if(GameData.word2Discovered && !GameData.word1Discovered){
                GameData.playerPoints = 5;

            } else if (GameData.word2Discovered && GameData.word1Discovered){
                GameData.playerPoints = 10;
            }

            GameData.showWrongAnswerModal = false;
            GameData.showRightAnswerModal = true;
            GameData.showDoubtModal = false;


        } else if (number === 2) {


            if(!GameData.word3Discovered){
                GameData.word3Discovered = true;
            }

            if(GameData.word3Discovered){
                GameData.magicianPoints = 5;

            }

            GameData.showWrongAnswerModal = true;
            GameData.showRightAnswerModal = false;
            GameData.showDoubtModal = false;

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
                    this.textX -= 4.5;
                }
            } else {
                if (this.textX < (this.x + this.width * 0.05)){
                    this.textX += 3;
                }
            }

            

            if (this.textY < (window.innerHeight - this.width * 0.15)){
                this.textY += 2;
            }
        }
        appearFromHat();

        this.HoverTransformScale(GameData, [GameData.canDoubtButtonHover()])

        this.OnClick(this.RenderModalAnswer, GameData, this.number, context, [GameData.canWordPanelBeClicked()]);

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
        this.doubt_button = new DoubtButton(this, window.innerWidth * 0.06, (window.innerWidth * 0.1) * 0.5, window.innerWidth * 0.01, window.innerHeight * 0.01, 2, GameData.doubtButton )
        this.YouPanel = new YouPanel(this)
        this.TimePanel = new TimePanel(this)
        this.MagicianPanel = new MagicianPanel(this)
        this.Cartola = new Cartola(this)
        this.ResolutionMessage = new ResolutionMessage(this)

        this.Word1 = new WordPanel(this, 1)
        this.Word2 = new WordPanel(this, 2)
        this.Word3 = new WordPanel(this, 3)

        this.BackButton = new BackButton(this, window.innerWidth * 0.15, (window.innerWidth * 0.1) * 0.5, window.innerWidth * 0.01, window.innerHeight * 0.30, 2, GameData.modalBackButton )

        this.ContinueButton = new ContinueButton(this, window.innerWidth * 0.2, (window.innerWidth * 0.1) * 0.5, window.innerWidth * 0.78, window.innerHeight * 0.70, 2, GameData.continueButton )
        
        this.BackButtonModal = new BackButtonModal(this, window.innerWidth * 0.15, (window.innerWidth * 0.1) * 0.5, window.innerWidth * 0.01, window.innerHeight * 0.70, 2, GameData.modalBackButton )
        this.TextModal = new TextModal(this, window.innerWidth * 0.5, (window.innerWidth * 0.1) * 0.5, window.innerWidth * 0.01, window.innerHeight * 0.15, 2, GameData.modalText )
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

        if(GameData.showDoubtModal){
            this.BackButton.BeginPlay(context);
            this.BackButton.Tick();

            this.TextModal.BeginPlay(context);
            this.TextModal.Tick();

        }

        if(GameData.showWrongAnswerModal){
            this.Word1.RenderModalWrong(context);
            this.BackButtonModal.BeginPlay(context);
            this.BackButtonModal.Tick();
        }

        if(GameData.showRightAnswerModal){
            this.Word1.RenderModalRight(context);

            if(GameData.playerPoints >= 10){
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
            }, 5);  

             


        });
    
        /**CALL THIS FUNCTION WILL ACTIVATE THE HOVERING EFFECT ON THE ELEMENT PASSED AS PARAMETER */
        hover_on_element(continue_button_hover, canvas, "../scene_15/");
    
    
    })
}
BeginPlay();


