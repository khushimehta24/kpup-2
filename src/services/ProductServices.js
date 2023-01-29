import httpCommon from "../http-common";

const addProducts = (data, token) => {
    return httpCommon.post(`/warehouse/item-post/`, data, {
        "headers": {
            "Authorization": `Token ${token}`,
        }
    });
};

export default {
    addProducts
}