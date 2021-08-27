export const checkElementExists = (id) => {
  let element = document.querySelector(`#${id}`);
  return element !== null ? true : false;
};
