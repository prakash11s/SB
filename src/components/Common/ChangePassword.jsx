import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';

import AuthServices from "../../services/Auth/auth.service";
import { REGEX } from "../../utility/constants";
import Loader from "../Common/Loader";

const ChangePassword = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (values) => {
    setIsLoading(true);
    AuthServices.changePassword(values).then(
        (response) => {
          setIsLoading(false);
          let message = response.data.msg;
          if(response.data.status){
            toast.success(message);
            history.replace("/dashboard");
          }else{
            toast.error(message);
          }
        }
      ).catch();
  };

  return (
    <>
      <div className="pt-3 p-md-3 p-lg-4">
        <div className="container-xl">
          <h2 className="app-page-title">{t("CHANGE_PASSWORD")}</h2>
          <hr className="mb-4" />
          <div className="row g-4 settings-section">
            <div className="col-12 col-md-12">
              <div className="app-card app-card-settings shadow-sm p-4">
                <div className="app-card-body">
                  <Formik
                    enableReinitialize
                    initialValues={{
                      old_password: "",
                      new_password: "",
                      confirm_password: "",
                    }}
                    validationSchema={Yup.object().shape({
                      old_password: Yup.string()
                        .required(t("PWD_REQ"))
                        .matches(REGEX.PASSWORD, t("PWD_VALID")),
                      new_password: Yup.string()
                        .required(t("PWD_REQ"))
                        .matches(REGEX.PASSWORD, t("PWD_VALID")),
                      confirm_password: Yup.string().when("new_password", {
                        is: (val) => (val && val.length > 0 ? true : false),
                        then: Yup.string().oneOf(
                          [Yup.ref("new_password")],
                          t("MATCH_PASSWORD")
                        ),
                      }),
                    })}
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
                          <div className="mb-3 col-md-6">
                            <label htmlFor="old_password" className="form-label">
                              {t("OLD_PASSWORD")}
                            </label>
                            <div className="update-profile">
                              <input
                                className="form-control-lg custom-form-control"
                                type="password"
                                name="old_password"
                                id="old_password"
                                placeholder={t("OLD_PASSWORD")}
                                onBlur={handleBlur}
                                value={values.old_password}
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
                              {errors.old_password &&
                                touched.old_password &&
                                t(errors.old_password)}
                            </span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label htmlFor="new_password" className="form-label">
                              {t("PASSWORD")}
                            </label>
                            <div className="update-profile">
                              <input
                                className="form-control-lg custom-form-control"
                                type="password"
                                name="new_password"
                                id="new_password"
                                placeholder={t("PASSWORD")}
                                onBlur={handleBlur}
                                value={values.new_password}
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
                              {errors.new_password &&
                                touched.new_password &&
                                t(errors.new_password)}
                            </span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label
                              htmlFor="confirm_password"
                              className="form-label"
                            >
                              {t("CONFIRM_PASSWORD")}
                            </label>
                            <div className="update-profile">
                              <input
                                className="form-control-lg custom-form-control"
                                type="password"
                                name="confirm_password"
                                id="confirm_password"
                                placeholder={t("CONFIRM_PASSWORD")}
                                onBlur={handleBlur}
                                value={values.confirm_password}
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
                              {errors.confirm_password &&
                                touched.confirm_password &&
                                t(errors.confirm_password)}
                            </span>
                          </div>
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

export default ChangePassword;
