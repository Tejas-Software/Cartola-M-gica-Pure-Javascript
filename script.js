import { createBackground, insertImage, insertImageWithHoverAndLink } from "./content/functions.js";

createBackground('/content/tela_01/cenario.svg');
insertImage('/content/tela_01/brand_logo.png', "2vh", "2vw", "0.4", "30vw", "10vh", "0");
insertImage('/content/tela_01/nome_cartola.svg', "35vh", "17.5vw", "1", "60vw", "50vh", "998");
insertImageWithHoverAndLink('/content/tela_01/botao_iniciar.svg', "2vh", "71vw", "1", "20vw", "10vh", "999");
insertImage('/content/tela_01/cartas.svg', "6vh", "13vw", "1", "80vw", "50vh", "0",);