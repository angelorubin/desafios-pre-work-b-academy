import "./style.css";
import { createCar, retrieveCars } from "./services";
import { checkElementExists } from "./utils";

const container = document.querySelector("#container");
const carForm = document.querySelector("#car-form");
const carFormBtn = document.querySelector("#car-form__btn");
const carsTable = document.querySelector("#cars-table");
const carFormInputs = document.querySelectorAll("#car-form input");
const message = document.querySelector("#message");
const modals = document.querySelectorAll("[data-modal]");

// modal handler
modals.forEach(function (trigger) {
  trigger.addEventListener("click", function (event) {
    event.preventDefault();
    let modal = document.getElementById(trigger.dataset.modal);
    modal.classList.add("modal-open");
    let exits = modal.querySelectorAll(".modal-exit");
    exits.forEach(function (exit) {
      exit.addEventListener("click", function (event) {
        event.preventDefault();
        modal.classList.remove("modal-open");
      });
    });
  });
});

// method to hide element
const hideElementById = (id) =>
  (document.querySelector(`#${id}`).style.display = "none");

// method to show element
const showElementById = (id) =>
  (document.querySelector(`#${id}`).style.display = "");

hideElementById("cars-table");

container.style.cssText = `
  margin: 0.5rem;
`;

// method add row
const addRow = (car, table) => {
  let row = table.insertRow(-1);

  const cell5 = row.insertCell(0);
  const cell4 = row.insertCell(0);
  const cell3 = row.insertCell(0);
  const cell2 = row.insertCell(0);
  const cell1 = row.insertCell(0);

  const image = document.createElement("img");
  image.setAttribute("src", car.url);
  image.style.cssText = `height: 100px`;

  let brandModel = document.createTextNode(car.brandModel);
  let year = document.createTextNode(car.year);
  let plate = document.createTextNode(car.plate);
  let color = document.createTextNode(car.color);

  cell1.appendChild(image);
  cell2.appendChild(brandModel);
  cell3.appendChild(year);
  cell4.appendChild(plate);
  cell5.appendChild(color);
};

carFormBtn.addEventListener("click", (e) => {
  e.preventDefault();

  retrieveCars().then((data) => console.log(data));

  carsTable.style.cssText = `display: none`;

  const form = new FormData(carForm);

  const formData = Object.fromEntries(form);

  createCar(formData).then((res) => console.log(res));
});

// get all cars
retrieveCars()
  .then((cars) => {
    if (cars.data.length === 0) {
      carsTable.style.cssText = `display: none`;
      container.insertAdjacentHTML(
        "beforeend",
        "<p id='message'>Nenhum carro cadastrado.</p>"
      );
    } else {
      carsTable.style.cssText = `
        margin-top: 1rem;
    `;

      cars.data.map((car) => addRow(car, carsTable));
    }
  })
  .catch((error) => {
    console.log(error);
  });
