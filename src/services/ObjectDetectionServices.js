import httpLocal from "../http-local";

const getObject = (data) => {
    return httpLocal.post('/fruits/', data);
};

export default {
    getObject
}