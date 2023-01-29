import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CSVUploadPage from '../../../pages/CSVUploadPage';
import BarcodePage from '../../../pages/BarcodePage';
import ObjectDetection from '../../../pages/ObjectDetection';

export default function LabTabs() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Scan Barcode" value="1" />
                        <Tab label="Object Detection" value="2" />
                        <Tab label="Upload CSV" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <BarcodePage />
                </TabPanel>
                <TabPanel value="2"><ObjectDetection /></TabPanel>
                <TabPanel value="3"><CSVUploadPage /></TabPanel>
            </TabContext>
        </Box>
    );
}