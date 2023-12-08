import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

const getHeaders = {
  Bearer: window.localStorage.getItem("Bearer") || null,
};

const getHeadersCustomers = {
  "Bearer-customers": window.localStorage.getItem("Bearer-customers") || null,
};

export { getHeaders, getHeadersCustomers };
export default axios;
