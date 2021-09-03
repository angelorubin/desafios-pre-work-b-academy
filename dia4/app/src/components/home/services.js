import { http } from "../../config/requests";

export async function retrieveCars() {
  return http("cars").then((cars) => cars);
}

export async function createCar(car) {
  return http.post("cars", car).then((res) => res);
}
