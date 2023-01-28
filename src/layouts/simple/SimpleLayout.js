import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { CardMedia } from '@mui/material';
// components
import logo from "../../images/logo.png"
// ----------------------------------------------------------------------

const StyledHeader = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0),
  },
}));

// ----------------------------------------------------------------------

export default function SimpleLayout() {
  return (
    <>
      <StyledHeader>
        <Box sx={{ py: 3, display: 'inline-flex', justifyContent: 'center' }}>
          <CardMedia component='img' image={logo} sx={{ width: '40%' }} />
        </Box>
      </StyledHeader>

      <Outlet />
    </>
  );
}
