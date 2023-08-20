import Axios from "axios";

const BACKEND_URL = "http://3.109.48.88:2100";
// const BACKEND_URL = "http://localhost:2100";

const customerAPIs = {
  getAllCustomers: async () => {
    try {
      const response = await Axios.get(`${BACKEND_URL}/api/customers`);
      return response.data.payload;
    } catch (err) {
      throw new Error(
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Unknown Error occured"
      );
    }
  },

  getCustomer: async (customerId) => {
    try {
      const response = await Axios.get(`${BACKEND_URL}/api/customers/${customerId}`);
      return response.data.payload;
    } catch (err) {
      throw new Error(
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Unknown Error occured"
      );
    }
  },

  searchCustomers: async (searchType, searchTerm) => {
    try {
      const response = await Axios.get(
        `${BACKEND_URL}/api/customers/search?type=${searchType}&searchTerm=${searchTerm}`
      );
      return response.data.payload;
    } catch (err) {
      throw new Error(
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Unknown Error occured"
      );
    }
  },

  creatNewCustomer: async (payload) => {
    try {
      const response = await Axios.post(`${BACKEND_URL}/api/customers`, payload);
      return response.data.payload;
    } catch (err) {
      console.error("Error payload: ", err.response.data.payload);
      throw new Error(
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Unknown Error occured"
      );
    }
  },

  updateCustomer: async (customerId, payload) => {
    try {
      const response = await Axios.put(`${BACKEND_URL}/api/customers/${customerId}`, payload);
      return response.data.payload;
    } catch (err) {
      console.error("Error payload: ", err.response.data.payload);
      throw new Error(
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Unknown Error occured"
      );
    }
  },
};

export default customerAPIs;
