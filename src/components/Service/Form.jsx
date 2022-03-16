import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import ImageUploading from "react-images-uploading";
import { Link } from "react-router-dom";

import { schema } from "../../validation/service";
import Loader from "../Common/Loader";
import {
  CUSTOM_SELECT_STYLE,
  SERVICE_LOCATIONS,
  MINIMUM_SERVICE_DURATION,
  FIXED_SERVICE_MINUTES_SPAN,
  MAX_IMAGE,
  PAYMENT_TYPE
} from "../../utility/constants";

const Form = ({
  inNew,
  isLoading,
  prevStep,
  serviceImages,
  setServiceImages,
  handleSubmit,
  serviceDetails,
  setDeletedServiceImagesIds
}) => {
  const { t } = useTranslation();
  const [portfolio, setPortfolio] = useState(serviceDetails ? serviceDetails.services_images.filter((el) => el.is_primary === 1)[0].service_image_path:`assets/img/ic_upload.png`);
  const portfolioInputRef = useRef(null);
  const handleFileUpload = (event) => {
    let profile =
      event.target.files.length > 0 ? event.target.files[0] : undefined;
    if (profile !== undefined) {
      setPortfolio(URL.createObjectURL(profile));
    }
  };
  const handleServiceImages = (imageList) => {
    setServiceImages(imageList);
  };

  return (
    <>
      <div className="app-card-body">
        <h2 className="title mb-2 mt-0">{ inNew ? t('ADD_SERVICE_TITLE') : t('EDIT_SERVICE_TITLE')}</h2>
        <span className="subtitle">{t("ADD_SERVICE_DETAIL")}</span>
        <br />
        <br />
        <Formik
          initialValues={{
            service_name: serviceDetails ? serviceDetails.service_name : "",
            service_value: serviceDetails ? serviceDetails.service_value : "",
            tag: serviceDetails
              ? serviceDetails?.tag?.split(",").map((el) => {
                  return {
                    label: el,
                    value: el,
                  };
                })
              : [],
            description: serviceDetails ? serviceDetails.description : "",
            duration_minutes: serviceDetails
              ? serviceDetails.duration_minutes
              : MINIMUM_SERVICE_DURATION,
            service_type: serviceDetails
              ? serviceDetails.service_type.split(",")
              .map((el, i) => {
                return SERVICE_LOCATIONS.filter((location) => location.value === el)[0]
              })
              : [],
            payment_type : serviceDetails
            ? serviceDetails?.payment_type?.split(",").map((el, i) => {
              return PAYMENT_TYPE.filter((type) => type.value === el)[0]
            })
            : PAYMENT_TYPE.filter((type) => type.isFixed === true)[0],
            service_image_primary: serviceDetails ? serviceDetails.services_images.filter((el) => el.is_primary === 1)[0].service_image_path:"",
            //service_image: "",
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
            <form className="settings-form">
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label className="form-label">{t("SERVICE_NAME")}</label>
                  <input
                    className="custom-form-control form-control-lg"
                    type="text"
                    name="service_name"
                    placeholder={t("SERVICE_NAME")}
                    onBlur={handleBlur}
                    value={values.service_name}
                    onChange={handleChange}
                  />
                  <span className="error_text">
                    {errors.service_name &&
                      touched.service_name &&
                      t(errors.service_name)}
                  </span>
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">{t("SERVICE_VALUE")}</label>
                  <input
                    className="custom-form-control form-control-lg"
                    type="number"
                    name="service_value"
                    placeholder={t("SERVICE_VALUE")}
                    onBlur={handleBlur}
                    value={values.service_value}
                    onChange={handleChange}
                  />
                  <span className="error_text">
                    {errors.service_value &&
                      touched.service_value &&
                      t(errors.service_value)}
                  </span>
                </div>
              </div>
              <div className="row">
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
                <div className="mb-3 col-md-6">
                  <label htmlFor="name" className="form-label">
                    {t("SERVICE_TYPE")}
                  </label>
                  <Select
                    isMulti
                    onChange={(option) => {
                      setFieldValue("service_type", option);
                    }}
                    value={values.service_type}
                    styles={CUSTOM_SELECT_STYLE}
                    options={SERVICE_LOCATIONS}
                  />
                  <span className="error_text">
                    {errors.service_type &&
                      touched.service_type &&
                      t(errors.service_type)}
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label htmlFor="name" className="form-label">
                    {t("PAYMENT_TYPE")}
                  </label>
                  <Select
                    isMulti
                    isClearable={false}
                    onChange={(option) => {
                      if(option.length && (option.filter((op) => op.isFixed === true)).length !== 0){
                        setFieldValue("payment_type", option);
                      }
                    }}
                    value={values.payment_type}
                    styles={CUSTOM_SELECT_STYLE}
                    options={PAYMENT_TYPE}
                  />
                  <span className="error_text">
                    {errors.payment_type &&
                      touched.payment_type &&
                      t(errors.payment_type)}
                  </span>
                </div>
                <div className="mb-3 col-md-6">
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
                <label className="form-label">{t("SERVICE_TIME")}</label>
                <div className="mb-3 col-md-3">
                  <div className="services-time">
                    <button
                      className="minus"
                      type="button"
                      onClick={() => {
                        values.duration_minutes > MINIMUM_SERVICE_DURATION &&
                          setFieldValue(
                            "duration_minutes",
                            values.duration_minutes - FIXED_SERVICE_MINUTES_SPAN
                          );
                      }}
                    >
                      -
                    </button>
                    <input
                      className="custom-form-control form-control-lg"
                      type="text"
                      readOnly
                      name="duration_minutes"
                      placeholder={t("SERVICE_TIME")}
                      onBlur={handleBlur}
                      value={values.duration_minutes}
                      onChange={handleChange}
                    />
                    <button
                      className="plus"
                      type="button"
                      onClick={() =>
                        setFieldValue(
                          "duration_minutes",
                          values.duration_minutes + FIXED_SERVICE_MINUTES_SPAN
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="mb-3 col-md-12">
                  <label htmlFor="name" className="form-label">
                    {t("PORTFOLIO_IMAGE")}
                  </label>
                  <div className="mb-3">{t("LOGO_TEXT")}</div>
                  <input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    ref={portfolioInputRef}
                    style={{ display: "none" }}
                    name="service_image_primary"
                    onChange={(event) => {
                      handleFileUpload(event);
                      setFieldValue(
                        "service_image_primary",
                        event.target.files[0]
                      );
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

              <div className="row">
                <div className="mb-3 col-md-12">
                  <label htmlFor="name" className="form-label">
                    {t("SERVICE_IMAGES")}
                  </label>

                  <ImageUploading
                    multiple
                    value={serviceImages}
                    onChange={handleServiceImages}
                    maxNumber={MAX_IMAGE}
                    dataURLKey="data_url"
                  >
                    {({
                      imageList,
                      onImageUpload,
                      onImageRemoveAll,
                      onImageUpdate,
                      onImageRemove,
                      isDragging,
                      dragProps,
                    }) => (
                      <div className="upload__image-wrapper">
                        <div className="multiple-images row">
                        {serviceDetails && serviceDetails.services_images.filter((el) => el.is_primary === 0 ).map((image, index) => (
                            <div key={index} className="multiple-images-cover">
                              <div className="mult_img_list">
                                <span className="imageThumb">
                                  <img
                                    src={image.service_image_path}
                                    className="imageThumb_img"
                                    alt=" Image"
                                    style={{
                                      borderRadius: "7px",
                                      height: 100,
                                    }}
                                  />
                                </span>
                                <div
                                  className="remove-image"
                                  onClick={() => { setDeletedServiceImagesIds(ids => [...ids,image.id]);
                                    serviceDetails.services_images = serviceDetails.services_images.filter(function( obj ) {
                                      return obj.id !== image.id;
                                    });
                                  }
                                }
                                ></div>
                              </div>
                            </div>
                          ))}
                          {imageList.map((image, index) => (
                            <div key={index} className="multiple-images-cover">
                              <div className="mult_img_list">
                                <span className="imageThumb">
                                  <img
                                    src={image["data_url"]}
                                    className="imageThumb_img"
                                    alt=" Image"
                                    style={{
                                      borderRadius: "7px",
                                      height: 100,
                                    }}
                                  />
                                </span>
                                <div
                                  className="remove-image"
                                  onClick={() => onImageRemove(index)}
                                ></div>
                              </div>
                            </div>
                          ))}

                          <div
                            className=""
                            style={{
                              width: 100,
                              height: 100,
                              textAlign: "center",
                              border: "1px solid #ced4da",
                              borderRadius: "7px",
                              marginTop: "20px",
                              marginLeft: "10px",
                              padding: 2,
                              cursor: "pointer",
                              fontSize: "11px",
                              backgroundColor: isDragging ? "#E0B154" : "",
                            }}
                            onClick={onImageUpload}
                            {...dragProps}
                          >
                            <p className="m-0 pt-2">{t("CLICK_OR_DROP")}</p>
                            <img
                              className="pt-2"
                              src={"assets/img/ic_upload.png"}
                              style={{
                                width: 50,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </ImageUploading>
                </div>
              </div>
              <div className="row justify-content-between">
                <div className="col-auto">
                  {prevStep ? (
                    <button
                      onClick={prevStep}
                      type="button"
                      className="btn app-btn-secondary"
                    >
                      {t("PREV")}
                    </button>
                  ) : <Link className="btn app-btn-secondary" to={`/services`}>
                    {t("CANCEL")}
                  </Link> }
                </div>
                <div className="col-auto">
                  <button
                    onClick={handleSubmit}
                    type="button"
                    className="btn app-btn-primary"
                  >
                    {isLoading ? (
                      <Loader type="dots" />
                    ) : prevStep ? (
                      t("NEXT")
                    ) : (
                      t("SAVE")
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Form;
