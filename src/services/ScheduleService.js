import httpCommon from "../http-common";

const postSchedule = async (data,token) => {
    console.log(data)
    const res = await httpCommon.post('/schedule/create_note/', data, {
        "headers": {
            "Authorization": `Token ${token}`,
        },
    })
    return res;
}

export default {
    postSchedule,
}