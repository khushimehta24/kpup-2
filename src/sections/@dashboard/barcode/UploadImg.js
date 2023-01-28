import { Box } from '@mui/material'
import React, { useState, useEffect } from 'react'
import fs from 'fs'
import ImageUploader from 'react-image-upload'
import { v4 as uuidv4 } from 'uuid';
import 'react-image-upload/dist/index.css'
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
} from "firebase/storage";
import { storage } from "../../../firebase/config"
import BarcodeService from '../../../services/BarcodeService';


function UploadImg() {

    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);

    const imagesListRef = ref(storage, "images/");
    const uploadFile = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name} + ${uuidv4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrls(url);
                console.log(url);
                getImageFileObject(url);
            });
        });
    };

    async function getImageFileObject(img) {
        const form2Data = new FormData()
        form2Data.append('linkFile', img);
        await BarcodeService.getBarcode(form2Data)
            .then(async (res) => {
                console.log(res);
                await BarcodeService.getBarcodeDetails(res.data.data[0].allFields[0].fieldValue)
                    .then((res) => {
                        console.log(res);
                    })
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

    // useEffect(() => {
    //     listAll(imagesListRef).then((response) => {
    //         response.items.forEach((item) => {
    //             getDownloadURL(item).then((url) => {
    //                 setImageUrls(url);
    //                 console.log(url)
    //                 getImageFileObject(url);
    //             });
    //         });
    //     });

    // }, []);

    return (
        <>
            {/* <Box sx={{ display: { md: 'flex', sm: 'flex', xs: 'none' } }}> <ImageUploader
                style={{ height: '300px', width: '300px', marginBottom: '8%' }}
                onFileAdded={uploadFile()}
                /></Box> */}

            <input
                type="file"
                onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                }}
            />
            <button type="button" onClick={uploadFile}> Upload Image</button>
        </>
    )
}

export default UploadImg