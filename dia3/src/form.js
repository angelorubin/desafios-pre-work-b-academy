(function () {
  // Resolução Desafio Dia 03 - Exercício 01
  const inputName = document.querySelector("#name");

  const firstCharWordToUpperCase = (word) =>
    word.charAt(0).toUpperCase() + word.slice(1);

  const capitalizeFirstCharEachWordInString = (str) =>
    str
      .split(" ")
      .map((word) => firstCharWordToUpperCase(word))
      .join(" ");

  inputName.addEventListener(
    "input",
    (e) =>
      (inputName.value = capitalizeFirstCharEachWordInString(e.target.value))
  );

  // Resolução Desafio Dia 03 - Exercício 02
  const form = document.querySelector("#form");

  const containerColors = document.querySelector("#container-colors");
  containerColors.style.cssText = `
	height : 100px;
	padding : 2px;
	display : flex;
	margin-top : 10px;
`;

  const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#800000"];

  const select = document.createElement("select");
  select.setAttribute("multiple", "multiple");
  select.style.cssText = `
	display: flex;
	margin-top: 10px;
`;

  for (let i = 0; i < 5; i++) {
    const opt = document.createElement("option");
    opt.value = colors[i];
    opt.id = i;
    opt.textContent = "color " + i;
    select.appendChild(opt);
  }

  form.appendChild(select);

  // inputName.after(select);

  const getOptions = document.querySelectorAll("option");

  function getSelectedValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;

    for (var i = 0, iLen = options.length; i < iLen; i++) {
      opt = options[i];

      if (opt.selected) {
        result.push(opt.value || opt.text);
      }
    }
    return result;
  }

  select.addEventListener("change", (e) => {
    containerColors.innerHTML = "";
    getSelectedValues(select).map((color) => {
      const box = document.createElement("div");
      box.style.cssText = `
			height : 100px;
			width : 100px;
			background : ${color};
			margin: 2px;
		`;
      containerColors.appendChild(box);
    });
  });
})();
