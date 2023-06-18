import axios from "axios";

export const paypalAxios = axios.create({
  baseURL: 'https://api-m.sandbox.paypal.com',
  headers: { "Content-Type": 'application/json' }
})

export const paypalAxiosWithAccessToken = (accessToken: string) => axios.create({
  baseURL: 'https://api-m.sandbox.paypal.com',
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": 'application/json',
  }
})