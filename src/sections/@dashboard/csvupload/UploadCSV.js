import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";

const AddBtn = {
    color: 'white', background: '#00A73C',
    fontFamily: 'Poppins', height: '100%'
}
const UploadCSV = () => {
    const [file, setFile] = useState();

    const fileReader = new FileReader();

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
    };

    console.log(file)

    return (
        <div>
            <Grid container>
                <Grid item md={10.7}>
                    <TextField
                        sx={{ width: '100%' }}
                        type={"file"}
                        id={"csvFileInput"}
                        accept={".csv"}
                        onChange={handleOnChange}
                    />
                </Grid>
                <Grid item>
                    <Button
                        type="button"
                        onClick={(e) => {
                            handleOnSubmit(e);
                        }}
                        sx={AddBtn}
                    >
                        IMPORT CSV
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default UploadCSV