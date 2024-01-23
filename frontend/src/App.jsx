import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Map from './Maps'

import Header from './components/admin/layout/Header';
import Loading from './components/Loading/Loading';

import './App.css'
import { StationContext } from './context/StationsContext';
import { ToastrContext } from './context/ToastrContext';
import Toastr from './components/toastr/Toastr';

function App() {
  const StationsDashboard = React.lazy(() => import('./pages/admin/stations/StationsDashboard'))
  const StationDetails = React.lazy(() => import('./pages/StationDetails/StationDetails'))
  const HomePage = React.lazy(() => import('./pages/client/Home/HomePage'))

  return (
    <>
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <ToastrContext>
            <StationContext>
              <Header />
              <div className="container mx-auto my-3">
                <Routes>
                  <Route path="/home" element = {< HomePage/>}/>
                  <Route path="/stations/:slug" element={<StationDetails />} />
                  <Route path="/admin">
                    <Route path="dashboard">
                      <Route path="stations" element={<StationsDashboard />} />
                    </Route>
                  </Route>
                </Routes>
              </div>
              <Toastr></Toastr>
            </StationContext>
          </ToastrContext>
        </BrowserRouter>
      </Suspense>
    </>
  )
}

export default App
