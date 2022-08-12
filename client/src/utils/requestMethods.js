import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;
// REACT_APP_API_URL= https://api.tabtab.link/api
// const BASE_URL = "http://192.168.0.114:4000/api";

export const httpRequest = axios.create({
  baseURL: BASE_URL,
});
