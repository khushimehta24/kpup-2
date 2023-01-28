import httpCommon from "../http-common";

const getBarcode = (data) => {
    console.log(data)
    return httpCommon.post('https://qr-code-and-barcode-scanner.p.rapidapi.com/ScanCode', data, {
        headers: {
            'X-RapidAPI-Key': '69aa88bb0cmsh1f88160eee96bb6p1d6fd9jsnc858731d86cb',
            'X-RapidAPI-Host': 'qr-code-and-barcode-scanner.p.rapidapi.com',
        }
    });
};



export default {
    getBarcode
}