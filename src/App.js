import { CircularProgress, createTheme, CssBaseline, Stack, ThemeProvider } from "@mui/material";
import React, { lazy, Suspense, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SharePost from './pages/Share';
import { themeSettings } from "./theme";


const AuthPage = lazy(() => import('./pages/loginPage'));
const HomePage = lazy(() => import('./pages/homePage/index'));
const SavePosts = lazy(() => import('./pages/savePosts'));
const ProfilePage = lazy(() => import('./pages/profilePage/index'));
const UpdateProfileWidget = lazy(() => import('./widgets/UpdateProfileWidget'));



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
              <Route path='/profile/update' element={isAuth ? <UpdateProfileWidget /> : <Navigate to="/" />} />
              <Route path='/user/saveposts' element={isAuth ? <SavePosts /> : <Navigate to="/" />} />
              <Route path='/sharepost/:postId' element={<SharePost />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  )
}

export default App
