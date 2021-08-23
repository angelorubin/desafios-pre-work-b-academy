import { http } from "./config";

// get all cars
export const getCars = async () => {
  return http.get("cars").then((cars) => cars.data);
};
