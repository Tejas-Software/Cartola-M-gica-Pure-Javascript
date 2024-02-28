import { CheckMouseCollision } from "../../../lib/Dynamics/Dynamics.js"
import {Image} from "../../../lib/Image/Image.js"
import { ResolutionMessage } from "../../../lib/Messages/ResolutionMessage.js";
import { ScorePanel } from "../../../lib/Panels/ScorePanel.js";
import { TimerPanel } from "../../../lib/Timer/Timer.js";

let GameData = {
    doubtButton: document.getElementById("doubt_button"),
    continueButton: document.getElementById("continue_button"),
    modalBackButton: document.getElementById("back_button"),
    modalText: document.getElementById("modal_message"),
    modalBackground: document.getElementById("black_background"),
    timerImage: document.getElementById("time_panel"),
    magicianPanel: document.getElementById("magician_panel"),
    cartolaImage: document.getElementById("cartola"),

    showDoubtModal: false,
    showWrongAnswerModal: false,
    showRightAnswerModal: false,
    showRightAnswerModalWord4: false,
    showRightAnswerModalWord3: false,
    Word4Visible: true,
    Word3Visible: true,
    playerPoints: 0,
    magicianPoints: 0,
    word1Discovered: false,
    word2Discovered: false,
    
    word3Discovered: false,
    canDoubtButtonHover: () => {
        return GameData.showWrongAnswerModal === false && GameData.showRightAnswerModal === false && GameData.showDoubtModal === false && GameData.showRightAnswerModalWord4 === false; 
    },
    canWordPanelBeClicked: () => {
        return GameData.showRightAnswerModal === false && GameData.showWrongAnswerModal === false && GameData.showDoubtModal === false;
    }
};

class DoubtButton extends Image {
    constructor(game, width, height, x, y, speed, image){

        super(game, width, height, x, y, speed, image);

    }

    BeginPlay(context){
        super.BeginPlay(context); 

        if(GameData.showDoubtModal){
            context.drawImage(GameData.modalBackground, 0, 0, window.innerWidth, window.innerHeight);
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
        GameData.showRightAnswerModal = false;
        GameData.showWrongAnswerModal = false;
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

        if(GameData.selectedWord === 4) {
            GameData.Word4Visible = false;
            GameData.selectedWord = null;
        } else if (GameData.selectedWord === 3) {
            GameData.Word3Visible = false;
            GameData.selectedWord = null;
        }

    }

    Tick(){
        this.HoverTransformScale(GameData);
        this.OnClick(this.renderModal, GameData)
    }
}

class BackButtonModalWord4 extends Image {
    constructor(game, width, height, x, y, speed, image){
        super(game, width, height, x, y, speed, image);
    }

    renderModal(){
        GameData.showWrongAnswerModal = false;
        GameData.showRightAnswerModal = false;
        GameData.showRightAnswerModalWord4 = false;
        GameData.showDoubtModal = false;
        GameData.Word4Visible = false;
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

class ThisResolutionMessage extends ResolutionMessage {
    constructor(game){
        super(game)
    }

}

class TimePanel extends TimerPanel{
    constructor(game, image){
        super(game, image)
    }
}

class MagicianPanel extends ScorePanel{
    constructor(game, image, height, width, x, y, speed, score, opacity, titleText, titleFont, titleSize, titleColor, scoreFont, scoreTextSize, scoreTextColor){
        super(game, image, height, width, x, y, speed, score, opacity, titleText, titleFont, titleSize, titleColor, scoreFont, scoreTextSize, scoreTextColor);
    }

}

class YouPanel extends ScorePanel {
    constructor(game, image, height, width, x, y, speed, score, opacity, titleText, titleFont, titleSize, titleColor, scoreFont, scoreTextSize, scoreTextColor){
        super(game, image, height, width, x, y, speed, score, opacity, titleText, titleFont, titleSize, titleColor, scoreFont, scoreTextSize, scoreTextColor);
    }

}

class Cartola extends Image {
    constructor(game, width, height, x, y, speed, image){
        super(game, width, height, x, y,  speed, image)
    }

    Tick(){

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

class WordPanel3 {

    constructor(game, number){

        const setAttributes = () => {

            this.game = game;
            this.image = document.getElementById("word_panel");
            this.imageError = document.getElementById("image_error");
            this.imageRight = document.getElementById("image_right");
            this.modalBackground = document.getElementById("black_background");
            this.modalBackButton = document.getElementById("back_button");
            this.magicianPanel = document.getElementById("magician_panel");
            this.youPanel = document.getElementById("you_panel");
            this.isVisible = true;

            this.height = window.innerHeight * 0.13;
            this.width = this.height * 3.5;
            this.initialWidth = this.height * 3.5;

            this.textX = window.innerWidth - this.width;
            this.textY = window.innerHeight - this.height * 0.5;

            this.InitialTextX = this.textX
            this.InitialTextY = this.textY

            this.discovered = false;
            this.canClick = true;

            this.x = (window.innerWidth * 0.5) - (this.width * 1.14)
            this.InitialX = (window.innerWidth * 0.5) - (this.width * 1.14)
            this.y = window.innerHeight - (this.height * 1.2)
            this.InitialY = window.innerHeight - (this.height * 1.2)
            this.opacity = 0;
            this.id = 3;
    
            this.speed = 4.5;
        
            this.number = 3;

            this.YouPointAdded = false;

        }
        setAttributes();

    }

    draw(context, number) {
        // Draw the word panel
        const renderImage = () => {
            context.globalAlpha = this.opacity;
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.globalAlpha = 1;
        };
        renderImage();
    
        // Draw the text inside the panel
        const renderTextTimer = (text, color, width, X) => {
            if (text === "Trabalharam") {
                context.font = `${width * 0.138}px eurostyle`;
            } else if (text === "Marmelada") {
                context.font = `${width * 0.145}px eurostyle`;
            } else if (text === "Desenharam") {
                context.font = `${width * 0.135}px eurostyle`;
            }
    
            context.fillStyle = color;
            context.globalAlpha = this.opacity;
            let thisText = text;
            // Calculate text position relative to the panel
            const textX = this.x + (this.width - context.measureText(thisText).width) / 2;
            const textY = this.y + this.height * 0.5; // Adjust Y position as needed
            context.fillText(thisText, textX, textY);
        };
    
        renderTextTimer('Trabalharam', "#009966", this.width, this.textX * 1);
    }
    
    

    HoverTransformScale(GameData, params){

        let paramsLength = params?.length;
        let trueParams = 0;

        params.map((param)=>{if(param === true){trueParams+=1;}})


        if(paramsLength === trueParams){
            let bIsMouseColliding = CheckMouseCollision(this, GameData);
            if (bIsMouseColliding && this.width <= this.initialWidth * 1.02) {
                this.currentHovering = this.id;
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

            if(this.number !== 4){
                if (this.textX > (this.x + this.width * 0.05) ){
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

        if(!GameData.showRightAnswerModalWord3){
            this.HoverTransformScale(GameData, [GameData.canWordPanelBeClicked()])
        }

        const dealWithModalRight = () => {
            this.RenderModalRight(context)
            GameData.showRightAnswerModalWord3 = true;
            if(!this.YouPointAdded){
                GameData.playerPoints += 5;
                this.YouPointAdded = true;
            }

        }

        const isMouseInsidePanel = () => {
            // Check if the mouse position is within the bounds of the panel
            return (
                GameData.MouseX >= this.x &&
                GameData.MouseX <= this.x + this.width &&
                GameData.MouseY >= this.y &&
                GameData.MouseY <= this.y + this.height
            );
        }


        const dragMe = () => {
            if (GameData.isMouseDown) {
                if (this.currentHovering === this.id && isMouseInsidePanel()) {
                    // Only initiate drag if mouse is hovering over the panel and is inside its bounds
                    this.x = GameData.MouseX - (this.width / 2);
                    this.y = GameData.MouseY - (this.height / 2);
                    this.textX = GameData.MouseX + (this.width * 0.1) - (this.width / 2);
                    this.textY = GameData.MouseY + (this.height * 0.6) - (this.height / 2);
                    GameData.selectedWord = 3;
                }
            } else if (!GameData.isMouseDown && GameData.selectedWord === 3) {
                // Reset the position if the mouse is released
                this.x = this.InitialX;
                this.y = this.InitialY;
                this.textX = this.InitialTextX;
                this.textY = this.InitialTextY;
                
                // Check if the word is dropped inside the drop zone
                if (GameData.wordInsideDropZone) {
                    console.log("Word was dropped inside the drop zone");
                    // Perform appropriate actions when the word is dropped
                    this.RenderModalAnswer(this.number, GameData.Context); // Render the right modal
                    GameData.showRightAnswerModal = true; // Set flag to keep the right modal open
                }
                // Clear the selectedWord flag
                //GameData.selectedWord = null;
            }
        }
        
        

        
        
        dragMe();


    }



}

class WordPanel4 {

    constructor(game, number){

        const setAttributes = () => {

            this.game = game;
            this.image = document.getElementById("word_panel");
            this.imageError = document.getElementById("image_error");
            this.imageRight = document.getElementById("image_right");
            this.modalBackground = document.getElementById("black_background");
            this.modalBackButton = document.getElementById("back_button");
            this.magicianPanel = document.getElementById("magician_panel");
            this.youPanel = document.getElementById("you_panel");
            this.isVisible = true;

            this.height = window.innerHeight * 0.13;
            this.width = this.height * 3.5;
            this.initialWidth = this.height * 3.5;

            this.textX = window.innerWidth - this.width;
            this.textY = window.innerHeight - this.height * 0.5;

            this.InitialTextX = this.textX
            this.InitialTextY = this.textY

            this.discovered = false;
            this.canClick = true;

            this.x = window.innerWidth - (this.width * 1.14)
            this.InitialX = window.innerWidth - (this.width * 1.14)
            this.y = window.innerHeight - (this.height * 1.2)
            this.InitialY = window.innerHeight - (this.height * 1.2)
            this.opacity = 0;
            this.id = 4;
    
            this.speed = 4.5;
        
            this.number = 4;

            this.YouPointAdded = false;

        }
        setAttributes();

    }

    draw(context, number) {
        // Draw the word panel
        const renderImage = () => {
            context.globalAlpha = this.opacity;
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.globalAlpha = 1;
        };
        renderImage();
    
        // Draw the text inside the panel
        const renderTextTimer = (text, color, width, X) => {
            if (text === "Trabalharam") {
                context.font = `${width * 0.138}px eurostyle`;
            } else if (text === "Marmelada") {
                context.font = `${width * 0.145}px eurostyle`;
            } else if (text === "Desenharam") {
                context.font = `${width * 0.135}px eurostyle`;
            }
    
            context.fillStyle = color;
            context.globalAlpha = this.opacity;
            let thisText = text;
            // Calculate text position relative to the panel
            const textX = this.x + (this.width - context.measureText(thisText).width) / 2;
            const textY = this.y + this.height * 0.5; // Adjust Y position as needed
            context.fillText(thisText, textX, textY);
        };
    
        renderTextTimer('Trabalharam', "#009966", this.width, this.textX * 1);
    }
    
    

    HoverTransformScale(GameData, params){

        let paramsLength = params?.length;
        let trueParams = 0;

        params.map((param)=>{if(param === true){trueParams+=1;}})


        if(paramsLength === trueParams){
            let bIsMouseColliding = CheckMouseCollision(this, GameData);
            if (bIsMouseColliding && this.width <= this.initialWidth * 1.02) {
                this.currentHovering = this.id;
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
                if (this.textX > (this.x + this.width * 0.05) ){
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

        if(!GameData.showRightAnswerModalWord4){
            this.HoverTransformScale(GameData, [GameData.canWordPanelBeClicked()])
        }

        const dealWithModalRight = () => {
            this.RenderModalRight(context)
            GameData.showRightAnswerModalWord4 = true;
            if(!this.YouPointAdded){
                GameData.playerPoints += 5;
                this.YouPointAdded = true;
            }

        }

        const isMouseInsidePanel = () => {
            // Check if the mouse position is within the bounds of the panel
            return (
                GameData.MouseX >= this.x &&
                GameData.MouseX <= this.x + this.width &&
                GameData.MouseY >= this.y &&
                GameData.MouseY <= this.y + this.height
            );
        }


        const dragMe = () => {
            if (GameData.isMouseDown) {
                if (this.currentHovering === this.id && isMouseInsidePanel()) {
                    // Only initiate drag if mouse is hovering over the panel and is inside its bounds
                    this.x = GameData.MouseX - (this.width / 2);
                    this.y = GameData.MouseY - (this.height / 2);
                    this.textX = GameData.MouseX + (this.width * 0.1) - (this.width / 2);
                    this.textY = GameData.MouseY + (this.height * 0.6) - (this.height / 2);
                    GameData.selectedWord = 4;
                }
            } else if (!GameData.isMouseDown && GameData.selectedWord === 4) {
                // Reset the position if the mouse is released
                this.x = this.InitialX;
                this.y = this.InitialY;
                this.textX = this.InitialTextX;
                this.textY = this.InitialTextY;
                
                // Check if the word is dropped inside the drop zone
                if (GameData.wordInsideDropZone) {
                    console.log("Word was dropped inside the drop zone");
                    // Perform appropriate actions when the word is dropped
                    this.RenderModalAnswer(this.number, GameData.Context); // Render the right modal
                    GameData.showRightAnswerModal = true; // Set flag to keep the right modal open
                }
                // Clear the selectedWord flag
                //GameData.selectedWord = null;
            }
        }
        
        

        
        
        dragMe();


    }



}

class InvisibleDropZone {

    constructor(game) {
        this.game = game;
        this.width = window.innerWidth / 2;
        this.height = window.innerHeight / 2; 
        this.x = window.innerWidth / 2 - (this.width / 2); 
        this.y = window.innerHeight / 2 - (this.height / 2); 

        this.opacity = 0;
    }

    HoverTransformScale(GameData){


        let bIsMouseColliding = CheckMouseCollision(this, GameData);
        if (bIsMouseColliding && GameData.isMouseDown)  {
            console.log("in drop zone")
            console.log(GameData.selectedWord)
            GameData.wordInsideDropZone = true;
        } 

        if(!bIsMouseColliding || !GameData.isMouseDown) {
            console.log(GameData.selectedWord)
            GameData.wordInsideDropZone = false;
        }

    }

    draw(context) {
        context.globalAlpha = this.opacity; 
        context.fillStyle = 'black'; 
        context.fillRect(this.x, this.y, this.width, this.height);
        context.globalAlpha = 1; 
    }

    tick(){

        this.HoverTransformScale(GameData)

    }

}




class Game {
    constructor(canvas){
        /**GAME CLASS WILL STORE THE CANVAS DATA */
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        /**GAME CLASS WILL EXECUTE AND OWN ALL THESE CLASSES */
        this.doubt_button = new DoubtButton(this, window.innerWidth * 0.06, (window.innerWidth * 0.1) * 0.5, window.innerWidth * 0.01, window.innerHeight * 0.01, 2, GameData.doubtButton )
       
        this.TimerPanel = new TimePanel(this, GameData.timerImage)
        this.MagicianPanel = new MagicianPanel(this, GameData.magicianPanel, window.innerHeight * 0.25, window.innerWidth * 0.12, window.innerWidth * 0.70, 0, 4.5, 0, 0, 'MÁGICO', 'bigDots', '2.5vw', "#00FFFF", "bigDots", "5.2vw", "white")
        this.YouPanel = new YouPanel(this, GameData.magicianPanel, window.innerHeight * 0.25, window.innerWidth * 0.12, window.innerWidth * 0.85, 0, 4.5, 0, 0, 'VOCÊ', 'bigDots', '2.5vw', "#00FFFF", "bigDots", "5.2vw", "white")
        this.Cartola = new Cartola(this, this.height * 1, window.innerHeight * 0.9,  (window.innerWidth * 0.48) - ((window.innerHeight * 0.9) * 0.5), window.innerHeight - (( window.innerHeight * 0.9) * 1.25), 4.5, GameData.cartolaImage)
        this.ResolutionMessage = new ThisResolutionMessage(this)

        this.Word3 = new WordPanel3(this, 3)
        this.Word4 = new WordPanel4(this, 4)
        this.InvisibleDropZone = new InvisibleDropZone(this)

        this.BackButton = new BackButton(this, window.innerWidth * 0.15, (window.innerWidth * 0.1) * 0.5, window.innerWidth * 0.01, window.innerHeight * 0.30, 2, GameData.modalBackButton )

        this.ContinueButton = new ContinueButton(this, window.innerWidth * 0.2, (window.innerWidth * 0.1) * 0.5, window.innerWidth * 0.78, window.innerHeight * 0.70, 2, GameData.continueButton )
        
        this.BackButtonModal = new BackButtonModal(this, window.innerWidth * 0.15, (window.innerWidth * 0.1) * 0.5, window.innerWidth * 0.01, window.innerHeight * 0.70, 2, GameData.modalBackButton )
        this.BackButtonModalWord4 = new BackButtonModalWord4(this, window.innerWidth * 0.15, (window.innerWidth * 0.1) * 0.5, window.innerWidth * 0.01, window.innerHeight * 0.70, 2, GameData.modalBackButton )
        this.TextModal = new TextModal(this, window.innerWidth * 0.5, (window.innerWidth * 0.1) * 0.5, window.innerWidth * 0.01, window.innerHeight * 0.15, 2, GameData.modalText )
    }
    /**THIS METHOD WILL RENDER THE GAME */
    render(context){

        this.doubt_button.BeginPlay(context);
        this.doubt_button.tick();

        this.TimerPanel.draw(context);
        this.TimerPanel.tick();

        this.MagicianPanel.BeginPlay(context);
        this.MagicianPanel.Tick(GameData.magicianPoints);


        this.YouPanel.BeginPlay(context);
        this.YouPanel.Tick(GameData.playerPoints);

        this.Cartola.BeginPlay(context);
        this.Cartola.Tick();

        if(GameData.Word3Visible){
            this.Word3.draw(context, 3)
            this.Word3.tick(context)
            
        }

        if(GameData.Word4Visible){
            this.Word4.draw(context, 3)
            this.Word4.tick(context)
            
        }

        if (GameData.showRightAnswerModal) {

            if(this.Word4.YouPointAdded === false){
                GameData.playerPoints += 5;
                this.Word4.YouPointAdded = true;
            }

            this.Word4.RenderModalRight(context); // Assuming wordPanel4 is the instance of WordPanel4
            this.BackButtonModal.BeginPlay(context);
            this.BackButtonModal.Tick();
        }



        this.InvisibleDropZone.draw(context);
        this.InvisibleDropZone.tick();



        if(GameData.showDoubtModal){
            this.BackButton.BeginPlay(context);
            this.BackButton.Tick();

            this.TextModal.BeginPlay(context);
            this.TextModal.Tick();

        }

        if(GameData.showWrongAnswerModal){
            this.BackButtonModal.BeginPlay(context);
            this.BackButtonModal.Tick();
        }



        

    }
    /**THIS METHOD WILL RENDER AN WARNING TO UPDATE THE RESOLUTION IF DOESN'T FIT THE REQUIRED MIN RESOLUTION */
    renderResolutionMessage(context){
        this.ResolutionMessage.draw(context);
    }
}


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
        }, 15);  

        

             
        });

        /**GETS IF MOUSE IS DOWN */
        canvas.addEventListener('mousedown', function(event) {
            
            console.log("mouse is down")
            GameData.isMouseDown = true;
                 
        });

        /**GETS IF MOUSE IS DOWN */
        canvas.addEventListener('mouseup', function(event) {
            
            console.log("mouse is up")
            GameData.isMouseDown = false;
                 
        });
   
    
    })
}
BeginPlay();


