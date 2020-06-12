import axios from "axios";
const baseUrl = "https://restcountries.eu/rest/v2/all";

const getAll = () => {
  return axios.get(baseUrl);
};

export default { getAll: getAll };
