import httpCommon from "../http-common";

const postSchedule = async (data, token) => {
    console.log(data)
    const res = await httpCommon.post('/schedule/note/', data, {
        "headers": {
            "Authorization": `Token ${token}`,
            'Content-Type': 'application/json',
        },
    })
    return res;
}

const getSchedule = async (token) => {
    const res = await httpCommon.get('/schedule/note/', {
        "headers": {
            "Authorization": `Token ${token}`,
            'Content-Type': 'application/json',
        },
    })
    return res;
}

export default {
    postSchedule, getSchedule
}