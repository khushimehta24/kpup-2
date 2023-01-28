import httpCommon from "../http-common";


const getCategoryList =async ()=>{
    const response = await httpCommon.get('/webscraper/departments/')
    return response
}

export default {
    getCategoryList
}