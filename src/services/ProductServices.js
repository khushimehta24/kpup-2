import httpCommon from "../http-common";

const addProducts = async (data, token) => {
    const res = await httpCommon.post(`/warehouse/item-post/`, JSON.stringify(data), {
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return res
};

const getProducts = async (token) => {
    const res = await httpCommon.get(`/warehouse/item-list/`, {
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return res
};

export default {
    addProducts, getProducts
}