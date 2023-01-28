import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Box, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import successHandler from '../../../helpers/successHandler';
import errorHandler from "../../../helpers/errorHandler"
import AuthServices from '../../../services/AuthServices';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false)

  const [showPassword, setShowPassword] = useState(false);
  const [json, setJson] = useState({
    email: '',
    password: ''
  })

  const handleClick = async () => {
    setLoad(true)
    await AuthServices.login(json)
      .then((res) => {
        console.log(res);
        localStorage.setItem("kpupToken", res.data)
        setLoad(false)
        successHandler("Login Successful")
        navigate('/dashboard');
      })
      .catch((e) => {
        console.log(e)
        errorHandler("e.message")
      })
  };


  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setJson({ ...json, [name]: value });
  }
  console.log(json)

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" value={json.email} id='password' onChange={handleChange} />

        <TextField
          name="password"
          label="Password"
          value={json.password} id='password' onChange={handleChange}
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
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      {!load ? <LoadingButton onClick={handleClick} fullWidth size="large" type="submit" variant="contained">
        Login
      </LoadingButton> : <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress sx={{ backgroundColor: '#2065D1', color: 'white', padding: '5px', borderRadius: '50%' }} />
      </Box>}
    </>
  );
}