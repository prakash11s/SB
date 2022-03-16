import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { useHistory } from "react-router-dom";

import {
  CUSTOM_SELECT_STYLE,
  PROVIDER_TYPE,
  SERVICE_LOCATIONS,
  MAX_CHAR_LIMIT,
} from "../../utility/constants";
import { schema } from "../../validation/signup";
import {
  updateProfile,
  updateProfilePhoto,
} from "../../store/action/Auth/auth.action";
import Loader from "../Common/Loader";
import ModalHOC from "../Common/Modal";
import GooglePlaces from "../Common/GooglePlaces";

const ProfileUpdate = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const logoInputRef = useRef(null);
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({
    address: user?.address,
    latitude: "",
    longitude: "",
  });
  const [logo, setLogo] = useState(user?.provider_info?.logo_path);
  
  const toggleLocationModal = () => {
    setIsLocationOpen(!isLocationOpen);
  };
  const handleSubmit = (profileData) => {
    setIsLoading(true);
    dispatch(updateProfile(profileData))
      .then((response) => {
        setIsLoading(false);
        if (response.status) {
          history.replace("/profile");
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };
  const handleFileUpload = (event) => {
    let profile =
      event.target.files.length > 0 ? event.target.files[0] : undefined;
    if (profile !== undefined) {
      setLogo(URL.createObjectURL(profile));
      const formData = new FormData();
      formData.append("profile_photo", profile);
      const headersProps = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      dispatch(updateProfilePhoto(formData, headersProps));
    }
  };
  return (
    <>
      {isLocationOpen && (
        <ModalHOC
          isModalOpen={isLocationOpen}
          toggleModal={toggleLocationModal}
          children={
            <GooglePlaces
              toggleLocationModal={toggleLocationModal}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
          }
        />
      )}
      <div className="app-content pt-3 p-md-3 p-lg-4">
        <div className="container-xl">
          {/* <h1 className="app-page-title">Settings</h1> */}
          <h2 className="app-page-title">{t("MANAGE_PROFILE")}</h2>
          <hr className="mb-4" />
          <div className="row g-4 settings-section">
            <div className="col-12 col-md-12">
              <div className="app-card app-card-settings shadow-sm p-4">
                <div className="app-card-body">
                  <Formik
                    enableReinitialize
                    initialValues={{
                      name: user ? user?.name : "",
                      email: user ? user?.email : "",
                      mobile_number: user ? user?.mobile_number : "",
                      fantasy_name: user
                        ? user?.provider_info?.fantacy_name
                        : "",
                      company_name: user
                        ? user?.provider_info?.company_name
                        : "",
                      invented_name: user
                        ? user?.provider_info?.invented_name
                        : "",
                      provider_type: user ? user?.provider_type : "",
                      cpf_no: user ? user?.cpf_no : "",
                      date_of_birth: user ? new Date(user?.date_of_birth) : "",
                      language: user ? user?.language : "",
                      pix_number: user ? user?.provider_info?.pix_number : "",
                      address: selectedAddress.address
                        ? selectedAddress.address
                        : "",
                      description: user ? user?.provider_info?.description : "",
                      service_location: user
                        ? (user?.provider_info?.service_location)
                            .split(",")
                            .map((el, i) => {
                              return SERVICE_LOCATIONS.filter((location) => location.value === el)[0]
                            })
                        : "",
                      latitude: selectedAddress.latitude
                        ? selectedAddress.latitude
                        : user?.provider_info?.latitude,
                      longitude: selectedAddress.longitude
                        ? selectedAddress.longitude
                        : user?.provider_info?.longitude,
                    }}
                    validationSchema={schema}
                    validate={(values) => {
                      const errors = {};
                      if (values.provider_type === PROVIDER_TYPE.CPF) {
                        if (!values.date_of_birth) {
                          errors.date_of_birth = t("DOB_REQ");
                        }
                        if (!values.invented_name) {
                          errors.invented_name = t("INVENTED_NAME_REQ");
                        } else if (
                          values.invented_name.length >= MAX_CHAR_LIMIT
                        ) {
                          errors.invented_name = t("MAX_CHAR_LIMIT_50");
                        }
                        values.company_name = "";
                      } else {
                        if (!values.company_name) {
                          errors.company_name = t("COMPANY_NAME_REQ");
                        } else if (
                          values.company_name.length >= MAX_CHAR_LIMIT
                        ) {
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
                      isSubmitting,
                    }) => (
                      <form onSubmit={handleSubmit} className="settings-form">
                        <div className="row">
                          <div className="mb-3 col-md-12">
                            <input
                              type="file"
                              accept="image/png, image/jpg, image/jpeg"
                              ref={logoInputRef}
                              style={{ display: "none" }}
                              name="profile_image"
                              onChange={handleFileUpload}
                            />
                            <img
                              onClick={() => logoInputRef.current.click()}
                              src={logo}
                              alt="Company Logo"
                              style={{
                                width: 100,
                                height: 100,
                                padding: 2,
                                border: "1px solid #ced4da",
                                borderRadius: "7px",
                              }}
                            />
                          </div>
                          <div className="mb-3 col-md-6">
                            <label htmlFor="name" className="form-label">
                              {t("FULL_NAME")}
                            </label>
                            <div className="update-profile">
                              <input
                                className="custom-form-control form-control-lg"
                                type="text"
                                name="name"
                                id="name"
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
                          <div className="mb-3 col-md-6">
                            <label htmlFor="cpf_no" className="form-label">
                              {values.provider_type === PROVIDER_TYPE.CPF
                                ? t("CPF_NO")
                                : t("CNPJ_NO")}
                            </label>
                            <div className="update-profile">
                              <input
                                className="custom-form-control form-control-lg"
                                type="text"
                                name="cpf_no"
                                id="cpf_no"
                                placeholder={
                                  values.provider_type === PROVIDER_TYPE.CPF
                                    ? t("CPF_NO")
                                    : t("CNPJ_NO")
                                }
                                onBlur={handleBlur}
                                value={values.cpf_no}
                                onChange={handleChange}
                                disabled="disabled"
                              />
                              <span className="form-icon">
                                <img
                                  src={`assets/img/ic_cpf_secondary.png`}
                                  alt="FB"
                                />
                              </span>
                            </div>
                          </div>
                          <div className="mb-3 col-md-6">
                            <label htmlFor="email" className="form-label">
                              {t("Email")}
                            </label>
                            <div className="update-profile">
                              <input
                                className="custom-form-control form-control-lg"
                                type="email"
                                name="email"
                                id="email"
                                placeholder={t("EMAIL")}
                                onBlur={handleBlur}
                                value={values.email}
                                onChange={handleChange}
                                disabled="disabled"
                              />
                              <span className="form-icon">
                                <img
                                  src={`assets/img/ic_email_secondary.png`}
                                  alt="FB"
                                />
                              </span>
                            </div>
                          </div>
                          <div className="mb-3 col-md-6">
                            <label
                              htmlFor="fantasy_name"
                              className="form-label"
                            >
                              {t("FANTASY_NAME")}
                            </label>
                            <div className="update-profile">
                              <input
                                className="custom-form-control form-control-lg"
                                type="text"
                                name="fantasy_name"
                                id="fantasy_name"
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
                          <div className="mb-3 col-md-6">
                            <label
                              htmlFor="company_name"
                              className="form-label"
                            >
                              {t("COMPANY_NAME")}
                            </label>
                            <div className="update-profile">
                              <input
                                className="custom-form-control form-control-lg"
                                type="text"
                                name="company_name"
                                id="company_name"
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
                              <label
                                htmlFor="company_name"
                                className="form-label"
                              >
                                {t("INVENTED_NAME")}
                              </label>
                              <div className="update-profile">
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
                          <div className="mb-3 col-md-6">
                            <label
                              htmlFor="mobile_number"
                              className="form-label"
                            >
                              {t("MOBILE_NUMBER")}
                            </label>
                            <div className="update-profile">
                              <input
                                className="custom-form-control form-control-lg"
                                type="number"
                                name="mobile_number"
                                id="mobile_number"
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
                          {values.provider_type === PROVIDER_TYPE.CPF && (
                            <div className="mb-3 col-md-6">
                              <label
                                htmlFor="date_of_birth"
                                className="form-label"
                              >
                                {t("DOB")}
                              </label>
                              <div className="update-profile">
                                <DatePicker
                                  peekNextMonth
                                  showMonthDropdown
                                  showYearDropdown
                                  dropdownMode="select"
                                  className="custom-form-control form-control-lg"
                                  dateFormat="yyyy-MM-dd"
                                  name="date_of_birth"
                                  id="date_of_birth"
                                  maxDate={new Date()}
                                  placeholderText={t("DOB")}
                                  selected={values.date_of_birth}
                                  onChange={(e) => {
                                    setFieldValue("date_of_birth", e);
                                  }}
                                  withPortal
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
                          <div className="mb-3 col-md-6">
                            <label className="form-label">
                              {t("SERVICE_LOCATION")}
                            </label>
                            <Select
                              isMulti
                              onChange={(option) => {
                                setFieldValue("service_location", option);
                              }}
                              value={values.service_location}
                              styles={CUSTOM_SELECT_STYLE}
                              options={SERVICE_LOCATIONS}
                            />
                            {errors.service_location &&
                              touched.service_location &&
                              t(errors.service_location)}
                          </div>
                          <div className="mb-3 col-md-6">
                            <label htmlFor="pix_number" className="form-label">
                              {t("PIX_NUMBER")}
                            </label>
                            <div className="update-profile">
                              <input
                                className="custom-form-control form-control-lg"
                                type="text"
                                name="pix_number"
                                id="pix_number"
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
                          <div className="mb-3 col-md-12">
                            <label htmlFor="address" className="form-label">
                              {t("ADDRESS")}
                            </label>
                            <div className="update-profile">
                              <input
                                className="custom-form-control form-control-lg"
                                type="text"
                                name="address"
                                id="address"
                                placeholder={t("ADDRESS")}
                                onBlur={handleBlur}
                                value={values.address}
                                onChange={handleChange}
                                onFocus={toggleLocationModal}
                                onClick={toggleLocationModal}
                              />
                              <span
                                className="form-icon"
                                onClick={toggleLocationModal}
                              >
                                <img
                                  src={`assets/img/ic_address_secondary.png`}
                                  alt="FB"
                                />
                              </span>
                            </div>
                            <span className="error_">
                              {errors.address &&
                                touched.address &&
                                t(errors.address)}
                            </span>
                          </div>
                        </div>
                        <div className="mb-3 col-md-12">
                          <label className="form-label">
                            {t("DESCRIPTION")}
                          </label>
                          <textarea
                            className="custom-form-control form-control-lg"
                            rows="3"
                            name="description"
                            placeholder={t("DESCRIPTION")}
                            onBlur={handleBlur}
                            value={values.description}
                            onChange={handleChange}
                          />
                          <span className="error_text">
                            {errors.description &&
                              touched.description &&
                              t(errors.description)}
                          </span>
                        </div>
                        <button type="submit" className="btn app-btn-primary">
                          {isLoading ? <Loader type="dots" /> : t("SAVE")}
                        </button>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-4" />
        </div>
      </div>
    </>
  );
};

export default ProfileUpdate;
