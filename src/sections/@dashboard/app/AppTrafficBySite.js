import { useState, useEffect } from 'react';
// @mui
import PropTypes from 'prop-types';
import { Box, Card, Paper, Typography, CardHeader, CardContent, InputLabel, MenuItem, Select } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import SuggestedProducts from '../../../services/SuggestedProducts';
// ----------------------------------------------------------------------

AppTrafficBySite.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};



export default function AppTrafficBySite({ title, subheader, list, ...other }) {
  const [categoryList, setCategoryList] = useState([])
  const [categoryValue, setCategoryValue] = useState(1)
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

  return (
    <Card sx={{ width: '100%' }} {...other}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignContent: 'center' }}>
        <CardHeader title={title} subheader={subheader} />
        <Box>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={categoryValue}
            label="Age"
            onChange={(e) => setCategoryValue(e.target.value)}
          >
            {
              categoryList.map((item, key) => (
                <MenuItem key={key} value={key}>{item}</MenuItem>
              ))
            }
          </Select>
        </Box>
      </Box>


      <CardContent>
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: 'repeat(2, 1fr)',
          }}
        >
          {list.map((site) => (
            <Paper key={site.name} variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
              <Box sx={{ mb: 0.5 }}>{site.icon}</Box>

              <Typography variant="h6">{fShortenNumber(site.value)}</Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {site.name}
              </Typography>
            </Paper>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
