import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack, Grid, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import Label from '../../../components/label';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  position: 'absolute',
});

export default function ProductList({ products, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products?.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <Card>
            <Box key={product.id} sx={{ pt: '100%', position: 'relative' }}>
              <Label
                variant="filled"
                color={(product.category.name.substring(0, 2) === 'Gr' && 'info') ||
                  (product.category.name.substring(0, 2) === 'Sp' && 'secondary') ||
                  (product.category.name.substring(0, 2) === 'Bo' && 'default') ||
                  (product.category.name.substring(0, 2) === 'Am' && 'primary') ||
                  (product.category.name.substring(0, 2) === 'Ba' && 'warning') ||
                  (product.category.name.substring(0, 2) === 'El' && 'success') ||
                  (product.category.name.substring(0, 2) === 'Of' && 'error') ||
                  (product.category.name.substring(0, 2) === 'Co' && 'secondary')
                }
                sx={{
                  zIndex: 9,
                  top: 16,
                  right: 16,
                  position: 'absolute',
                  textTransform: 'uppercase',
                }}
              >
                {product.category.name}
              </Label>
              <StyledProductImg alt={product.name} src={product.img} />
            </Box>

            <Stack spacing={2} sx={{ p: 3 }}>
              <Link color="inherit" underline="hover">
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h5" noWrap>
                    {product.name}
                  </Typography>

                </Box>
              </Link>
              <Typography variant='body2' >
                {product.desc.substring(0, 60)}...
              </Typography>

              <Stack direction="row" alignItems="center" justifyContent="space-between">
                {null}
              </Stack>
            </Stack>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
