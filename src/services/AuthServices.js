import httpCommon from "../http-common";

const login = (data) => {
    return httpCommon.post(`/accounts/login/`, data);
};

const signup = (data) => {
    return httpCommon.post(`/accounts/register/`, data);
};

export default {
    login,
    signup
}