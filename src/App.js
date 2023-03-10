// routes
import { useContext, useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { kpupContext } from './context';
import 'react-toastify/dist/ReactToastify.css';
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import './App.css'
import TruffleInit from './truffle';

export default function App() {
  const [category, setCategory] = useState(null)
  const [token, setToken] = useState(null)

  const [user, setUser] = useState(null)

  const [account, setAccount] = useState(null)


  const context = { user, setUser, token, setToken, category, setCategory, account, setAccount };
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("kpupUser")))
    setToken(localStorage.getItem("kpupToken"))
    // setAccount(JSON.parse(localStorage.getItem("kpupAccount")))
  }, [])
  return (
    <kpupContext.Provider value={context}>
      <ThemeProvider>
        <TruffleInit />
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <ScrollToTop />
        <StyledChart />
        <Router />
      </ThemeProvider>
    </kpupContext.Provider>
  );
}
