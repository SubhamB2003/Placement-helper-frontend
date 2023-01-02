import React, { useMemo } from 'react';
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { themeSettings } from "./theme";
import AuthPage from './pages/loginPage';
import HomePage from './pages/homePage/index';
import ProfilePage from "./pages/profilePage/index";
import UpdateProfileWidget from './widgets/UpdateProfileWidget';


function App() {

  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));


  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={isAuth ? <HomePage /> : <AuthPage />} />
            <Route path='/profile/:userId' element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />
            <Route path='/profile/update' element={isAuth && <UpdateProfileWidget />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  )
}

export default App