import "./style.css";
import { createCar, retrieveCars } from "./src/components/home/services";

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

// hide element by ID
const hideElementById = (id) =>
  (document.querySelector(`#${id}`).style.display = "none");

// show element by ID
const showElementById = (id) =>
  (document.querySelector(`#${id}`).style.display = "");

hideElementById("cars-table");

container.style.cssText = `
  margin: 0.5rem;
`;

// add a row to a cars table
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

// add a new car
carFormBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // carsTable.style.cssText = `display: none`;

  const form = new FormData(carForm);

  const formData = Object.fromEntries(form);

  createCar(formData)
    .then((res) => {
      const { errors, status } = res.data;
      if (errors) {
        console.log(errors);
      }

      console.log(status);
    })
    .catch((error) => {
      console.log(error);
    });
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
