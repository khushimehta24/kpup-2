import httpCommon from "../http-common";

const login = (data) => {
    return httpCommon.post(`/login/`, data);
};

const signup = (data) => {
    return httpCommon.post(`/register/`, data);
};

export default {
    login,
    signup
}