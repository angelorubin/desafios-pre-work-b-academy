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
  (e) => (inputName.value = capitalizeFirstCharEachWordInString(e.target.value))
);
