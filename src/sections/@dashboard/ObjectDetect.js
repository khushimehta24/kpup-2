import { Box, Button, Grid, TextField } from '@mui/material'
import React, { useState, useEffect, useContext } from 'react'
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
import { storage } from "../../firebase/config"
import AddProduct from './app/AddProduct';
import Loader from '../../helpers/Loader';
import ObjectDetectionServices from '../../services/ObjectDetectionServices';
import ProductServices from '../../services/ProductServices';
import { kpupContext } from '../../context';

const AddBtn = {
    color: 'white', background: '#00A73C',
    fontFamily: 'Poppins', padding: '0px 2.6%'
}
function ObjectDetect() {

    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const [editSinglePerson, setEditSinglePerson] = useState('Add');
    const [load, setLoad] = useState(false)
    const { token } = useContext(kpupContext)
    const [json, setJson] = useState({
        'name': '',
        'desc': '',
        'img': '',
        'added_date': new Date(),
        'expiry_date': '',
        'category': {
            'name': ''
        },
        'costcount': (Array(Number(1)).fill("")),
    })
    const imagesListRef = ref(storage, "images/");
    const uploadFile = () => {
        setLoad(true)
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name} + ${uuidv4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then(async (url) => {
                setImageUrls(url);
                console.log(url);
                const form2Data = new FormData()
                form2Data.append('link', url);
                await ObjectDetectionServices.getObject(form2Data)
                    .then((res) => {
                        // console.log(res.data.response.name)
                        setJson({ ...json, 'name': res.data.response.name[0], 'img': url })
                        setLoad(false)
                    })
            });
        });
    };

    const addProduct = async () => {
        await ProductServices.addProducts(json, token)
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
    console.log(json);

    return (
        <>
            <Grid container>
                <Grid item md={10.75}>
                    <TextField
                        sx={{ width: '100%' }}
                        type="file"
                        onChange={(event) => {
                            setImageUpload(event.target.files[0]);
                        }}
                    />

                </Grid>
                <Button style={AddBtn} onClick={uploadFile}> Upload</Button>

            </Grid>
            {!load ? <AddProduct img={imageUrls} json={json} setJson={setJson} /> : <Grid item md={8} sx={{ width: '100%', display: 'flex', 'justifyContent': 'center', height: '400px', alignItems: 'center' }}>
                <Loader />

            </Grid>}
            <Button onClick={addProduct} sx={{ textTransform: 'none', height: '3rem', marginTop: '3%', width: '100%', ...AddBtn }} > Add Product</Button>
            {/* <input
                type="file"
                onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                }}
            />
            <button type="button" onClick={uploadFile}> Upload Image</button> */}
        </>
    )
}

export default ObjectDetect