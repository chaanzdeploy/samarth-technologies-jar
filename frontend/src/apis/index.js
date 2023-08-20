import Axios from "axios";

const myFetch = Axios.create({
  timeout: 10000,
  headers: {
    post: { "Content-Type": "application/json", Accept: "application/json" },
  },
});

export default myFetch;
