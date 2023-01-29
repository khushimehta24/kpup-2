import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
//

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { Button, CardMedia, Fab, Popover, Typography } from '@mui/material';
import Header from './header';
import Nav from './nav';
import luigi from '../../images/favicon.webp'
// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const commands = [
    {
      command: 'go to dashboard',
      callback: (navigateto) => {
        navigate(`/dashboard/${navigateto}`)
      },
    },
  ]
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands })


  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />

      <Nav openNav={open} onCloseNav={() => setOpen(false)} />

      <Main>
        <Outlet />
        <PopupState
          variant="popover"
          popupId="demo-popup-popover"
          onClick={SpeechRecognition.startListening}
        >
          {(popupState) => (
            <Button onClick={SpeechRecognition.startListening}   >
              <Fab
                sx={{
                  position: 'fixed',
                  bottom: 16,
                  right: 16,
                }}
                aria-label="ADD"
                {...bindTrigger(popupState)}
              >
                <CardMedia
                  component='img'
                  image={luigi}
                  width={50}
                  height={50}
                  onClick={SpeechRecognition.startListening}
                />
              </Fab>
              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
              >
                <Typography sx={{ p: 2 }}>
                  {transcript}
                </Typography>
              </Popover>
            </Button>
          )}
        </PopupState>
      </Main>
    </StyledRoot >
  );
}
