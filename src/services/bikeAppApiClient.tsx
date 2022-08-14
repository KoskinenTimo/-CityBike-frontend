import axios from "axios";

export const bikeAppApiClient = axios.create({
  baseURL: 'http://localhost:8080'
});