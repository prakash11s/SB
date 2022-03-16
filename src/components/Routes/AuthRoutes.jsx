import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "../Home/Header";
import Home from "../Home";
import BecomePartner from "../Home/BecomePartner";
import AboutUs from "../Home/AboutUs";
import TermsCondition from "../Home/TermsCondition";
import PrivacyPolicy from "../Home/PrivacyPolicy";
import ContactUs from "../Home/ContactUs";
import Footer from "../Home/Footer";
import HomeServices from "../../services/Home/Home.service";


const AuthRoutes = () => {
  const [generalSettings, setGeneralSettings] = useState([]);

  useEffect(() => {
    HomeServices.generalSettings().then((response) => {
      if (response.data.status) {
        setGeneralSettings(response.data.data);
      }
    });
  }, []);

  return (
    <>
      <Header />
      <Switch>
        <Route exact strict path="/">
          <Home generalSettings={generalSettings} />
        </Route>
        <Route path="/become_partner">
          <BecomePartner/>
        </Route>
        <Route path="/about_us/:lang?">
          <AboutUs />
        </Route>
        <Route exact path="/terms_condition/:type?/:lang?">
          <TermsCondition />
        </Route>
        <Route exact path="/privacy_policy/:lang?">
          <PrivacyPolicy />
        </Route>
        <Route exact path="/contact_us/:lang?">
          <ContactUs />
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
      <Footer generalSettings={generalSettings} />
    </>
  );
};

export default AuthRoutes;
