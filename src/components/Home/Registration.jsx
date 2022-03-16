import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import { Formik } from "formik";
import Select from "react-select";
import Cleave from "cleave.js/react";

import { schema } from "../../validation/signup";
import SocialLogin from "./SocialLogin";
import {
  socialRegisterCancel,
  register,
} from "../../store/action/Auth/auth.action";
import {
  LOGIN_SOCIAL_TYPE,
  LOGIN_NORMAL_TYPE,
  PROVIDER_TYPE,
  REGEX,
  SERVICE_LOCATIONS,
  VERIFICATION_TYPE,
  CUSTOM_SELECT_STYLE,
  MAX_CHAR_LIMIT
} from "../../utility/constants";
import Loader from "../Common/Loader";

const Registration = ({ openLoginModal, openVerifyEmailModal, toggleLocationModal, selectedAddress }) => {
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();
  const ref = React.useRef();
  const [isLoading, setIsLoading] = useState(false);
  const { isSocialUser, socialUser } = useSelector((state) => state.auth);

  const [terms, setTerms] = useState(false);

  const handleSubmit = (registrationData) => {
    setIsLoading(true);
    dispatch(register(registrationData))
      .then((response) => {
        setIsLoading(false);
        if (response.status) {
          openVerifyEmailModal(response.email, VERIFICATION_TYPE.ACCOUNT);
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    return () => {
      dispatch(socialRegisterCancel());
    };
  }, []);

  return (
    <>
      <Formik
        enableReinitialize={false}
        initialValues={{
          name: isSocialUser ? socialUser._profile.name : "",
          email: isSocialUser ? socialUser._profile.email : "",
          mobile_number: "",
          fantasy_name: "",
          company_name: "",
          invented_name: "",
          password: "",
          provider_type: PROVIDER_TYPE.CPF,
          cpf_no: "",
          date_of_birth: "",
          pix_number: "",
          address: '',
          login_type: isSocialUser ? LOGIN_SOCIAL_TYPE : LOGIN_NORMAL_TYPE,
          social_media_type: isSocialUser && socialUser._provider,
          social_media_id: isSocialUser && socialUser._profile.id,
          service_location: [],
          language: i18n.language,
          latitude: '',
          longitude:  '',
        }}
        validationSchema={schema}
        validate={(values) => {
          const errors = {};
          if (!isSocialUser) {
            if (values.password) {
              if (!REGEX.PASSWORD.test(values.password)) {
                errors.password = t("PWD_VALID");
              }
            } else {
              errors.password = t("PWD_REQ");
            }
          }
          if (values.provider_type === PROVIDER_TYPE.CPF) {
            if (!values.date_of_birth) {
              errors.date_of_birth = t("DOB_REQ");
            }
            if (!values.invented_name) {
              errors.invented_name = t("INVENTED_NAME_REQ");
            } else if (values.invented_name.length >= MAX_CHAR_LIMIT) {
              errors.invented_name = t("MAX_CHAR_LIMIT_50");
            }
          } else {
            if (!values.company_name) {
              errors.company_name = t("COMPANY_NAME_REQ");
            } else if (values.company_name.length >= MAX_CHAR_LIMIT) {
              errors.company_name = t("MAX_CHAR_LIMIT_50");
            }
            values.date_of_birth = "";
            values.invented_name = "";
          }
          if (!values.pix_number) {
            errors.pix_number = t("PIX_REQ");
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="modal-body">
              <div className="account-registration signup-form">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="front-profile">
                      <input
                        className="custom-form-control form-control-lg"
                        type="text"
                        name="name"
                        placeholder={t("FULL_NAME")}
                        onBlur={handleBlur}
                        value={values.name}
                        onChange={handleChange}
                      />
                      <span className="form-icon">
                        <img
                          src={`assets/img/ic_user_secondary.png`}
                          alt="FB"
                        />
                      </span>
                    </div>
                    <span className="error_">
                      {errors.name && touched.name && t(errors.name)}
                    </span>
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="provider_type"
                      id="cpf"
                      onBlur={handleBlur}
                      value={PROVIDER_TYPE.CPF}
                      checked={values.provider_type === PROVIDER_TYPE.CPF}
                      onChange={(e) => {
                        setFieldValue("provider_type", e.target.value);
                        ref.current.focus();
                      }}
                    />
                    <label className="form-check-label" htmlFor="cpf">
                      {t("CPF")}
                    </label>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="provider_type"
                      id="cnpj"
                      onBlur={handleBlur}
                      value={PROVIDER_TYPE.CNPJ}
                      checked={values.provider_type === PROVIDER_TYPE.CNPJ}
                      onChange={(e) => {
                        setFieldValue("provider_type", e.target.value);
                        ref.current.focus();
                      }}
                    />
                    <label className="form-check-label" htmlFor="cnpj">
                      {t("CNPJ")}
                    </label>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="front-profile">
                      <input
                        className="custom-form-control form-control-lg"
                        type="text"
                        name="fantasy_name"
                        placeholder={t("FANTASY_NAME")}
                        onBlur={handleBlur}
                        value={values.fantasy_name}
                        onChange={handleChange}
                      />
                      <span className="form-icon">
                        <img
                          src={`assets/img/ic_fantacy_name_secondary.png`}
                          alt="FB"
                        />
                      </span>
                    </div>
                    <span className="error_">
                      {errors.fantasy_name &&
                        touched.fantasy_name &&
                        t(errors.fantasy_name)}
                    </span>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="front-profile">

                      <Cleave
                        className="custom-form-control form-control-lg"
                        type="text"
                        name="cpf_no"
                        htmlRef={hRef => (ref.current = hRef)}
                        key={values.provider_type === PROVIDER_TYPE.CPF ? "cpf.true" : "cpf.false"}
                        value={values.cpf_no}
                        placeholder={
                          values.provider_type === PROVIDER_TYPE.CPF
                            ? t("CPF_NO")
                            : t("CNPJ_NO")
                        }
                        options={{
                          numericOnly: true,
                          delimiters: values.provider_type === PROVIDER_TYPE.CPF ? [".", ".", "-"] : [".", ".", "/", "-"],
                          blocks: values.provider_type === PROVIDER_TYPE.CPF ? [3, 3, 3, 2] : [2, 3, 3, 4, 2],
                        }}
                        onFocus={handleBlur}
                        onChange={handleChange}
                      />
                      <span className="form-icon">
                        <img
                          src={`assets/img/ic_cpf_secondary.png`}
                          alt="FB"
                        />
                      </span>
                    </div>
                    <label className="col-form-label">
                      {values.provider_type === PROVIDER_TYPE.CPF
                        ? t("CPF_NO_FORMAT")
                        : t("CNPJ_NO_FORMAT")}
                    </label>
                    <span className="error_">
                      {errors.cpf_no && touched.cpf_no && t(errors.cpf_no)}
                    </span>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="front-profile">
                      <input
                        className="custom-form-control form-control-lg"
                        type="text"
                        name="company_name"
                        placeholder={t("COMPANY_NAME")}
                        onBlur={handleBlur}
                        value={values.company_name}
                        onChange={handleChange}
                      />
                      <span className="form-icon">
                        <img
                          src={`assets/img/ic_company_name_secondary.png`}
                          alt="FB"
                        />
                      </span>
                    </div>
                    <span className="error_">
                      {errors.company_name &&
                        touched.company_name &&
                        t(errors.company_name)}
                    </span>
                  </div>
                  {values.provider_type === PROVIDER_TYPE.CPF && (
                    <div className="col-md-6 mb-3">
                      <div className="front-profile">
                        <input
                          className="custom-form-control form-control-lg"
                          type="text"
                          name="invented_name"
                          placeholder={t("INVENTED_NAME")}
                          onBlur={handleBlur}
                          value={values.invented_name}
                          onChange={handleChange}
                        />
                        <span className="form-icon">
                          <img
                            src={`assets/img/ic_company_name_secondary.png`}
                            alt="FB"
                          />
                        </span>
                      </div>
                      <span className="error_">
                        {errors.invented_name &&
                          touched.invented_name &&
                          errors.invented_name}
                      </span>
                    </div>
                  )}
                  <div className="col-md-6 mb-3">
                    <div className="front-profile">
                      <input
                        className="custom-form-control form-control-lg"
                        type="email"
                        name="email"
                        placeholder={t("EMAIL")}
                        onBlur={handleBlur}
                        value={values.email}
                        onChange={handleChange}
                      />
                      <span className="form-icon">
                        <img
                          src={`assets/img/ic_email_secondary.png`}
                          alt="FB"
                        />
                      </span>
                    </div>
                    <span className="error_">
                      {errors.email && touched.email && t(errors.email)}
                    </span>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="front-profile">
                      <input
                        className="custom-form-control form-control-lg"
                        type="number"
                        name="mobile_number"
                        placeholder={t("MOBILE_NUMBER")}
                        onBlur={handleBlur}
                        value={values.mobile_number}
                        onChange={handleChange}
                      />
                      <span className="form-icon">
                        <img
                          src={`assets/img/ic_flag_brazil.png`}
                          alt="FB"
                        />
                      </span>
                    </div>
                    <span className="error_">
                      {errors.mobile_number &&
                        touched.mobile_number &&
                        t(errors.mobile_number)}
                    </span>
                  </div>
                  {!isSocialUser && (
                    <div className="col-md-6 mb-3">
                      <div className="front-profile">
                        <input
                          className="custom-form-control form-control-lg"
                          type="password"
                          name="password"
                          placeholder={t("PASSWORD")}
                          onBlur={handleBlur}
                          value={values.password}
                          onChange={handleChange}
                        />
                        <span className="form-icon">
                          <img
                            src={`assets/img/ic_password_secondary.png`}
                            alt="FB"
                          />
                        </span>
                      </div>
                      <span className="error_">
                        {errors.password && touched.password && errors.password}
                      </span>
                    </div>
                  )}
                  <div className="col-md-6 mb-3">
                    <Select
                      placeholder={t("SERVICE_LOCATION")}
                      isMulti
                      onChange={(option) => {
                        setFieldValue("service_location", option);
                      }}
                      value={values.service_location}
                      styles={CUSTOM_SELECT_STYLE}
                      options={SERVICE_LOCATIONS}
                    />
                    <span className="error_">
                      {errors.service_location &&
                        touched.service_location &&
                        t(errors.service_location)}
                    </span>
                  </div>
                  {values.provider_type === PROVIDER_TYPE.CPF && (
                    <div className="col-md-6 mb-3">
                      <div className="front-profile">
                        <DatePicker
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          className="custom-form-control form-control-lg"
                          dateFormat="yyyy-MM-dd"
                          name="date_of_birth"
                          maxDate={new Date()}
                          placeholderText={t("DOB")}
                          selected={values.date_of_birth}
                          onChange={(e) => {
                            setFieldValue("date_of_birth", e);
                          }}
                        ></DatePicker>
                        <span className="form-icon">
                          <img
                            src={`assets/img/ic_dob_calendar_secondary.png`}
                            alt="FB"
                          />
                        </span>
                      </div>
                      <span className="error_">
                        {errors.date_of_birth &&
                          touched.date_of_birth &&
                          errors.date_of_birth}
                      </span>
                    </div>
                  )}
                  <div className="col-md-6 mb-3">
                      <div className="front-profile">
                        <input
                          className="custom-form-control form-control-lg"
                          type="text"
                          name="pix_number"
                          placeholder={t("PIX_NUMBER")}
                          onBlur={handleBlur}
                          value={values.pix_number}
                          onChange={handleChange}
                        />
                        <span className="form-icon">
                          <img
                            src={`assets/img/ic_cpf_secondary.png`}
                            alt="FB"
                          />
                        </span>
                      </div>
                      <span className="error_">
                        {errors.pix_number &&
                          touched.pix_number &&
                          errors.pix_number}
                      </span>
                    </div>
                  <div className="col-md-12 mb-3">
                    <div className="front-profile">
                      <input
                        className="custom-form-control form-control-lg"
                        type="text"
                        name="address"
                        placeholder={t("ADDRESS")}
                        onBlur={handleBlur}
                        value={ selectedAddress?.address ? values.address = selectedAddress?.address : values.address }
                        onChange={handleChange}
                        onFocus={toggleLocationModal}
                        onClick={toggleLocationModal}
                      />
                      <input type="hidden" name="latitude" value={ selectedAddress?.latitude ? selectedAddress?.latitude : values.latitude }/>
                      <input type="hidden" name="longitude" value={ selectedAddress?.longitude ? selectedAddress?.longitude : values.longitude }/>
                      <span className="form-icon" onClick={toggleLocationModal}>
                        <img
                          src={`assets/img/ic_address_secondary.png`}
                          alt="FB"
                        />
                      </span>
                    </div>
                    <span className="error_">
                      {errors.address && touched.address && t(errors.address)}
                    </span>
                  </div>
                  <div className="checked-tc col-md-12 mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="terms"
                      id="terms"
                      checked={terms}
                      onChange={() => {
                        setTerms(!terms);
                      }}
                    />
                    <label className="form-check-label" htmlFor="terms">
                      {t("TERM_CONDITION")}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={openLoginModal} className="btn back-to-login">
                {t("BACK_TO_LOGIN")}
              </button>
              <button
                type="submit"
                className="btn signin-btn"
                disabled={terms ? false : true}
              >
                {isLoading ? <Loader type="dots" /> : t("SIGN_IN")}
              </button>
            </div>
          </form>
        )}
      </Formik>
      <div className="social-register">
        <SocialLogin />
      </div>
    </>
  );
};

export default Registration;
