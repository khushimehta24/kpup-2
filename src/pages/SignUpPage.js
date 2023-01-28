import { styled } from '@mui/material/styles';
import { Link, Container, Typography, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// hooks
// sections
import SignUpForm from '../sections/auth/signup/SignUpForm';
import useResponsive from '../hooks/useResponsive';
import luigi from '../images/luigi.png'

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const StyledSection = styled('div')(({ theme }) => ({
    width: '100%',
    maxWidth: 480,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow: theme.customShadows.card,
    backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function SignUpPage() {
    const mdUp = useResponsive('up', 'md');
    const navigate = useNavigate()
    return (
        <>

            <StyledRoot>


                {mdUp && (
                    <StyledSection>
                        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                            Hi, Good to see you
                        </Typography>
                        <CardMedia component='img' image={luigi} alt="login" />
                    </StyledSection>
                )}

                <Container maxWidth="sm">
                    <StyledContent>
                        <Typography variant="h4" gutterBottom>
                            Sign up to K-PUP WMS
                        </Typography>

                        <Typography variant="body2" sx={{ mb: 5 }}>
                            Already have an account? {''}
                            <Link variant="subtitle2" sx={{ cursor: 'pointer' }} onClick={() => navigate('/login')}>Login</Link>
                        </Typography>
                        <SignUpForm />
                    </StyledContent>
                </Container>
            </StyledRoot>
        </>
    );
}
