import httpCommon from "../http-common";


const getCategoryList =async ()=>{
    const response = await httpCommon.get('/webscraper/departments/')
    return response
}

const getCategoryItems = async (category)=>{
    const response = await httpCommon.post(`/webscraper/items/`,{ "name" : category })
    return response
}

export default {
    getCategoryList 
    ,getCategoryItems
}