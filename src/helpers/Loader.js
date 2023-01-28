import React from 'react'
import { Box, CardMedia } from '@mui/material';
import spinner from "../images/marioloader.gif"

function Loader() {
    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CardMedia component="img" image={spinner} sx={{ height: "200px", width: "200px" }} />
        </Box>
    )
}

export default Loader