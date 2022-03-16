import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import Loader from "../Common/Loader";
import {
  CUSTOM_SELECT_STYLE,
  PROMOCODE_DISCOUNT_TYPE,
  PROMOCODE_DURATION_TYPE,
  PROMOCODE_DISCOUNT_APPLIED_ON,
  DISCOUNT_FIX_PERCENTAGE,
  DISCOUNT_FIX_AMOUNT,
  DURATION_DATE_RANGE,
  DISCOUNT_APPLY_SERVICE,
  DISCOUNT_APPLY_CART,
  DISCOUNT_APPLY_SERVICE_CART
} from "../../utility/constants";

import ServiceServices from "../../services/Service/Service.service";

const Form = ({
  isLoading,
  handleSubmit,
  promocodeDetails
}) => {
  const { t } = useTranslation();
  const promocodeImageRef = useRef(null);
  const [services, setServices] = useState([]);
  const [promocodeImage, setPromocodeImage] = useState(`assets/img/ic_upload.png`);
  const [discountType, setDiscountType] = useState([]);
  const [durationType, setDurationType] = useState({});
  const [discountApply, setDiscountApply] = useState({});

  const handleFileUpload = (event) => {
    let profile =
      event.target.files.length > 0 ? event.target.files[0] : undefined;
    if (profile !== undefined) {
      setPromocodeImage(URL.createObjectURL(profile));
    }
  };

  const onInit = async () => {
    try {
      const serviceData = await ServiceServices.getServicesList();
      if (serviceData.data.status) {
        let servicesList = serviceData.data.data.map((el) => {
          return {
            label: el.service_name,
            value: el.id,
          };
        });
        setServices(servicesList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onInit();
  }, []);

  useEffect(() => {
    setPromocodeImage(promocodeDetails ? promocodeDetails?.promocode_photo_path : `assets/img/ic_upload.png`);
    setDiscountType(promocodeDetails && promocodeDetails?.discount_type ? PROMOCODE_DISCOUNT_TYPE.filter((type) => type.value === promocodeDetails.discount_type)[0] : []);
    setDurationType(promocodeDetails && promocodeDetails?.duration_type ? PROMOCODE_DURATION_TYPE.filter((type) => type.value === promocodeDetails.duration_type)[0] : []);
    setDiscountApply(promocodeDetails && promocodeDetails.discount_apply ? PROMOCODE_DISCOUNT_APPLIED_ON.filter((type) => type.value === promocodeDetails.discount_apply)[0] : []);
  }, [promocodeDetails])

  return (
    <>
      <div className="app-card-body">
        <h2 className="title mb-2 mt-0">{t("ADD_PROMOCODE")}</h2>
        <br />
        <Formik
          initialValues={{
            promocode_name: promocodeDetails && promocodeDetails?.promocode_name ? promocodeDetails?.promocode_name : "",
            promocode: promocodeDetails && promocodeDetails?.promocode ? promocodeDetails?.promocode : "",
            discount_type: discountType,
            fix_amount: promocodeDetails && promocodeDetails?.fix_amount ? promocodeDetails?.fix_amount : "",
            max_discount_amount: promocodeDetails && promocodeDetails?.max_discount_amount ? promocodeDetails?.max_discount_amount : "",
            fix_percentage: promocodeDetails && promocodeDetails?.fix_percentage ? promocodeDetails?.fix_percentage : "",
            duration_type: durationType,
            start_date: promocodeDetails && promocodeDetails?.start_date ? new Date(promocodeDetails?.start_date) : "",
            end_date: promocodeDetails && promocodeDetails?.end_date ? new Date(promocodeDetails?.end_date) : "",
            photos: promocodeDetails && promocodeDetails?.promocode_photo_path ? promocodeDetails?.promocode_photo_path : "",
            discount_apply: discountApply,
            cart_min_value: promocodeDetails && promocodeDetails?.cart_min_value ? promocodeDetails?.cart_min_value : "",
            cart_max_value: promocodeDetails && promocodeDetails?.cart_max_value ? promocodeDetails?.cart_max_value : "",
            service_id: promocodeDetails && promocodeDetails?.get_discount_apply
              ? promocodeDetails?.get_discount_apply?.map((el, i) => {
                return services.filter((service) => service.value === el.service_id)[0]
              }) : [],
          }}
          validationSchema={Yup.object().shape({
            promocode_name: Yup.string()
              .required(t("PROMOCODE_NAME_REQ")),
            promocode: Yup.string()
              .required(t("PROMOCODE_REQ")),
            photos: Yup.string()
              .required(t("DISCOUNT_IMAGE_REQ")),
            fix_amount: Yup.string().when("discount_type", {
              is: (type) => (type.value === DISCOUNT_FIX_AMOUNT ? true : false),
              then: Yup.string().required(t("FIX_AMOUNT_REQ")),
            }),
            fix_percentage: Yup.string().when("discount_type", {
              is: (type) => (type.value === DISCOUNT_FIX_PERCENTAGE ? true : false),
              then: Yup.string().required(t("FIX_PERCENTAGE_REQ")),
            }),
            max_discount_amount: Yup.string().when("discount_type", {
              is: (type) => (type.value === DISCOUNT_FIX_PERCENTAGE ? true : false),
              then: Yup.string().required(t("MAX_DISCOUNT_AMOUNT_REQ")),
            }),
            start_date: Yup.string().when("duration_type", {
              is: (type) => (type.value === DURATION_DATE_RANGE ? true : false),
              then: Yup.string().required(t("START_DATE_REQ")),
            }),
            end_date: Yup.string().when("duration_type", {
              is: (type) => (type.value === DURATION_DATE_RANGE ? true : false),
              then: Yup.string().required(t("END_DATE_REQ")),
            }),
            // service_id: Yup.string().when("discount_apply", {
            //   is: (type) => (type && (type.label === DISCOUNT_APPLY_SERVICE || type.label === DISCOUNT_APPLY_SERVICE_CART) ? true : false),
            //   then: Yup.array().required(t("SERVICE_REQ")).min(1),
            // }),
            cart_min_value: Yup.string().when("discount_apply", {
              is: (type) => (type && (type.label === DISCOUNT_APPLY_CART || type.label === DISCOUNT_APPLY_SERVICE_CART) ? true : false),
              then: Yup.string().required(t("CART_MIN_VALUE_REQ")),
            }),
            cart_max_value: Yup.string().when("discount_apply", {
              is: (type) => (type && (type.label === DISCOUNT_APPLY_CART || type.label === DISCOUNT_APPLY_SERVICE_CART) ? true : false),
              then: Yup.string().required(t("CART_MAX_VALUE_REQ")),
            }),

          })}
          validate={(values) => {
            const errors = {};
            if (values.discount_type.length === 0) {
              errors.discount_type = t("DISCOUNT_TYPE_REQ");
            }
            if (values.duration_type.length === 0) {
              errors.duration_type = t("DURATION_TYPE_REQ");
            }
            if (values.discount_apply.length === 0) {
              errors.discount_apply = t("DISCOUNT_APPLY_REQ");
            }
            if (values.discount_apply.label === DISCOUNT_APPLY_SERVICE || values.discount_apply.label === DISCOUNT_APPLY_SERVICE_CART) {
              if (values.service_id.length === 0) {
                errors.service_id = t("SERVICE_REQ");
              }
            }
            return errors;
          }}
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
              onSubmit={handleSubmit}
            >
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label className="form-label">{t("PROMOCODE_NAME")}</label>
                  <div className="professional_form">
                    <input
                      className="custom-form-control form-control-lg"
                      type="text"
                      name="promocode_name"
                      value={values.promocode_name}
                      placeholder={t("PROMOCODE_NAME")}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <span className="form-icon">
                      <img src={`assets/img/ic_user_secondary.png`} alt="FB" />
                    </span>
                    <span className="error_text">
                      {errors.promocode_name &&
                        touched.promocode_name &&
                        errors.promocode_name}
                    </span>
                  </div>
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">{t("PROMOCODE")}</label>
                  <div className="professional_form">
                    <input
                      className="custom-form-control form-control-lg"
                      type="text"
                      name="promocode"
                      value={values.promocode}
                      placeholder={t("PROMOCODE")}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <span className="form-icon">
                      <img src={`assets/img/ic_user_secondary.png`} alt="FB" />
                    </span>
                    <span className="error_text">
                      {errors.promocode &&
                        touched.promocode &&
                        errors.promocode}
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label className="form-label">{t("DISCOUNT_TYPE")}</label>
                  <Select
                    onChange={(option) => {
                      setFieldValue("discount_type", option);
                    }}
                    value={values.discount_type}
                    styles={CUSTOM_SELECT_STYLE}
                    options={PROMOCODE_DISCOUNT_TYPE}
                    isSearchable={false}
                  />
                  <span className="error_text">
                    {errors.discount_type &&
                      touched.discount_type &&
                      errors.discount_type}
                  </span>
                </div>
                {values?.discount_type?.label === DISCOUNT_FIX_AMOUNT &&
                  <div className="mb-3 col-md-6">
                    <label className="form-label">{t("FIX_AMOUNT")}</label>
                    <div className="professional_form">
                      <input
                        className="custom-form-control form-control-lg"
                        type="number"
                        name="fix_amount"
                        value={values.fix_amount}
                        placeholder={t("FIX_AMOUNT")}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <span className="form-icon">
                        <img src={`assets/img/ic_user_secondary.png`} alt="FB" />
                      </span>
                      <span className="error_text">
                        {errors.fix_amount &&
                          touched.fix_amount &&
                          errors.fix_amount}
                      </span>
                    </div>
                  </div>}
                {values?.discount_type?.label === DISCOUNT_FIX_PERCENTAGE && <>
                  <div className="mb-3 col-md-3">
                    <label className="form-label">{t("FIX_PERCENTAGE")}</label>
                    <div className="professional_form">
                      <input
                        className="custom-form-control form-control-lg"
                        type="number"
                        name="fix_percentage"
                        value={values.fix_percentage}
                        placeholder={t("FIX_PERCENTAGE")}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <span className="form-icon">
                        <img src={`assets/img/ic_user_secondary.png`} alt="FB" />
                      </span>
                      <span className="error_text">
                        {errors.fix_percentage &&
                          touched.fix_percentage &&
                          errors.fix_percentage}
                      </span>
                    </div>
                  </div>
                  <div className="mb-3 col-md-3">
                    <label className="form-label">
                      {t("MAX_DISCOUNT_AMOUNT")}
                    </label>
                    <div className="professional_form">
                      <input
                        className="custom-form-control form-control-lg"
                        type="number"
                        name="max_discount_amount"
                        value={values.max_discount_amount}
                        placeholder={t("MAX_DISCOUNT_AMOUNT")}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <span className="form-icon">
                        <img src={`assets/img/ic_user_secondary.png`} alt="FB" />
                      </span>
                      <span className="error_text">
                        {errors.max_discount_amount &&
                          touched.max_discount_amount &&
                          errors.max_discount_amount}
                      </span>
                    </div>
                  </div></>}
              </div>
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label className="form-label">{t("DURATION_TYPE")}</label>
                  <Select
                    onChange={(option) => {
                      setFieldValue("duration_type", option);
                    }}
                    value={values.duration_type}
                    styles={CUSTOM_SELECT_STYLE}
                    options={PROMOCODE_DURATION_TYPE}
                    isSearchable={false}
                  />
                  <span className="error_text">
                    {errors.duration_type &&
                      touched.duration_type &&
                      errors.duration_type}
                  </span>
                </div>
                {values?.duration_type?.label === DURATION_DATE_RANGE && <>
                  <div className="mb-3 col-md-3">
                    <label className="form-label">
                      {t("START_DATE")}
                    </label>
                    <div className="professional_form">
                      <DatePicker
                        className="custom-form-control form-control-lg"
                        minDate={new Date()}
                        dateFormat="dd MMM yyyy h:mm aa"
                        selected={values.start_date}
                        onChange={(dates) => {
                          setFieldValue("start_date", dates);
                        }}
                        value={values.start_date}
                        showTimeSelect
                        withPortal
                      ></DatePicker>
                      <span className="form-icon">
                        <img
                          src={`assets/img/ic_dob_calendar_secondary.png`}
                          alt="FB"
                        />
                      </span>
                      <span className="error_text">
                        {errors.start_date &&
                          touched.start_date &&
                          errors.start_date}
                      </span>
                    </div>
                  </div>
                  <div className="mb-3 col-md-3">
                    <label className="form-label">
                      {t("END_DATE")}
                    </label>
                    <div className="professional_form">
                      <DatePicker
                        className="custom-form-control form-control-lg"
                        minDate={values.start_date}
                        dateFormat="dd MMM yyyy h:mm aa"
                        selected={values.end_date}
                        onChange={(dates) => {
                          setFieldValue("end_date", dates);
                        }}
                        value={values.end_date}
                        showTimeSelect
                        withPortal
                      ></DatePicker>
                      <span className="form-icon">
                        <img
                          src={`assets/img/ic_dob_calendar_secondary.png`}
                          alt="FB"
                        />
                      </span>
                      <span className="error_text">
                        {errors.end_date &&
                          touched.end_date &&
                          errors.end_date}
                      </span>
                    </div>
                  </div></>}
              </div>
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label className="form-label">{t("DISCOUNT_APPLIED_ON")}</label>
                  <Select
                    onChange={(option) => {
                      setFieldValue("discount_apply", option);
                    }}
                    value={values.discount_apply}
                    styles={CUSTOM_SELECT_STYLE}
                    options={PROMOCODE_DISCOUNT_APPLIED_ON}
                    isSearchable={false}
                  />
                  <span className="error_text">
                    {errors.discount_apply &&
                      touched.discount_apply &&
                      errors.discount_apply}
                  </span>
                </div>
                {(values?.discount_apply?.label === DISCOUNT_APPLY_SERVICE || values?.discount_apply?.label === DISCOUNT_APPLY_SERVICE_CART) && <div className="mb-3 col-md-6">
                  <label className="form-label">{t("SERVICES")}</label>
                  <Select
                    isMulti
                    onChange={(option) => {
                      setFieldValue("service_id", option);
                    }}
                    value={values.service_id}
                    styles={CUSTOM_SELECT_STYLE}
                    options={services}
                  />
                  <span className="error_text">
                    {errors.service_id &&
                      touched.service_id &&
                      errors.service_id}
                  </span>
                </div>}
                {(values.discount_apply.label === DISCOUNT_APPLY_CART || values.discount_apply.label === DISCOUNT_APPLY_SERVICE_CART) && <><div className="mb-3 col-md-3">
                  <label className="form-label">
                    {t("CART_MIN_VALUE")}
                  </label>
                  <div className="professional_form">
                    <input
                      className="custom-form-control form-control-lg"
                      type="text"
                      name="cart_min_value"
                      value={values.cart_min_value}
                      placeholder={t("CART_MIN_VALUE")}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <span className="form-icon">
                      <img src={`assets/img/ic_user_secondary.png`} alt="FB" />
                    </span>
                    <span className="error_text">
                      {errors.cart_min_value &&
                        touched.cart_min_value &&
                        errors.cart_min_value}
                    </span>
                  </div>
                </div>
                  <div className="mb-3 col-md-3">
                    <label className="form-label">
                      {t("CART_MAX_VALUE")}
                    </label>
                    <div className="professional_form">
                      <input
                        className="custom-form-control form-control-lg"
                        type="text"
                        name="cart_max_value"
                        value={values.cart_max_value}
                        placeholder={t("CART_MAX_VALUE")}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <span className="form-icon">
                        <img src={`assets/img/ic_user_secondary.png`} alt="FB" />
                      </span>
                      <span className="error_text">
                        {errors.cart_max_value &&
                          touched.cart_max_value &&
                          errors.cart_max_value}
                      </span>
                    </div>
                  </div></>}
              </div>
              <div className="row">
                <div className="mb-3 col-md-12">
                  <h2 htmlFor="name" className="title mb-2">
                    {t("DISCOUNT_IMAGE")}
                  </h2>
                  <span className="subtitle d-block mb-3">
                    {t("LOGO_TEXT")}
                  </span>
                  <input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    ref={promocodeImageRef}
                    style={{ display: "none" }}
                    name="photos"
                    onChange={(event) => {
                      handleFileUpload(event);
                      setFieldValue("photos", event.target.files[0]);
                    }}
                  />
                  <img
                    onClick={() => promocodeImageRef.current.click()}
                    src={promocodeImage}
                    alt="Promocode Image"
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
                    {errors.photos &&
                      touched.photos &&
                      errors.photos}
                  </span>
                </div>
              </div>
              <div className="row justify-content-between">
                <div className="col-auto">
                  <Link className="btn app-btn-secondary" to={`/promocode`}>
                    {t("CANCEL")}
                  </Link>
                </div>
                <div className="col-auto">
                  <button type="submit" className="btn app-btn-primary">
                    {isLoading ? <Loader type="dots" /> : t("SAVE")}
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
