import "./style.css";

document.querySelector("[data-js='app']").innerHTML = `
  <h1>B. Academy</h1>
  <p>Boas vindas à semana de pré-work para o Bootcamp em React.js 😁</p>
`;

let app = document.querySelector("[data-js='app']");

// criando link no index.html
let link = document.createElement("a");

// criando texto para o link
let text = document.createTextNode("hide/show");

// adicionando texto ao link
link.appendChild(text);
link.setAttribute("href", "#");

// colocando link no document
document.body.appendChild(link);

// adicionando evento click ao link
link.addEventListener("click", () =>
  app.offsetWidth > 0 && app.offsetHeight > 0
    ? (app.style.display = "none")
    : (app.style.display = "")
);
