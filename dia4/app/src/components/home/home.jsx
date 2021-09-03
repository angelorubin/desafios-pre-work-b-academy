import { useState } from "react";
import * as S from "./header";
import { createCar } from "./services";

export default function Home() {
  const [] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    // carsTable.style.cssText = `display: none`;

    const carForm = document.querySelector("#car-form");

    const formData = new FormData(carForm);

    const fields = Object.fromEntries(formData);

    createCar(fields)
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
  };

  return (
    <S.Container>
      <S.Content>
        <div className="modal-button">
          <a data-modal="modal-one">Open Modal</a>
        </div>

        <div className="modal" id="modal-one">
          <div className="modal-bg modal-exit"></div>
          <div className="modal-container">
            <h3>Mensagem de Erro</h3>
            <button className="modal-close modal-exit">X</button>
          </div>
        </div>

        <div id="container" className="container">
          <h2>Cadastrar Carro</h2>
          <form id="car-form" className="car-form">
            <input
              className="car-form__input"
              placeholder="url imagem"
              name="url"
              id="url"
            />
            <input
              className="car-form__input"
              placeholder="marca/modelo"
              name="brandModel"
              id="brandModel"
            />
            <input
              className="car-form__input"
              placeholder="ano"
              name="year"
              id="year"
            />
            <input
              className="car-form__input"
              placeholder="placa"
              name="plate"
              id="plate"
            />
            <input
              className="car-form__input"
              placeholder="cor"
              name="color"
              id="color"
            />
            <button
              onClick={handleSubmit}
              type="submit"
              className="car-form__btn"
              id="car-form__btn"
            >
              cadastrar
            </button>
          </form>
          <table id="cars-table">
            <thead>
              <tr>
                <th>Imagem Carro</th>
                <th>Marca/Modelo</th>
                <th>Ano</th>
                <th>Placa</th>
                <th>Cor</th>
              </tr>
            </thead>
          </table>
        </div>
      </S.Content>
    </S.Container>
  );
}
