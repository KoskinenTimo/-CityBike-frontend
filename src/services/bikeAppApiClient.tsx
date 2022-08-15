import axios from "axios";

export const bikeAppApiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  responseType: "json",
  responseEncoding: "utf8",
  headers: {
    Accept: "application/json; charset=utf-8"
  }
});