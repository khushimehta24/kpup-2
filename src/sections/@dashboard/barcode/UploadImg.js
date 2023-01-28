import { Box } from '@mui/material'
import React from 'react'
import fs from 'fs'
import ImageUploader from 'react-image-upload'
import 'react-image-upload/dist/index.css'
import BarcodeService from '../../../services/BarcodeService';

function UploadImg() {

    async function getImageFileObject(img) {
        const form2Data = new FormData()
        form2Data.append('image', img.file);
        console.log(img.file)
        await BarcodeService.getBarcode(fs.createReadStream(img.file))
            .then((res) => {
                console.log(res);
            })
            .catch((e) => {
                console.log(e)
            })
        // const res = await IpfsServices.uploadImg(form2Data, token)
        // setJson({ ...json, bannerUri: res.data.urls[0] })
        // console.log(res.data.urls[0])
        // setImgLoad(false)
    }
    function runAfterImageDelete(file) {
        console.log({ file })
    }

    return (
        <>
            <Box sx={{ display: { md: 'flex', sm: 'flex', xs: 'none' } }}> <ImageUploader
                style={{ height: '300px', width: '300px', marginBottom: '8%' }}
                onFileAdded={(img) => getImageFileObject(img)}
                onFileRemoved={(img) => runAfterImageDelete(img)} /></Box>
        </>
    )
}

export default UploadImg