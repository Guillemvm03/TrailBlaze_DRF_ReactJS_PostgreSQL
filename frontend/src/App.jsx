import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Loading from "./components/Loading/Loading";
import Sidebar from "./components/layout/Sidebar";

import "./App.css";
import { UserContext } from "./context/UserContext";
import { StationContext } from "./context/StationsContext";
import { ToastrContext } from "./context/ToastrContext";
import { NotificationsContext } from "./context/NotificationsContext";

import Toastr from "./components/toastr/Toastr";
import { BikesContext } from "./context/BikesContext";

import AdminGuard from "./services/guards/AdminGuard";
import { NoAuthGuard, AuthGuard } from "./services/guards/AuthGuard";

import { SlotsContext } from "./context/SlotsContext";

function App() {
  const StationsDashboard = React.lazy(() =>
    import("./pages/admin/stations/StationsDashboard")
  );
  const StationDashboard = React.lazy(() =>
    import("./pages/admin/stations/StationDashboard")
  );
  const BikesDashboard = React.lazy(() =>
    import("./pages/admin/bikes/BikesDashboard")
  );
  const NotificationDashboard = React.lazy(() =>
    import("./pages/admin/notifications/NotificationDashboard")
  );

  const Login = React.lazy(() => import("./pages/auth/Login"));
  const Register = React.lazy(() => import("./pages/auth/Register"));
  const ProfilePage = React.lazy(() =>
    import("./pages/client/Profile/ProfilePage")
  );
  const StationDetails = React.lazy(() =>
    import("./pages/StationDetails/StationDetails")
  );
  const HomePage = React.lazy(() => import("./pages/client/Home/HomePage"));
  const AdminPage = React.lazy(() => import("./pages/admin/AdminPage"));
  const PaymentPage = React.lazy(() => import("./pages/payment/PaymentPage"));
  const ContactUs = React.lazy(() => import("./pages/contact/ContactUs"));
  const PricingPage = React.lazy(() => import("./pages/payment/PricingPage"));

  return (
    <>
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <ToastrContext>
            <UserContext>
              <StationContext>
                <NotificationsContext>
                  <SlotsContext>
                    <BikesContext>
                      <Routes>
                        <Route path="/admin/*" element={<Sidebar />} />
                        <Route path="/*" element={<Header />} />
                      </Routes>
                      <div className="container mx-auto my-3">
                        <Routes>
                          <Route path="/" element={<HomePage />} />
                          <Route path="/home" element={<HomePage />} />

                          {/* you must be logged in */}
                          <Route element={<AuthGuard />}>
                            <Route
                              path="/stations/:slug"
                              element={<StationDetails />}
                            />
                            <Route path="/pricing" element={<PricingPage />} />
                            {/* <Route path="/profile" element={<ProfilePage />} /> */}
                            <Route path="/payment">
                              <Route path="" element={<PaymentPage />}></Route>
                              <Route
                                path=":amount"
                                element={<PaymentPage />}
                              ></Route>
                            </Route>
                            <Route path="/profile" element={<ProfilePage />} />
                            <Route path="/contactus" element={<ContactUs />} />
                          </Route>

                          {/* you must not be logged in */}
                          <Route path="/auth" element={<NoAuthGuard />}>
                            <Route path="login" element={<Login />}></Route>
                            <Route
                              path="register"
                              element={<Register />}
                            ></Route>
                          </Route>

                          {/* you must be admin */}
                          <Route element={<AdminGuard />}>
                            <Route path="/admin">
                              <Route path="dashboard">
                                <Route path="stations">
                                  <Route
                                    path=""
                                    element={<StationsDashboard />}
                                  />
                                  <Route
                                    path=":slug"
                                    element={<StationDashboard />}
                                  />
                                </Route>
                                <Route path="bikes">
                                  <Route path="" element={<BikesDashboard />} />
                                </Route>
                                <Route path="notifications">
                                  <Route
                                    path=""
                                    element={<NotificationDashboard />}
                                  />
                                </Route>
                              </Route>
                            </Route>
                          </Route>
                        </Routes>
                      </div>
                      <Toastr></Toastr>
                    </BikesContext>
                  </SlotsContext>
                </NotificationsContext>
              </StationContext>
            </UserContext>
          </ToastrContext>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
