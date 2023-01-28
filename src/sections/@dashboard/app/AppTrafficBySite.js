import { useState, useEffect } from 'react';
// @mui
import PropTypes from 'prop-types';
import { Box, Card, Paper, Typography, CardHeader, CardContent, InputLabel, MenuItem, Select, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';
import { fShortenNumber } from '../../../utils/formatNumber';
import SuggestedProducts from '../../../services/SuggestedProducts';
import SuggestedProductsCard from './SuggestedProductsCard';
// import errorHandler from "../../../helpers/errorHandler"
import spinner from "../../../images/marioloader.gif"
import Loader from '../../../helpers/Loader';
// ----------------------------------------------------------------------

AppTrafficBySite.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppTrafficBySite({ title, subheader, list, ...other }) {

  const StyledProductImg = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
  });

  const [categoryList, setCategoryList] = useState([])
  const [categoryValue, setCategoryValue] = useState(1)
  const [categoryItems, setCategoryItems] = useState(null)
  const [loading, setLoading] = useState(false)
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

  useEffect(() => {
    setLoading(true)
    SuggestedProducts.getCategoryItems(categoryList[categoryValue]).then((res) => {
      console.log(res.data)
      setCategoryItems(res.data)
      setLoading(false)
    }).catch((e) => {
      // errorHandler(e.message)
      console.log(e.message)
    }
    )

  }, [categoryValue, categoryList])

  return (
    <>
      <Card sx={{ width: '100%' }} {...other}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignContent: 'center' }}>
          <CardHeader title={title} subheader={subheader} />
          <Box sx={{ paddingRight: 3, paddingTop: 3 }}>
            <Select
              id="demo-simple-select"
              value={categoryValue}
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
          {loading ?
            <>
              <Loader />
            </>
            :
            <>
              <Box
                sx={{
                  display: 'grid',
                  gap: 2,
                  gridTemplateColumns: { md: 'repeat(4, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                {categoryItems?.map((item) => (
                  <>
                    <SuggestedProductsCard name={item.name} cover={item.img} />
                  </>
                ))}
              </Box></>}
        </CardContent>
      </Card>
    </>
  );
}
