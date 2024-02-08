import { Image, renderStartScreen, context } from "./content/functions.js";

renderStartScreen();
let backgroundImage = new Image('./content/tela_01/cenario.svg', 0, 0, window.innerWidth, window.innerHeight);
let brand_logo = new Image('./content/tela_01/brand_logo.png', 0, 0, window.innerWidth, window.innerHeight);
backgroundImage.draw(context);

window.addEventListener("resize", ()=>(window.location.reload()))