import "./style.css";
import { getCars } from "./services";

const carForm = document.querySelector("#car-form");
const registerBtn = document.querySelector("#register-btn");
const carsTable = document.querySelector("#cars-table");
const carFormInputs = document.querySelectorAll("#car-form input");

carsTable.style.cssText = `display: none`;

const addRow = (values) => {
  let newRow = carsTable.insertRow(-1);

  values.map((value, index) => {
    let newCell = newRow.insertCell(0);
    let newText = document.createTextNode(value);
    newCell.appendChild(newText);
  });

  carForm.reset();

  carsTable.style.cssText = `
      margin-top: 10px;
      border: 1px solid black;
      display: "";
    `;
};

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let values = [];

  carFormInputs.forEach((data) => values.unshift(data.value));

  addRow(values);
});

getCars().then((data) => {
  // console.log(data);

  if (data.length > 0) {
    carsTable.style.cssText = `display: ''`;

    let newRow = carsTable.insertRow(-1);
    data.map((v, i) => {
      for (let prop in v) {
        console.log(prop);
      }

      /*
      let newRow = carsTable.insertRow(-1);
      let newCell = newRow.insertCell(index);
      let newText = document.createTextNode(data[index].);
      newCell.appendChild(newText);
      */
    });

    /*
    let newRow = carsTable.insertRow(-1);
    let newCell = newRow.insertCell(0);
    let newText = document.createTextNode(data.image);
    newCell.appendChild(newText);
    */
  }
});
