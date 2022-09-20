import { checkResponse } from "./utils";
import { apiConfig } from "./constants";
export const baseUrl = apiConfig.baseUrl;
const headers = {
  "Content-Type": "application/json",
};

export const signup = ({ email, password }) => {
  return fetch(`${baseUrl}signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, password }),
  })
    .then((res) => checkResponse(res))
}

export const signin = ({ email, password }) => {
  return fetch(`${baseUrl}signin`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, password }),
    credentials: "include",
  })
    .then((res) => checkResponse(res))
}

export const getContent = () => {
  return fetch(`${baseUrl}users/me`, {
    method: 'GET',
    headers,
    credentials: "include",
  })
    .then((res) => checkResponse(res))
}
