import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Map from './Maps'

import Header from './components/admin/layout/Header';
import Loading from './components/Loading/Loading';

import './App.css'
import { UserContext } from './context/UserContext';
import { StationContext } from './context/StationsContext';
import { ToastrContext } from './context/ToastrContext';

import Toastr from './components/toastr/Toastr';

import AdminGuard from './services/guards/AdminGuard';
import { NoAuthGuard, AuthGuard } from './services/guards/AuthGuard';

function App() {
  const StationsDashboard = React.lazy(() => import('./pages/admin/stations/StationsDashboard'))
  const StationDashboard = React.lazy(() => import('./pages/admin/stations/StationDashboard'))

  const Login = React.lazy(() => import('./pages/auth/Login'))
  const Register = React.lazy(() => import('./pages/auth/Register'))
  const StationDetails = React.lazy(() => import('./pages/StationDetails/StationDetails'))
  const HomePage = React.lazy(() => import('./pages/client/Home/HomePage'))
  const PaymentPage = React.lazy(() => import('./pages/payment/PaymentPage'))

  return (
    <>
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <ToastrContext>
            <UserContext>
              <StationContext>
                <Header />
                <div className="container mx-auto my-3">

                  <Routes>
                    <Route path="/home" element={< HomePage />} />

                    {/* you must be logged in */}
                    <Route element={< AuthGuard />}>
                      <Route path="/stations/:slug" element={<StationDetails />} />
                      <Route path="/payment">
                        <Route path='' element={<PaymentPage />}></Route>
                      </Route>
                    </Route>

                    {/* you must not be logged in */}
                    <Route path="/auth" element={<NoAuthGuard />}>
                      <Route path="login" element={<Login />}></Route>
                      <Route path="register" element={<Register />}></Route>
                    </Route>

                    {/* you must be admin */}
                    <Route element={<AdminGuard />}>
                      <Route path="/admin">
                        <Route path="dashboard">
                          <Route path="stations">
                            <Route path="" element={<StationsDashboard />} />
                            <Route path=":slug" element={<StationDashboard />} />
                          </Route>
                        </Route>
                      </Route>
                    </Route>

                  </Routes>
                </div>
                <Toastr></Toastr>
              </StationContext>
            </UserContext>
          </ToastrContext>
        </BrowserRouter>
      </Suspense>
    </>
  )
}

export default App
