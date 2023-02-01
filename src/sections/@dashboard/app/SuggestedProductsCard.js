import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    position: 'absolute',
});

export default function SuggestedProductSCard({ name, cover, link }) {
    const navigate = useNavigate()
    return (
        <Card onClick={() => window.open(link, '_blank')} >
            <Box sx={{ pt: '100%', position: 'relative' }}>
                <StyledProductImg alt={name} src={cover} />
            </Box>

            <Stack spacing={2} sx={{ p: 3 }}>
                <Link color="inherit" underline="hover">
                    <Tooltip title={name}>
                        <Typography variant="subtitle2" noWrap>
                            {name}
                        </Typography>
                    </Tooltip>
                </Link>

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    {null}
                </Stack>
            </Stack>
        </Card>
    );
}
