import Axios from "axios";

const BACKEND_URL = "http://3.109.48.88:2100";
// const BACKEND_URL = "http://localhost:2100";

const jobSheetApis = {
  createNewJobSheet: async (payload) => {
    try {
      const response = await Axios.post(`${BACKEND_URL}/api/jobsheet`, payload);
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

  getServices: async () => {
    try {
      const response = await Axios.get(`${BACKEND_URL}/api/jobsheet`);
      return response.data.payload;
    } catch (err) {
      throw new Error(
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Unknown Error occured"
      );
    }
  },

  getServiceJobSheet: async (jobSheetId) => {
    try {
      const response = await Axios.get(`${BACKEND_URL}/api/jobsheet/${jobSheetId}`);      
      return response.data.payload;
    } catch (err) {
      throw new Error(
        err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : "Unknown Error occured"
      );
    }
  }
};

export default jobSheetApis;
