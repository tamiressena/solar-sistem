// CONTAINER ONDE VÃO APARECER AS INFORMAÇÕES GERADAS
let container = document.createElement("div");
container.style.display = "flex";
container.style.backgroundColor = "rgba(109, 109, 109, 0.24)";
container.style.fontFamily = "sans-serif";
container.style.width = "900px";
container.style.margin = "auto";
container.style.justifyContent = "center";
container.style.alignItems = "center";
document.body.appendChild(container);

// ARRAY QUE SERÁ CONSULTADO PARA APRESENTAR O NOME DO PLANETA/LUA, A IMAGEM CORRESPONDENTE E O VALOR UTILIZADO PARA CONVERTER A MASSA
const planets = [
  ["Moon", "images/moon.png", 0.17],
  ["Mercury", "images/mercury.png", 0.37],
  ["Venus", "images/venus.png", 0.88],
  ["Earth", "images/earth.png", 1],
  ["Mars", "images/mars.png", 0.38],
  ["Jupiter", "images/jupiter.png", 2.64],
  ["Saturn", "images/saturn.png", 1.15],
  ["Uranus", "images/uranus.png", 1.17],
  ["Neptune", "images/neptune.png", 1.18],
  ["Pluto", "images/pluto.png", 0.11],
];

// TELA INICIAL
let picture = document.createElement("picture");
container.appendChild(picture);

let source = document.createElement("source");
source.setAttribute("src", planets[3][1]);
source.setAttribute("type", "image/png"); // Especifica o tipo de imagem
source.style.width = "400px";
source.style.margin = "30px 0px";
picture.appendChild(source);

let img = document.createElement("img");
img.setAttribute("src", planets[3][1]); // Isso é necessário como fallback. Img é obrigatório
img.style.width = "400px";
img.style.margin = "30px 0px";
picture.appendChild(img);

// CONTAINER EM QUE APARECERÁ O PLANETA E O TEXTO
let info = document.createElement("div");
container.appendChild(info);

// DIV PARA CONFIGURAR TEXTOS
let presentation = document.createElement("div");
presentation.style.display = "flex";
presentation.style.gap = "4px";
presentation.style.margin = "auto";
info.appendChild(presentation);

// TEXTO PRINCIPAL
let text = document.createElement("p");
text.style.color = "white";
text.style.fontSize = "32px";
text.style.margin = "24px 40px";
text.style.padding = "24px 40px";
text.style.backgroundColor = "rgba(109, 109, 109, 0.24)";

// SELECIONA O INPUT, BOTÃO E O SELECT
let input = document.querySelector("input");
let button = document.querySelector("button");
let planetSelection = document.getElementsByClassName("select-planets")[0];
let selectedValue;
let inputValue;

// FUNÇÃO QUE RECEBE OS VALORES E CALCULA A MASSA
function calculateMass() {
  // VALIDAÇÕES ANTES DO CLIQUE
  // Verifica se valor do input é válido, se usuário não deixou em branco ou se é composto por caracteres que não sejam números
  input.addEventListener("blur", () => {
    inputValue = input.value;
    if (inputValue == "") {
      text.textContent = "Mass is required";
      picture.innerHTML = "";
      presentation.appendChild(text);
    } else if (isNaN(inputValue)) {
      text.textContent = "Enter number value on the input field";
      picture.innerHTML = "";
      presentation.appendChild(text);
    }
  });

  // Pega valor selecionado no dropdown
  planetSelection.addEventListener("change", (event) => {
    selectedValue = event.target.value;
  });

  // DEFINE O QUE OCORRE APÓS O CLIQUE NO BOTÃO
  button.addEventListener("click", () => {
    // Limpa o conteúdo de consultas anteriores
    const previousResults = info.querySelectorAll("p");
    previousResults.forEach((result) => result.remove());

    // Verifica se input foi preenchido e se o valor é válido
    if (inputValue == undefined) {
      text.textContent = "Mass is required";
      picture.innerHTML = "";
      presentation.appendChild(text);
      return;
    } else if (isNaN(inputValue)) {
      text.textContent = "Enter number value on the input field";
      picture.innerHTML = "";
      presentation.appendChild(text);
      return;
    }

    // Verifica se usuário selecionou o planeta/lua
    if (selectedValue == undefined) {
      text.textContent = "Select a planet or the moon";
      picture.innerHTML = "";
      presentation.appendChild(text);
      return;
    }

    // Configura layout da mensagem retornada. Inicialmente ela não aparece, aparece somente a imagem da Terra, por isso, a configurei aqui
    presentation.style.color = "white";
    presentation.style.fontSize = "16px";
    presentation.style.margin = "24px 40px";
    presentation.style.padding = "24px 40px";
    presentation.style.backgroundColor = "rgba(109, 109, 109, 0.24)";

    // Texto fixo nas consultas
    text.textContent = "The weight of the object on";
    text.style.justifyContent = "center";
    text.style = "";
    presentation.appendChild(text);

    // Nome do planeta
    let planetName = document.createElement("p");
    planetName.textContent = planets[selectedValue][0].toUpperCase();
    planetName.style.fontWeight = "700";
    presentation.appendChild(planetName);

    // Cálculo do resultado final e ajustes de layout do valor impresso
    let result = document.createElement("p");
    result.textContent =
      (parseFloat(inputValue) * planets[selectedValue][2]).toFixed(2) + " Kg";
    info.appendChild(result);
    result.style.display = "flex";
    result.style.alignItems = "center";
    result.style.justifyContent = "center";
    result.style.margin = "auto";
    result.style.fontWeight = "700";
    result.style.fontSize = "24px";
    result.style.color = "white";
    result.style.width = "150px";
    result.style.height = "150px";
    result.style.backgroundColor = "rgba(109, 109, 109, 0.24)";
    result.style.borderRadius = "50%";

    // Atualiza a imagem do planeta
    source.setAttribute("src", planets[selectedValue][1]);
    picture.appendChild(source);
    img.setAttribute("src", planets[selectedValue][1]);
    picture.appendChild(img);
  });
}

calculateMass();
