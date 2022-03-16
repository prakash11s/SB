import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";

import Dashboard from "../Dashboard";
import Profile from "../Common/Profile";
import ProfileUpdate from "../Common/ProfileUpdate";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import Menubar from "../Common/Menubar";
import Setup from "../Setup/index";
import SetupHeader from "../Setup/SetupHeader";
import PageNotFound from "../Common/PageNotFound";
import "../../style/css/portal.css";
import Wallet from "../Wallet/index";
import Withdrawal from "../Withdrawal/index";
import Booking from "../Dashboard/Booking";
import BookingDetails from "../Dashboard/BookingDetails";
import Transaction from "../Dashboard/Transaction";
import Services from "../Service";
import { default as ServiceDetails } from "../Service/Details";
import { default as CreateService } from "../Service/Create";
import { default as UpdateService } from "../Service/Update";
import Professionals from "../Professional";
import { default as ProfessionalDetails } from "../Professional/Details";
import { default as CreateProfessional } from "../Professional/Create";
import { default as UpdateProfessional } from "../Professional/Update";
import Promocode from "../Promocode";
import { default as CreatePromocode } from "../Promocode/Create";
import { default as PromocodeDetails } from "../Promocode/Details";
import { default as UpdatePromocode } from "../Promocode/Update";
import Schedule from "../Common/Schedule";
import ChangePassword from "../Common/ChangePassword";

const WebRoutes = () => {
  const defaultStep = useSelector(
    (state) => state.auth?.user?.provider_info?.professional
  );
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const toggleIsSideMenuOpenModal = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const history = useHistory();
  useEffect(() => {
    if (defaultStep === 0 || defaultStep === undefined) {
      history.replace("/setup");
    } else {
      //history.replace("/dashboard");
    }
  }, []);

  return (
    <>
      {(defaultStep === 0 || defaultStep === undefined) ? (
        <>
          <header className="app-header fixed-top">
            <SetupHeader />
          </header>
          <Switch>
            <Route exact path="/setup">
              <Setup />
            </Route>
            <Route>
              {/* <PageNotFound /> */}
              <Redirect to="/dashboard" />
            </Route>
          </Switch>
        </>
      ) : (
        <>
          <header className="app-header">
            <Menubar isSideMenuOpen={isSideMenuOpen} toggleIsSideMenuOpenModal={toggleIsSideMenuOpenModal} />
            <Header toggleIsSideMenuOpenModal={toggleIsSideMenuOpenModal} />            
          </header>
          <div className="app-wrapper">
            <Switch>
              <Route exact path="/dashboard">
                <Dashboard />
              </Route>
              <Route exact path="/profile">
                <Profile />
              </Route>
              <Route exact path="/profile_update">
                <ProfileUpdate />
              </Route>
              <Route exact path="/change_password">
                <ChangePassword/>
              </Route>
              <Route exact path="/wallet">
                <Wallet />
              </Route>
              <Route exact path="/withdrawal">
                <Withdrawal />
              </Route>
              <Route exact path="/booking">
                <Booking />
              </Route>
              <Route exact path="/booking_details">
                <BookingDetails />
              </Route>
              <Route exact path="/transaction">
                <Transaction />
              </Route>
              <Route exact path="/services">
                <Services />
              </Route>
              <Route exact path="/service_details">
                <ServiceDetails />
              </Route>
              <Route exact path="/add_service">
                <CreateService />
              </Route>
              <Route exact path="/update_service">
                <UpdateService />
              </Route>
              <Route exact path="/professionals">
                <Professionals />
              </Route>
              <Route exact path="/professional_details">
                <ProfessionalDetails />
              </Route>
              <Route exact path="/add_professional">
                <CreateProfessional />
              </Route>              
              <Route exact path="/update_professional">
                <UpdateProfessional />
              </Route>
              <Route exact path="/promocode">
                <Promocode />
              </Route>
              <Route exact path="/promocode_details">
                <PromocodeDetails />
              </Route>
              <Route exact path="/add_promocode">
                <CreatePromocode />
              </Route>
              <Route exact path="/update_promocode">
                <UpdatePromocode />
              </Route>
              <Route exact path="/schedule">
                <Schedule isSetup={false} />
              </Route>
              <Route>
                <Redirect to="/dashboard" />
              </Route>
              <Footer />
            </Switch>
          </div>
        </>
      )}
    </>
  );
};

export default WebRoutes;
