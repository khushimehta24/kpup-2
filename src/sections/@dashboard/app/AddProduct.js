import { Box, Grid, TextField, Button, Paper, Select, MenuItem } from '@mui/material'
import React, { useState, useEffect } from 'react'
import ImageUploader from 'react-image-upload'
import { v4 as uuidv4 } from 'uuid';
import 'react-image-upload/dist/index.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
} from "firebase/storage";
import { storage } from "../../../firebase/config"
import BarcodeService from '../../../services/BarcodeService';
import SuggestedProducts from '../../../services/SuggestedProducts';

const AddBtn = {
    color: 'white', height: '80%', alignItems: 'center', background: '#00A73C',
    fontFamily: 'Poppins',
}
const textField = { width: '100%' };

function AddProduct({ img, json, setJson }) {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            background: '#00A73C',
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: '#F1F1F1',
        },
        '&:nth-of-type(even)': {
            backgroundColor: '#EBEBEB',
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));


    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const [editSinglePerson, setEditSinglePerson] = useState('Add');
    const [categoryList, setCategoryList] = useState([])
    const [categoryValue, setCategoryValue] = useState(1)
    const [categoryItems, setCategoryItems] = useState(null)
    const [loading, setLoading] = useState(false)
    const date = new Date()
    const [allCostCount, setAllCostCount] = useState([])
    const [costCount, setCostCount] = useState({ cost: '', count: '', selling: '' })
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setJson({ ...json, [name]: value });
    }
    useEffect(() => {
        SuggestedProducts.getCategoryList()
            .then((res) => {
                setCategoryList(res.data)
                const final = res.data.map((item) =>
                    item.name
                )
                setCategoryList(final)

            })

    }, [])
    const handleChangeCostCount = (e) => {
        const name = e.target.name
        const value = e.target.value
        setCostCount({ ...costCount, [name]: value })
    }

    // const handleCategory = (e) => {
    //     const value = e.target.value;
    //     setJson({
    //         ...json, 'category': {
    //             'name': value
    //         }
    //     })
    // }

    const addToList = (e) => {
        e.preventDefault();
        if (costCount.cost && costCount.cost) {
            const newCostCount = { ...costCount };
            setAllCostCount([...allCostCount, newCostCount]);
            setCostCount({ cost: '', count: '', selling: '' })
            setJson({ ...json, 'costcount': [...allCostCount, newCostCount] })

            setEditSinglePerson('Add');
        }
    }
    console.log(json)

    const deletePerson = (id) => {
        const newList = allCostCount.filter((singleItems) => singleItems.dummyId !== id);
        setAllCostCount(newList);
    }


    const editPerson = (id) => {
        setEditSinglePerson('Edit');
        const filtered = allCostCount.filter(filterItem => filterItem.dummyId !== id);
        const selected = allCostCount.find(findItem => findItem.dummyId === id);
        console.log(selected);
        setCostCount({ cost: selected.cost, count: selected.count, selling: selected.selling })
        setAllCostCount(filtered);
    }
    return (
        <>
            <Grid item container sx={{ overflow: 'scroll', "&::-webkit-scrollbar": { display: 'none' } }} >
                <Grid item md={12} />
                <Grid container columnSpacing={3} sx={{ marginTop: '2%' }}>
                    <Grid item md={6} xs={12}>
                        <p style={{ fontSize: '12px' }}>Product Name</p>
                        <TextField required value={json.name} sx={textField} name='name' placeholder='Enter Product Name' id='name' onChange={handleChange} />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <p style={{ fontSize: '12px', marginTop: '2%' }}>Category</p>
                        <Select
                            id="demo-simple-select"
                            value={categoryValue}
                            onChange={(e) => {
                                setCategoryValue(e.target.value)
                                setJson({
                                    ...json, 'category': {
                                        'name': categoryList[e.target.value]
                                    }
                                })
                            }}
                            sx={{ width: '100%' }}
                        >
                            {
                                categoryList.map((item, key) => (
                                    <MenuItem key={key} value={key}>{item}</MenuItem>
                                ))
                            }
                        </Select>
                        {/* <TextField required value={json.category.name} sx={textField} name='name' placeholder="Enter Category" id='name' onChange={handleCategory} /> */}
                    </Grid>
                </Grid>
                <Grid container columnSpacing={3} >
                    <Grid item md={12} xs={12}>
                        <p style={{ fontSize: '12px', marginTop: '3%' }}>Expiry Date</p>
                        <TextField required value={json.expiry_date} InputProps={{ inputProps: { min: date } }} sx={textField} name='expiry_date' type='date' id='expiry_date' onChange={handleChange} />
                    </Grid>
                </Grid>


                <p style={{ fontSize: '12px', marginTop: '3%' }}>Description</p>
                <TextField multiline rows={4} required value={json.desc} sx={textField} name='desc' placeholder="Enter Description" id='desc' onChange={handleChange} />
                <Grid container spacing={3} columns={12} sx={{ marginTop: '1%' }}>
                    <Grid item md={3} xs={12}>
                        <TextField margin="normal" sx={{ width: '95%', fontFamily: 'Readex Pro, sans-serif' }} required id="cost" label="Cost" name="cost" value={costCount.cost} onChange={handleChangeCostCount} />
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <TextField margin="normal" sx={{ width: '95%', fontFamily: 'Readex Pro, sans-serif' }} required id="count" label="Count" name="count" value={costCount.count} onChange={handleChangeCostCount} />
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <TextField margin="normal" sx={{ width: '95%', fontFamily: 'Readex Pro, sans-serif' }} required id="selling" label="Selling Price" name="selling" value={costCount.selling} onChange={handleChangeCostCount} />
                    </Grid>
                    <Grid item md={3} mt={2} xs={12} >
                        <Button onClick={addToList} style={AddBtn} sx={{ width: '100%', backgroundColor: '#E02768' }}>{editSinglePerson}</Button>
                    </Grid>
                </Grid>
                <Grid item md={12}>
                    {allCostCount.length !== 0 ? <> <p style={{ fontFamily: 'Readex Pro, sans-serif', fontWeight: '800', color: '#454C59' }}>Varieties you added</p>

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell style={{ fontWeight: 'bolder' }}>Cost</StyledTableCell>
                                        <StyledTableCell align="right" style={{ fontWeight: 'bolder' }}>Count</StyledTableCell>
                                        <StyledTableCell align="right" style={{ fontWeight: 'bolder' }}>Selling Price</StyledTableCell>
                                        <StyledTableCell align="right" style={{ fontWeight: 'bolder' }}>Edit Options</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {allCostCount.map((costCount) => (
                                        <StyledTableRow key={costCount.dummyId}>
                                            <StyledTableCell component="th" scope="row">
                                                {costCount.cost}
                                            </StyledTableCell>
                                            <StyledTableCell align='right'>{costCount.count}</StyledTableCell>
                                            <StyledTableCell align='right'>{costCount.selling}</StyledTableCell>
                                            <StyledTableCell align="right">
                                                <Grid container style={{ display: 'flex', columnGap: '2%', justifyContent: 'flex-end' }}>

                                                    <Grid item>
                                                        <DeleteIcon style={{ cursor: 'pointer', color: '#B5DD43' }} onClick={() => deletePerson(costCount.dummyId)} />
                                                    </Grid>
                                                    <Grid item>
                                                        <EditIcon style={{ cursor: 'pointer', color: '#DD4343' }} onClick={() => editPerson(costCount.dummyId)} />
                                                    </Grid>
                                                </Grid>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer> </> : ''}
                </Grid>
            </Grid>
        </>
    )
}

export default AddProduct