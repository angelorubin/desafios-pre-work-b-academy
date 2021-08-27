import "./style.css";
import { createCar, retrieveCars } from "./services";
import { checkElementExists } from "./utils";

const container = document.querySelector("#container");
const carForm = document.querySelector("#car-form");
const carFormBtn = document.querySelector("#car-form__btn");
const carsTable = document.querySelector("#cars-table");
const carFormInputs = document.querySelectorAll("#car-form input");
const message = document.querySelector("#message");

const hideElementById = (id) => {
  const el = document.querySelector(`#${id}`);
  return (el.style.display = "none");
};

const showElementById = (id) => {
  const el = document.querySelector(`#${id}`);
  return (el.style.display = "");
};

hideElementById("cars-table");

container.style.cssText = `
  margin: 0.5rem;
`;

const addRow = (values) => {
  let newRow = carsTable.insertRow(-1);

  values.map((value, index) => {
    let newCell = newRow.insertCell(0);
    let newText = document.createTextNode(value);
    newCell.appendChild(newText);
  });
};

carFormBtn.addEventListener("click", (e) => {
  carsTable.style.cssText = `display: none`;

  const form = new FormData(carForm);

  const formData = Object.fromEntries(form);

  createCar(formData).then((res) => console.log(res));
});

retrieveCars()
  .then((cars) => {
    console.log("CARROS CADASTRADOS:", cars.data.length);
    console.log(typeof cars);
    // console.log(cars.data);

    if (cars.data.length === 0) {
      carsTable.style.cssText = `display: none`;
      container.insertAdjacentHTML(
        "beforeend",
        "<p id='message'>Nenhum carro cadastrado.</p>"
      );
    } else {
      carsTable.style.cssText = `
        border: 1px solid #000;
        margin-top: 1rem;
    `;

      cars.data.map((car, index) => {
        let row = carsTable.insertRow(-1);
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
      });
    }
  })
  .catch((error) => {
    console.log(error);
  });
