import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import Cleave from "cleave.js/react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { Link } from "react-router-dom";

import { schema } from "../../validation/professional";
import Loader from "../Common/Loader";
import { CUSTOM_SELECT_STYLE } from "../../utility/constants";
import ModalHOC from "../Common/Modal";
import ProfessionalTimeslot from "./ProfessionalTimeslot";

const Form = ({
  inNew,
  isLoading,
  prevStep,
  expertise,
  handleSubmit,
  slots,
  setSlots,
  timeSlotError,
  professionalDetails,
  priceMinValidation
}) => {

  const { t } = useTranslation();

  const [isTimeSlot, setIsTimeSlot] = useState(false);
  const portfolioInputRef = useRef(null);

  const handleFileUpload = (event) => {
    let profile =
      event.target.files.length > 0 ? event.target.files[0] : undefined;
    if (profile !== undefined) {
      setPortfolio(URL.createObjectURL(profile));
    }
  };
  const toggleTimeSlotModal = () => {
    setIsTimeSlot(!isTimeSlot);
  };
  
  const selectedExpertise = professionalDetails ? professionalDetails?.expertise?.split(",") : [];
  const [portfolio, setPortfolio] = useState(`assets/img/ic_upload.png`);
  
  useEffect(() => {
    setPortfolio(professionalDetails ? professionalDetails?.profile_photo_path :`assets/img/ic_upload.png`);
  }, [professionalDetails])

  return (
    <>
      <div className="app-card-body">
        <h2 className="title mb-2 mt-0">{ inNew ? t('ADD_PROFESSIONAL') : t('EDIT_PROFESSIONAL')}</h2>
        <span className="subtitle">{t("FILL_PROFESSIONAL")}</span>
        <br />
        <br />
        <Formik
          initialValues={{
            name: professionalDetails ? professionalDetails?.name : "",
            email: professionalDetails ? professionalDetails?.email : "",
            mobile_number: professionalDetails ? professionalDetails?.mobile_number : "",
            cpf_no: professionalDetails ? professionalDetails?.cpf_no : "",
            professional_price: professionalDetails ? professionalDetails?.professional_price : "",
            avg_experience: professionalDetails ? professionalDetails?.avg_experience : "",
            gain: professionalDetails ? professionalDetails?.gain : "",
            expertise_id: expertise.filter((el) => selectedExpertise.includes(el.label)),
            description: professionalDetails ? professionalDetails?.description : "",
            tag: professionalDetails ? professionalDetails?.tag?.split(",").map((el) => {
              return {
                label: el,
                value: el,
              };
            })
          : [],
            period: professionalDetails ? professionalDetails?.period : "",
            day_off: "",
            profile_photo: professionalDetails ? professionalDetails?.profile_photo_path : "",
          }}
          validationSchema={schema}
          enableReinitialize
          validateOnChange
          onSubmit={(values) => handleSubmit(values)}
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
            <form
              className="settings-form"
              autoComplete="off"
            >
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label className="form-label">{t("FULL_NAME")}</label>
                  <div className="professional_form">
                    <input
                      className="custom-form-control form-control-lg"
                      type="text"
                      name="name"
                      value={values.name}
                      placeholder={t("FULL_NAME")}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <span className="form-icon">
                      <img src={`assets/img/ic_user_secondary.png`} alt="FB" />
                    </span>
                    <span className="error_text">
                      {errors.name && touched.name && t(errors.name)}
                    </span>
                  </div>
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">{t("CPF_NO")}</label>
                  <div className="professional_form">
                    <Cleave
                      className="custom-form-control form-control-lg"
                      type="text"
                      name="cpf_no"
                      value={values.cpf_no}
                      placeholder={t("CPF_NO")}
                      options={{
                        numericOnly: true,
                        delimiters: [".", ".", "-"],
                        blocks: [3, 3, 3, 2],
                      }}
                      onFocus={handleChange}
                      onChange={handleChange}
                    />

                    <span className="form-icon">
                      <img src={`assets/img/ic_cpf_secondary.png`} alt="FB" />
                    </span>
                    <span className="error_text">
                      {errors.cpf_no && touched.cpf_no && t(errors.cpf_no)}
                    </span>
                  </div>
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">{t("EMAIL")}</label>
                  <div className="professional_form">
                    <input
                      className="custom-form-control form-control-lg"
                      type="text"
                      name="email"
                      value={values.email}
                      placeholder={t("EMAIL")}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <span className="form-icon">
                      <img src={`assets/img/ic_email_secondary.png`} alt="FB" />
                    </span>
                    <span className="error_text">
                      {errors.email && touched.email && t(errors.email)}
                    </span>
                  </div>
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">{t("MOBILE_NUMBER")}</label>
                  <div className="professional_form">
                    <input
                      className="custom-form-control form-control-lg"
                      type="text"
                      name="mobile_number"
                      value={values.mobile_number}
                      placeholder={t("MOBILE_NUMBER")}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <span className="form-icon">
                      <img src={`assets/img/ic_flag_brazil.png`} alt="FB" />
                    </span>
                    <span className="error_text">
                      {errors.mobile_number &&
                        touched.mobile_number &&
                        t(errors.mobile_number)}
                    </span>
                  </div>
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">{t("PRICE")}</label>
                  <div className="professional_form">
                    <input
                      className="custom-form-control form-control-lg"
                      type="text"
                      name="professional_price"
                      value={values.professional_price}
                      placeholder={t("PRICE")}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <span className="form-icon">
                      <img src={`assets/img/ic_value_secondary.png`} alt="FB" />
                    </span>
                    {priceMinValidation ? <span className="text-danger">{priceMinValidation}</span> : ""}
                    <span className="error_text">
                      {errors.professional_price &&
                        touched.professional_price &&
                        t(errors.professional_price)}
                    </span>
                  </div>
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">{t("AVG_EXPERIENCE")}</label>
                  <div className="professional_form">
                    <input
                      className="custom-form-control form-control-lg"
                      type="text"
                      name="avg_experience"
                      value={values.avg_experience}
                      placeholder={t("AVG_EXPERIENCE")}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <span className="form-icon">
                      <img src={`assets/img/ic_customer_1.png`} alt="FB" />
                    </span>
                    <span className="error_text">
                      {errors.avg_experience &&
                        touched.avg_experience &&
                        t(errors.avg_experience)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label className="form-label">{t("GAIN")}</label>
                  <div className="professional_form">
                    <input
                      className="custom-form-control form-control-lg"
                      type="text"
                      name="gain"
                      value={values.gain}
                      placeholder={t("GAIN")}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <span className="form-icon">
                      <img
                        src={`assets/img/ic_percent_secondary.png`}
                        alt="FB"
                      />
                    </span>
                    <span className="error_text">
                      {errors.gain && touched.gain && t(errors.gain)}
                    </span>
                  </div>
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">{t("TAG")}</label>
                  <CreatableSelect
                    isClearable
                    isMulti
                    onChange={(option) => {
                      setFieldValue("tag", option);
                    }}
                    value={values.tag}
                    styles={CUSTOM_SELECT_STYLE}
                    options={values.tag}
                  />
                </div>
              </div>
              <div className="row">
                <div className="mb-3 col-md-12">
                  <label className="form-label">{t("ADD_EXPERTISE")}</label>
                  <Select
                    isMulti
                    onChange={(option) => {
                      setFieldValue("expertise_id", option);
                    }}
                    value={values.expertise_id}
                    styles={CUSTOM_SELECT_STYLE}
                    options={expertise}
                  />
                  <span className="error_text">
                    {errors.expertise_id &&
                      touched.expertise_id &&
                      t(errors.expertise_id)}
                  </span>
                </div>
                <div className="mb-3 col-md-12">
                  <label className="form-label">{t("DESCRIPTION")}</label>
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
              </div>
              <div className="row">
                <div className="mb-3 col-md-12">
                  <h2 htmlFor="name" className="title mb-2">
                    {t("PORTFOLIO_IMAGE")}
                  </h2>
                  <span className="subtitle d-block mb-3">
                    {t("LOGO_TEXT")}
                  </span>
                  <input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    ref={portfolioInputRef}
                    style={{ display: "none" }}
                    name="profile_photo"
                    onChange={(event) => {
                      handleFileUpload(event);
                      setFieldValue("profile_photo", event.target.files[0]);
                    }}
                  />
                  <img
                    onClick={() => portfolioInputRef.current.click()}
                    src={portfolio}
                    alt="Portfolio Image"
                    style={{
                      width: 100,
                      height: 100,
                      border: "1px solid #ced4da",
                      borderRadius: "7px",
                      padding: 2,
                      cursor: "pointer",
                    }}
                  />
                  <span className="error_text">
                    {errors.service_image_primary &&
                      touched.service_image_primary &&
                      t(errors.service_image_primary)}
                  </span>
                </div>
              </div>
              <div>
                <a onClick={toggleTimeSlotModal} className="addslot-link">
                  + {t("ADD_SLOTS")}
                </a>
                <br></br>
                {timeSlotError ? <span className="text-danger">{timeSlotError}</span> : ""}
              </div>
              <div className="row justify-content-between">
                <div className="col-auto">
                  { prevStep ? prevStep && <button
                    onClick={prevStep}
                    type="button"
                    className="btn skip-btn app-btn-secondary"
                  >
                    {t("PREV")}
                  </button> : <Link className="btn app-btn-secondary" to={`/professionals`}>
                    {t("CANCEL")}
                  </Link>}
                </div>
                <div className="col-auto">
                  <button onClick={handleSubmit}
                    type="button" className="btn app-btn-primary">
                    {isLoading ? <Loader type="dots" /> : t("SAVE")}
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>

        {isTimeSlot && (
          <ModalHOC
            isModalOpen={isTimeSlot}
            toggleModal={toggleTimeSlotModal}
            modalTitle={"Time Slot"}
            children={
              <ProfessionalTimeslot
                toggleTimeSlotModal={toggleTimeSlotModal}
                slots={slots}
                setSlots={setSlots}
              />
            }
          />
        )}
      </div>
    </>
  );
};

export default Form;
