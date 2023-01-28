import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Grid, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/system';
import successHandler from '../../../helpers/successHandler';
import errorHandler from "../../../helpers/errorHandler"
import AuthServices from '../../../services/AuthServices';
// components
import Iconify from '../../../components/iconify';
import UserServices from '../../../services/UserServices';
import { kpupContext } from '../../../context';
// ----------------------------------------------------------------------

export default function SignUpForm() {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [json, setJson] = useState({
    email: '',
    password: '',
    name: '',
    confirm_password: '',
    phone_no: ''
  })
  const { token, setToken, user, setUser } = useContext(kpupContext)

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setJson({ ...json, [name]: value });
  }
  console.log(json)

  const handleClick = async () => {
    setLoad(true)
    await AuthServices.signup(json)
      .then(async (res) => {
        console.log(res);
        localStorage.setItem("kpupToken", res.data)
        setToken(res.data)
        setLoad(false)
        await UserServices.getUserDetails(res.data)
          .then((res) => {
            setUser(res.data)
            localStorage.setItem("kpupUser", JSON.stringify(res.data))
            console.log(res.data)
            successHandler("Login Successful")
            navigate('/dashboard');
          })
      })
      .catch((e) => {
        console.log(e)
        errorHandler("e.message")
      })
  };

  return (
    <>
      <Stack spacing={3}>
        <Grid container spacing={2} >
          <Grid item md={12} sx={{ width: '100%' }}>
            <TextField name="name" label="Name" sx={{ width: '100%' }} value={json.name} id='name' onChange={handleChange} />
          </Grid>
          <Grid item md={6} sx={{ width: '100%' }}>
            <TextField name="phone_no" label="Phone Number" sx={{ width: '100%' }} value={json.phone_no} id='phone_no' onChange={handleChange} />
          </Grid>
          <Grid item md={6} sx={{ width: '100%' }}>
            <TextField name="email" label="Email address" sx={{ width: '100%' }} value={json.email} id='email' onChange={handleChange} />
          </Grid>
          <Grid item md={6}>
            <TextField
              name="password"
              label="Password" sx={{ width: '100%' }}
              type={showPassword ? 'text' : 'password'}
              value={json.password} id='password' onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              name="confirm_password"
              value={json.confirm_password} id='confirm_password' onChange={handleChange}
              label="Confirm Password" sx={{ width: '100%' }}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>


      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Keep me signed in
        </Link>
      </Stack>

      {!load ? <LoadingButton onClick={handleClick} fullWidth size="large" type="submit" variant="contained">
        Sign Up
      </LoadingButton> : <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress sx={{ backgroundColor: '#2065D1', color: 'white', padding: '5px', borderRadius: '50%' }} />
      </Box>}
    </>
  );
}
