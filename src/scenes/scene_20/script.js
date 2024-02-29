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

    showWrongAnswerModal1: false,
    showRightAnswerModal2: false,
    showWrongAnswerModal4: false,
    showWrongAnswerModal3: false,
    showRightAnswerModal5: false,


    Word1Visible: true,
    Word2Visible: true,
    Word3Visible: true,
    Word4Visible: true,
    Word5Visible: true,


    playerPoints: 0,
    magicianPoints: 0,

    word1Discovered: false,
    word2Discovered: false,


    isDragginWord1: false,
    isDragginWord2: false,
    isDragginWord3: false,
    isDragginWord4: false,
    isDragginWord5: false,
    
    word3Discovered: false,
    canDoubtButtonHover: () => {
        return GameData.showWrongAnswerModal === false && GameData.showRightAnswerModal === false && GameData.showDoubtModal === false; 
    },
    canWordPanelBeClicked: () => {
        return GameData.showRightAnswerModal === false && GameData.showWrongAnswerModal === false && GameData.showDoubtModal === false;
    },
    canClickWordPanels: () => {
        return GameData.showWrongAnswerModal1 === false && GameData.showRightAnswerModal2 === false && GameData.showWrongAnswerModal3 === false && GameData.showWrongAnswerModal4 === false && GameData.showRightAnswerModal5 === false && GameData.showDoubtModal === false;
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
        GameData.showWrongAnswerModal4 = false;
        GameData.showWrongAnswerModal3 = false;
        GameData.showWrongModal3 = false;
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
        this.OnClick(this.GoToLink(GameData, "../scene_21"), GameData)
    }
}

class BackButtonModal extends Image {
    constructor(game, width, height, x, y, speed, image){
        super(game, width, height, x, y, speed, image);
    }

    renderModal(){
        GameData.showWrongAnswerModal = false;
        GameData.showWrongAnswerModal1 = false;
        GameData.showRightAnswerModal = false;
        GameData.showRightAnswerModal2 = false;
        GameData.showWrongAnswerModal4 = false;
        GameData.showRightAnswerModal5 = false;
        GameData.showDoubtModal = false;

        if(GameData.selectedWord === 4) {
            GameData.Word4Visible = false;
            GameData.selectedWord = null;
        } else if (GameData.selectedWord === 3) {
            GameData.Word3Visible = false;
            GameData.selectedWord = null;
            GameData.showWrongAnswerModal3 = false;
        } else if (GameData.selectedWord === 2) {
            GameData.Word2Visible = false;
            GameData.selectedWord = null;
        } else if (GameData.selectedWord === 1) {
            GameData.Word1Visible = false;
            GameData.selectedWord = null;
        } else if (GameData.selectedWord === 5) {
            GameData.Word5Visible = false;
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
                    this.opacity += 0.1;
                }
            }
        }
        begginingAnimation("AppearGradient");

    }
}

class WordPanel1 {

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

            this.x = this.width * 0.1
            this.InitialX = this.width * 0.1

            this.y = window.innerHeight - (this.height * 2.5)
            this.InitialY = window.innerHeight - (this.height * 2.5)
            this.opacity = 0;
            this.id = 1;
    
            this.speed = 10;
        
            this.number = 1;

            this.YouPointAdded = false;
            this.MagicianPointAdded = false;

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
            if (text === "Saber") {
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
    
        renderTextTimer('Saber', "#009966", this.width, this.textX * 1);
    }
    
    

    HoverTransformScale(GameData, params){

        let paramsLength = params?.length;
        let trueParams = 0;

        params.map((param)=>{if(param === true){trueParams+=1;}})

        console.log(GameData.canClickWordPanels())


        if(paramsLength === trueParams && GameData.canClickWordPanels()){
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

        GameData.showWrongAnswerModal1 = true;
        GameData.showDoubtModal = false;
        GameData.Word1Visible = false;

    }

    tick(context){

        const begginingAnimation = (origin) => {
            if(origin === "AppearGradient"){
                if(this.opacity < 1){
                    this.opacity += 0.1;
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

        if(!GameData.showWrongAnswerModal1){
            this.HoverTransformScale(GameData, [GameData.canWordPanelBeClicked()])
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
            if (GameData.isMouseDown && !GameData.isDragginWord4 && !GameData.isDragginWord3 && !GameData.isDragginWord2 && !GameData.isDragginWord5) {
                if (this.currentHovering === this.id && isMouseInsidePanel() && GameData.canClickWordPanels()) {

                    GameData.isDragginWord1 = true;
                    this.x = GameData.MouseX - (this.width / 2);
                    this.y = GameData.MouseY - (this.height / 2);
                    this.textX = GameData.MouseX + (this.width * 0.1) - (this.width / 2);
                    this.textY = GameData.MouseY + (this.height * 0.6) - (this.height / 2);
                    GameData.selectedWord = 1;
                }
            } else if (!GameData.isMouseDown && GameData.selectedWord === 1) {
                // Reset the position if the mouse is released
                this.x = this.InitialX;
                this.y = this.InitialY;
                this.textX = this.InitialTextX;
                this.textY = this.InitialTextY;
                GameData.isDragginWord1 = false;
                
                // Check if the word is dropped inside the drop zone
                if (GameData.wordInsideDropZone) {

                    // Perform appropriate actions when the word is dropped
                    this.RenderModalAnswer(this.number, GameData.Context); // Render the right modal
                    GameData.showWrongAnswerModal1 = true; // Set flag to keep the right modal open
                }
                // Clear the selectedWord flag
                //GameData.selectedWord = null;
            }
        }
        
        

        
        
        dragMe();


    }



}

class WordPanel2 {

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

            this.x = this.width / 10
            this.InitialX = this.width / 10

            this.y = window.innerHeight - (this.height * 1.2)
            this.InitialY = window.innerHeight - (this.height * 1.2)
            this.opacity = 0;
            this.id = 2;
    
            this.speed = 10;
        
            this.number = 2;

            this.YouPointAdded = false;
            this.MagicianPointAdded = false;

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
            if (text === "Desastroso") {
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
    
        renderTextTimer('Desastroso', "#FF0000", this.width, this.textX * 1);
    }
    
    

    HoverTransformScale(GameData, params){

        let paramsLength = params?.length;
        let trueParams = 0;

        params.map((param)=>{if(param === true){trueParams+=1;}})


        if(paramsLength === trueParams && GameData.canClickWordPanels()){
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
                //GameData.playerPoints = 5;
            } else if (GameData.word1Discovered && GameData.word2Discovered){
                //GameData.playerPoints = 10;
            }
            GameData.showWrongAnswerModal = false;
            GameData.showRightAnswerModal = true;
            GameData.showDoubtModal = false;


        } else if (number === 2){

            if(!GameData.word2Discovered){
                GameData.word2Discovered = true;
            }

            GameData.showWrongAnswerModal = false;
            GameData.showRightAnswerModal2 = true;
            GameData.showDoubtModal = false;
            GameData.Word2Visible = false;


        }
        
    }

    tick(context){


        const begginingAnimation = (origin) => {
            if(origin === "AppearGradient"){
                if(this.opacity < 1){
                    this.opacity += 0.1;
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
            if (GameData.isMouseDown && !GameData.isDragginWord4 && !GameData.isDragginWord3 && !GameData.isDragginWord1 && !GameData.isDragginWord5 && GameData.canClickWordPanels()) {
                if (this.currentHovering === this.id && isMouseInsidePanel()) {
                    // Only initiate drag if mouse is hovering over the panel and is inside its bounds
                    GameData.isDragginWord2 = true;
                    this.x = GameData.MouseX - (this.width / 2);
                    this.y = GameData.MouseY - (this.height / 2);
                    this.textX = GameData.MouseX + (this.width * 0.1) - (this.width / 2);
                    this.textY = GameData.MouseY + (this.height * 0.6) - (this.height / 2);
                    GameData.selectedWord = 2;
                }
            } else if (!GameData.isMouseDown && GameData.selectedWord === 2) {
                // Reset the position if the mouse is released
                this.x = this.InitialX;
                this.y = this.InitialY;
                this.textX = this.InitialTextX;
                this.textY = this.InitialTextY;
                GameData.isDragginWord2 = false;
                
                // Check if the word is dropped inside the drop zone
                if (GameData.wordInsideDropZone) {

                    // Perform appropriate actions when the word is dropped
                    this.RenderModalAnswer(this.number, GameData.Context); // Render the right modal
                    GameData.showRightAnswerModal2 = true; // Set flag to keep the right modal open
                }
                // Clear the selectedWord flag
                //GameData.selectedWord = null;
            }
        }
        
        

        
        
        dragMe();


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

            this.height = window.innerHeight * 0.13;
            this.width = this.height * 3.5;
            this.initialWidth = this.height * 3.5;

            this.textX = window.innerWidth - this.width;
            this.textY = window.innerHeight - this.height * 0.5;

            this.InitialTextX = this.textX
            this.InitialTextY = this.textY

            this.discovered = false;
            this.canClick = true;

            this.x = (window.innerWidth / 2.7) 
            this.InitialX = (window.innerWidth / 2.7)
            this.y = window.innerHeight - (this.height * 1.2)
            this.InitialY = window.innerHeight - (this.height * 1.2)
            this.opacity = 0;
            this.id = 3;
    
            this.speed = 10;
        
            this.number = 3;

            this.YouPointAdded = false;
            this.MagicianPointAdded = false;

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
            if (text === "Bolacha") {
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
    
        renderTextTimer('Bolacha', "#0066FF", this.width, this.textX * 1);
    }
    
    HoverTransformScale(GameData, params){

        let paramsLength = params?.length;
        let trueParams = 0;

        params.map((param)=>{if(param === true){trueParams+=1;}})


        if(paramsLength === trueParams && GameData.canClickWordPanels()){
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
        GameData.showWrongAnswerModal3 = true;
        GameData.Word3Visible = false;        
    }

    tick(context){


        const begginingAnimation = (origin) => {
            if(origin === "AppearGradient"){
                if(this.opacity < 1){
                    this.opacity += 0.1;
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

        if(!GameData.showWrongAnswerModal3){
            this.HoverTransformScale(GameData, [GameData.canWordPanelBeClicked()])
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
            if (GameData.isMouseDown && !GameData.isDragginWord2 && !GameData.isDragginWord4 && !GameData.isDragginWord1 && !GameData.isDragginWord5 & GameData.canClickWordPanels()) {
                if (this.currentHovering === this.id && isMouseInsidePanel()) {
                    // Only initiate drag if mouse is hovering over the panel and is inside its bounds
                    GameData.isDragginWord3 = true;
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
                GameData.isDragginWord3 = false;
                
                // Check if the word is dropped inside the drop zone
                if (GameData.wordInsideDropZone) {


                    this.RenderModalAnswer(this.number, GameData.Context); 
                    //GameData.showRightAnswerModal4 = true; 
                }

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
    
            this.speed = 10;
        
            this.number = 4;

            this.YouPointAdded = false;
            this.MagicianPointAdded = false;

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
            if (text === "Basquete") {
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
    
        renderTextTimer('Basquete', "#CC33CC", this.width, this.textX * 1);
    }
    
    HoverTransformScale(GameData, params){

        let paramsLength = params?.length;
        let trueParams = 0;

        params.map((param)=>{if(param === true){trueParams+=1;}})


        if(paramsLength === trueParams && GameData.canClickWordPanels()){
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
        console.log("chego aqui ?", number)
        if(number === 1){
            if(!GameData.word1Discovered){ GameData.word1Discovered = true;}
            if(GameData.word1Discovered && !GameData.word2Discovered){
                //GameData.playerPoints = 5;
            } else if (GameData.word1Discovered && GameData.word2Discovered){
                //GameData.playerPoints = 10;
            }
            GameData.showWrongAnswerModal = false;
            GameData.showRightAnswerModal = true;
            GameData.showDoubtModal = false;


        } else if (number === 3){

            if(!GameData.word2Discovered){
                GameData.word2Discovered = true;
            }

            if(GameData.word2Discovered && !GameData.word1Discovered){
                //GameData.playerPoints = 5;

            } else if (GameData.word2Discovered && GameData.word1Discovered){
                //GameData.playerPoints = 10;
            }

            GameData.showWrongAnswerModal = false;
            GameData.showRightAnswerModal = true;
            GameData.showDoubtModal = false;


        } else if (number === 2) {


            if(!GameData.word3Discovered){
                GameData.word3Discovered = true;
            }

            if(GameData.word3Discovered){
                //GameData.magicianPoints = 5;

            }

            GameData.showWrongAnswerModal = true;
            GameData.showRightAnswerModal = false;
            GameData.showDoubtModal = false;

        } else if (number === 4) {
            GameData.showWrongAnswerModal4 = true;
            GameData.Word4Visible = false;
        }
        
    }

    tick(context){


        const begginingAnimation = (origin) => {
            if(origin === "AppearGradient"){
                if(this.opacity < 1){
                    this.opacity += 0.1;
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
            if (GameData.isMouseDown && !GameData.isDragginWord2 && !GameData.isDragginWord3 && !GameData.isDragginWord1 && !GameData.isDragginWord5 && GameData.canClickWordPanels()) {
                if (this.currentHovering === this.id && isMouseInsidePanel()) {
                    // Only initiate drag if mouse is hovering over the panel and is inside its bounds
                    GameData.isDragginWord4 = true;
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
                GameData.isDragginWord4 = false;
                
                // Check if the word is dropped inside the drop zone
                if (GameData.wordInsideDropZone) {


                    this.RenderModalAnswer(this.number, GameData.Context); 
                    //GameData.showRightAnswerModal4 = true; 
                }

            }
        }
        
        

        
        
        dragMe();


    }



}

class WordPanel5 {

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

            this.x = window.innerWidth - (this.width * 1.15)
            this.InitialX = window.innerWidth - (this.width * 1.15)

            this.y = window.innerHeight - (this.height * 2.5)
            this.InitialY = window.innerHeight - (this.height * 2.5)
            this.opacity = 0;
            this.id = 5;
    
            this.speed = 10;
        
            this.number = 5;

            this.YouPointAdded = false;
            this.MagicianPointAdded = false;

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
            if (text === "Carinhoso") {
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
    
        renderTextTimer('Carinhoso', "#FF6600", this.width, this.textX * 1);
    }
    
    

    HoverTransformScale(GameData, params){

        let paramsLength = params?.length;
        let trueParams = 0;

        params.map((param)=>{if(param === true){trueParams+=1;}})


        if(paramsLength === trueParams && GameData.canClickWordPanels()){
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

            GameData.showRightAnswerModal5 = true;
            GameData.Word5Visible = false;

    }

    tick(context){


        const begginingAnimation = (origin) => {
            if(origin === "AppearGradient"){
                if(this.opacity < 1){
                    this.opacity += 0.1;
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

        if(!GameData.showRightAnswerModal5){
            this.HoverTransformScale(GameData, [GameData.canWordPanelBeClicked()])
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
            if (GameData.isMouseDown && !GameData.isDragginWord4 && !GameData.isDragginWord3 && !GameData.isDragginWord2 && !GameData.isDragginWord1 && GameData.canClickWordPanels()) {
                if (this.currentHovering === this.id && isMouseInsidePanel() && GameData.canClickWordPanels()) {
                    // Only initiate drag if mouse is hovering over the panel and is inside its bounds
                    GameData.isDragginWord5 = true;
                    this.x = GameData.MouseX - (this.width / 2);
                    this.y = GameData.MouseY - (this.height / 2);
                    this.textX = GameData.MouseX + (this.width * 0.1) - (this.width / 2);
                    this.textY = GameData.MouseY + (this.height * 0.6) - (this.height / 2);
                    GameData.selectedWord = 5;
                }
            } else if (!GameData.isMouseDown && GameData.selectedWord === 5) {
                // Reset the position if the mouse is released
                this.x = this.InitialX;
                this.y = this.InitialY;
                this.textX = this.InitialTextX;
                this.textY = this.InitialTextY;
                GameData.isDragginWord5 = false;
                
                // Check if the word is dropped inside the drop zone
                if (GameData.wordInsideDropZone) {

                    // Perform appropriate actions when the word is dropped
                    this.RenderModalAnswer(this.number, GameData.Context); // Render the right modal
                    //GameData.showRightAnswerModal2 = true; // Set flag to keep the right modal open
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

        this.Word1 = new WordPanel1(this, 1)
        this.Word2 = new WordPanel2(this, 2)
        this.Word3 = new WordPanel3(this, 3)
        this.Word4 = new WordPanel4(this, 4)
        this.Word5 = new WordPanel5(this, 5)
        this.InvisibleDropZone = new InvisibleDropZone(this)

        this.BackButton = new BackButton(this, window.innerWidth * 0.15, (window.innerWidth * 0.1) * 0.5, window.innerWidth * 0.01, window.innerHeight * 0.30, 2, GameData.modalBackButton )

        this.ContinueButton = new ContinueButton(this, window.innerWidth * 0.2, (window.innerWidth * 0.1) * 0.5, window.innerWidth * 0.78, window.innerHeight * 0.70, 2, GameData.continueButton )
        
        this.BackButtonModal = new BackButtonModal(this, window.innerWidth * 0.15, (window.innerWidth * 0.1) * 0.5, window.innerWidth * 0.01, window.innerHeight * 0.70, 2, GameData.modalBackButton )
        this.BackButtonModalWord4 = new BackButtonModalWord4(this, window.innerWidth * 0.15, (window.innerWidth * 0.1) * 0.5, window.innerWidth * 0.01, window.innerHeight * 0.70, 2, GameData.modalBackButton )
        this.TextModal = new TextModal(this, window.innerWidth * 0.5, (window.innerWidth * 0.1) * 0.5, window.innerWidth * 0.01, window.innerHeight * 0.15, 2, GameData.modalText )
    }
    /**THIS METHOD WILL RENDER THE GAME */
    render(context){

        this.MagicianPanel.BeginPlay(context);
        this.MagicianPanel.Tick(GameData.magicianPoints);


        this.YouPanel.BeginPlay(context);
        this.YouPanel.Tick(GameData.playerPoints);

        this.TimerPanel.draw(context);
        this.TimerPanel.tick();

        this.Cartola.BeginPlay(context);
        this.Cartola.Tick();

        if(GameData.showWrongAnswerModal){
            this.BackButtonModal.BeginPlay(context);
            this.BackButtonModal.Tick();
        }

        if(GameData.Word1Visible){
            this.Word1.draw(context, 1)
            this.Word1.tick(context)
            
        }

        if(GameData.Word2Visible){
            this.Word2.draw(context, 2)
            this.Word2.tick(context)
            
        }

        if(GameData.Word3Visible){
            this.Word3.draw(context, 3)
            this.Word3.tick(context)
            
        }

        if(GameData.Word4Visible){
            this.Word4.draw(context, 4)
            this.Word4.tick(context)
            
        }

        if(GameData.Word5Visible){
            this.Word5.draw(context, 2)
            this.Word5.tick(context)
            
        }

        if (GameData.showWrongAnswerModal1) {

            if(this.Word1.MagicianPointAdded === false){
                GameData.magicianPoints += 5;
                this.Word1.MagicianPointAdded = true;
            }

            this.Word1.RenderModalWrong(context); 
            this.BackButtonModal.BeginPlay(context);
            this.BackButtonModal.Tick();
        }

        if (GameData.showRightAnswerModal2) {

            if(this.Word2.YouPointAdded === false){
                GameData.playerPoints += 5;
                this.Word2.YouPointAdded = true;
            }

            this.Word2.RenderModalRight(context); 

            if(GameData.playerPoints === 10) {
                this.ContinueButton.BeginPlay(context);
                this.ContinueButton.Tick();
            } else {
                this.BackButtonModal.BeginPlay(context);
                this.BackButtonModal.Tick();
            }

        }

        if (GameData.showWrongAnswerModal3) {

            if(this.Word3.MagicianPointAdded === false){
                GameData.magicianPoints += 5;
                this.Word3.MagicianPointAdded = true;
            }

            this.Word3.RenderModalWrong(context); 
            this.BackButtonModal.BeginPlay(context);
            this.BackButtonModal.Tick();
        }

        if (GameData.showWrongAnswerModal4) {

            if(this.Word4.MagicianPointAdded === false){
                GameData.magicianPoints += 5;
                this.Word4.MagicianPointAdded = true;
            }

            this.Word4.RenderModalWrong(context); 
            this.BackButtonModal.BeginPlay(context);
            this.BackButtonModal.Tick();
        }

        if (GameData.showRightAnswerModal5) {

            if(this.Word5.YouPointAdded === false){
                GameData.playerPoints += 5;
                this.Word5.YouPointAdded = true;
            }

            this.Word5.RenderModalRight(context); 
            if(GameData.playerPoints === 10) {
                this.ContinueButton.BeginPlay(context);
                this.ContinueButton.Tick();
            } else {
                this.BackButtonModal.BeginPlay(context);
                this.BackButtonModal.Tick();
            }
        }



        this.doubt_button.BeginPlay(context);
        this.doubt_button.tick();

        if(GameData.showDoubtModal){
            this.BackButton.BeginPlay(context);
            this.BackButton.Tick();

            this.TextModal.BeginPlay(context);
            this.TextModal.Tick();

        }











        this.InvisibleDropZone.draw(context);
        this.InvisibleDropZone.tick();







        

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


