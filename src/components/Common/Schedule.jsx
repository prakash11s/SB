import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { ErrorMessage, FieldArray, Form, Formik } from "formik";
import moment from "moment";
import { toast } from 'react-toastify';

import SetupServices from "../../services/Setup/setup.service";
import { setupTimePeriod } from "../../store/action/Setup/setup.action";
import Loader from "../Common/Loader";

const Schedule = ({ isSetup, prevStep, nextStep }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [period, setPeriod] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    SetupServices.getPeriod().then((response) => {
      setIsLoading(false);
      if (response.data.status) {
        setPeriod(response.data.data);
      }
    });
  }, []);

  const handleSubmit = (value) => {
    setIsLoading(true);
    let isErrorExist = true;
    const payload = value.period;
    let formData = new FormData();
    payload.map((el, i) => {
      const day = Object.keys(el)[0];
      const start_time = Object.keys(el)[1];
      const end_time = Object.keys(el)[2];
      if (el[start_time] !== null && el[end_time] !== null) {
        formData.append(`period[${i}][${day}]`, el[day]);
        formData.append(`period[${i}][${start_time}]`, el[start_time]);
        formData.append(`period[${i}][${end_time}]`, el[end_time]);
        isErrorExist = false;
      } else {
        formData.append(`period[${i}][${day}]`, el[day]);
        formData.append(`period[${i}][${start_time}]`, '');
        formData.append(`period[${i}][${end_time}]`, '');
      }
    });
    const headersProps = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    if (!isErrorExist) {
      dispatch(setupTimePeriod(formData, headersProps))
        .then((response) => {
          setIsLoading(false);
          if (response.status) {
            isSetup && nextStep();
          }
        })
        .catch(() => {
          setIsLoading(false);
        });
    } else {
      toast.error(t('Please select at list one day availability.'));
    }
  };
  return (
    <>
      <div className="container-xl px-3 p-lg-0">
        <div className="row g-4 settings-section m-0">
          <div className="col-12 col-md-12">
            <div className="app-card app-card-settings p-4">
              <h2 className="title mb-2 mt-0">{t("AVAILABILITY_PERIOD_TEXT")}</h2>
              <br />
              <br />
              <div className="app-card-body">
                {isLoading ? <Loader type="dots" /> : <Formik
                  initialValues={{ period: period }}
                  enableReinitialize
                  validateOnChange
                  validationSchema={Yup.object({
                    period: Yup.array().of(
                      Yup.object().shape(
                        {
                          start_time: Yup.string()
                            .nullable()
                            .when(["end_time"], {
                              is: (end_time) => end_time && end_time !== null,
                              then: Yup.string()
                                .nullable()
                                .required(t("START_TIME_REQ")),
                            }),
                          end_time: Yup.string()
                            .nullable()
                            .when(["start_time"], {
                              is: (start_time) =>
                                start_time && start_time !== null,
                              then: Yup.string()
                                .nullable()
                                .required(t("END_TIME_REQ"))
                                .test(
                                  t("IS_GREATER"),
                                  t("END_TIME_GREATER_START_TIME"),
                                  function (value) {
                                    const { start_time } = this.parent;
                                    return moment(value, "HH:mm").isAfter(
                                      moment(start_time, "HH:mm")
                                    );
                                  }
                                ),
                            }),
                        },
                        ["end_time", "start_time"]
                      )
                    ),
                  })}
                  onSubmit={(values) => handleSubmit(values)}
                >
                  {({
                    values,
                    handleChange,
                    handleSubmit,
                  }) => (
                    <Form className="settings-form">
                      <FieldArray name="time">
                        {() => {
                          const period = values.period;
                          return (
                            <div>
                              {period.length > 0
                                ? period.map((day, i) => {
                                  return (
                                    <div key={i} className="row m-0">
                                      <div className="mb-3 col-md-2">
                                        <label className="form-label">
                                          {day.day}
                                        </label>
                                      </div>
                                      <div className="mb-3 col-lg-4 col-md-5">
                                        <input
                                          className="custom-form-control form-control-lg"
                                          type="time"
                                          name={`period.${i}.start_time`}
                                          placeholder={t("START_TIME")}
                                          value={day.start_time ? day.start_time : ''}
                                          onChange={handleChange}
                                        />
                                        <span className="error_text">
                                          <ErrorMessage
                                            name={`period.${i}.start_time`}
                                          />
                                        </span>
                                      </div>
                                      <div className="mb-3 col-lg-4 col-md-5">
                                        <input
                                          className="custom-form-control form-control-lg"
                                          type="time"
                                          name={`period.${i}.end_time`}
                                          placeholder={t("END_TIME")}
                                          value={day.end_time ? day.end_time : ''}
                                          onChange={handleChange}
                                        />
                                        <span className="error_text">
                                          <ErrorMessage
                                            name={`period.${i}.end_time`}
                                          />
                                        </span>
                                      </div>
                                    </div>
                                  );
                                })
                                : null}
                              <div className="row justify-content-between">
                                <div className="col-auto">
                                  {isSetup && <button
                                    onClick={prevStep}
                                    type="button"
                                    className="btn app-btn-secondary"
                                  >
                                    {t("PREV")}
                                  </button>}
                                </div>
                                <div className="col-auto">
                                  <button
                                    onClick={handleSubmit}
                                    type="button"
                                    className="btn app-btn-primary"
                                  >
                                    {isLoading ? (
                                      <Loader type="dots" />
                                    ) : (
                                      isSetup ? t("NEXT") : t("SAVE")
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        }}
                      </FieldArray>
                    </Form>
                  )}
                </Formik>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Schedule;
