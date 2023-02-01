import httpCommon from "../http-common";

const getBarcode = (data) => {
    console.log(data)
    return httpCommon.post('https://qr-code-and-barcode-scanner.p.rapidapi.com/ScanCode', data, {
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '596b4a1785msh0e93b212eef6330p1512e4jsnd48ee83fc2ac',
            'X-RapidAPI-Host': 'qr-code-and-barcode-scanner.p.rapidapi.com'
        }
    });
};

const getBarcodeDetails = (value) => {
    console.log(value)
    return httpCommon.get("https://barcode-lookup.p.rapidapi.com/v3/products",
        {
            params: { barcode: value },
            headers: {
                'X-RapidAPI-Key': '1f33786e09msh6106b29575ccba1p125dd8jsn2bfa5c10745b',
                'X-RapidAPI-Host': 'barcode-lookup.p.rapidapi.com'
            }
        })
}

export default {
    getBarcode,
    getBarcodeDetails,
}