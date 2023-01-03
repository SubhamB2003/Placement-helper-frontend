import React, { useMemo, lazy, Suspense } from 'react';
import { CircularProgress, createTheme, CssBaseline, Stack, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { themeSettings } from "./theme";


const AuthPage = lazy(() => import('./pages/loginPage'));
const HomePage = lazy(() => import('./pages/homePage/index'));
const SavePosts = lazy(() => import('./pages/savePosts'));
const ProfilePage = lazy(() => import('./pages/profilePage/index'));
const UpdateProfileWidget = lazy(() => import('./widgets/UpdateProfileWidget'));
// import AuthPage from './pages/loginPage';
// import HomePage from './pages/homePage/index';
// import ProfilePage from './pages/profilePage/index';
// import UpdateProfileWidget from './widgets/UpdateProfileWidget';


const LoadingScreen = () => {
  return (
    <Stack alignItems="center" mt={4}>
      <CircularProgress />
    </Stack>
  )
}


function App() {

  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));


  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path='/' element={isAuth ? <HomePage /> : <AuthPage />} />
              <Route path='/profile/:userId' element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />
              <Route path='/profile/update' element={isAuth && <UpdateProfileWidget />} />
              <Route path='/user/saveposts' element={isAuth && <SavePosts />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  )
}

export default App
