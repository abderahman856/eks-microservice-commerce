import axios from "axios";

export const API = {
  auth: "http://localhost:3001",
  product: "http://localhost:3002",
  cart: "http://localhost:3003",
  order: "http://localhost:3004"
};

export const authHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const authClient = axios.create({ baseURL: API.auth });
export const productClient = axios.create({ baseURL: API.product });
export const cartClient = axios.create({ baseURL: API.cart });
export const orderClient = axios.create({ baseURL: API.order });
