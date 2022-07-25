export const ERROR_MESSAGE = "Bad Request: Please specify address";

const axios = require("axios").default;

axios.defaults.baseURL = process.env.TRON_ENDPOINT;

export default axios;
