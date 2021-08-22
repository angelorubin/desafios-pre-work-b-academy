(function () {
  const carForm = document.querySelector("#car-form");
  const registerBtn = document.querySelector("#register-btn");
  const carsTable = document.querySelector("#cars-table");
  const carFormInputs = document.querySelectorAll("#car-form input");

  carsTable.style.cssText = `
    display: none
  `;

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
})();
