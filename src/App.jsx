
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// import Dashboard from './pages/Dashboard'
// import Bookings  from './pages/Bookings'
// import Cabins  from './pages/Cabins'
// import Users  from './pages/Users'
// import Settings  from './pages/Settings'
// import  Account from './pages/Account'
// import  Guests from './pages/Guests'
// import Checkin from './pages/Checkin'
// import Booking from './pages/Booking'
// import  Login from './pages/Login'
// import  PageNotFound from './pages/PageNotFound'
// import Spinner from './ui/Spinner'
import GlobalStyles from './styles/globalStyles'
import AppLayout from './ui/AppLayout'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './ui/ProtectedRoute'
import { DarkModeProvider } from './context/DarkModeContext'

import {lazy, Suspense} from 'react'
import Logo from './ui/Logo'
import styled from 'styled-components'

const StyledLogo=styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`

const Dashboard = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import('./pages/Dashboard')), 400);
  });
});

const Bookings = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import('./pages/Bookings')), 400);
  });
});

const Booking = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import('./pages/Booking')), 400);
  });
});

const Checkin = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import('./pages/Checkin')), 400);
  });
});

const Cabins = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import('./pages/Cabins')), 400);
  });
});

const Users = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import('./pages/Users')), 400);
  });
});

const Settings = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import('./pages/Settings')), 400);
  });
});

const Account = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import('./pages/Account')), 400);
  });
});

const Guests = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import('./pages/Guests')), 400);
  });
});

const Login = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import('./pages/Login')), 400);
  });
});

const PageNotFound = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import('./pages/PageNotFound')), 400);
  });
});


const queryClient =new QueryClient({
 defaultOptions:{
    queries:{
      staleTime:0,
    }
 }
})

const App = () => {
  return (
    <DarkModeProvider>


    <QueryClientProvider client={queryClient}>
     <ReactQueryDevtools/>

    <GlobalStyles/>
    <BrowserRouter>
    <Suspense fallback={<StyledLogo><Logo/></StyledLogo>}>
    

    <Routes>
      <Route element={
        <ProtectedRoute>
        <AppLayout/>
      </ProtectedRoute>
    }>

      <Route index element={<Navigate replace to='dashboard'/>}/>
      <Route path='dashboard' element={<Dashboard/>}/>
      <Route path='bookings' element={<Bookings/>}/>
      <Route path='bookings/:bookingId' element={<Booking/>}/>
      <Route path='checkin/:bookingId' element={<Checkin/>}/>
      <Route path='cabins' element={<Cabins/>}/>
      <Route path='users' element={<Users/>}/>
      <Route path='settings' element={<Settings/>}/>
      <Route path='account' element={<Account/>}/>
      <Route path='guests' element={<Guests/>}/>
      </Route>
      
      <Route path='login' element={<Login/>}/>
      <Route path='*' element={<PageNotFound/>}/>

    </Routes>
        </Suspense>
    </BrowserRouter>
    
    <Toaster 
    position='top-center'
    gutter={12}
    containerStyle={{margin:"8px"}}
    toastOptions={{
      success:{
        duration:3000
      },
      error:{
        duration:4000
      },
      style:{
        fontSize:"16px",
        maxWidth:"500px",
        padding:"16px 24px",
        backgroundColor:"var(--color-grey-0)",
        color:"var(--color-grey-700)"
      },
    }}
    
    />


    </QueryClientProvider>
    </DarkModeProvider>

  )
}

export default App

