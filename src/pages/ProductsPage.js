import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useContext } from 'react';
// @mui
import { Container, Stack, Typography, Button } from '@mui/material';
import Iconify from '../components/iconify';
// components
import { ProductSort, ProductList, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import ProductService from "../services/ProductServices"
import { kpupContext } from '../context';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const { token } = useContext(kpupContext)
  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const call = async () => {
      await ProductService.getProducts(token)
        .then((res) => {
          console.log(res.data.response)
          setProducts(res.data.response)
        })
    }
    call();
  }, [])

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Products
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Product
          </Button>
        </Stack>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <ProductList products={products && products} />
        {/* <ProductCartWidget /> */}
      </Container>
    </>
  );
}
