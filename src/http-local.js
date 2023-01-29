import axios from "axios";


export default axios.create({
    baseURL: "http://127.0.0.1:8000",

    headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
    },
    mode: "cors"
});