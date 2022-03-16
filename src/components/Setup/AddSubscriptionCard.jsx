import React from "react";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import Cleave from "cleave.js/react";
import * as Yup from 'yup';
import { toast } from "react-toastify";

import StripeServices from "../../services/Stripe/stripe.service";

const AddSubscriptionCard = ({ stripeUserId, toggleAddCardModal, setCardList }) => {
  const { t } = useTranslation();
   
  const handleSaveCard = (values) => {
    values['exp_month'] = values.exp_month_year.split('/')[0];
    values['exp_year'] = values.exp_month_year.split('/')[1];
    delete values.exp_month_year;
    
    StripeServices.setCustomerCard(values).then((response) => {
      if (response.data.status) {
        toast.success(response.data.msg);
        setCardList(response.data.data.data.data);
        toggleAddCardModal();
      }else{
        toast.error(response.data.msg);
      }
    });
  };

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          number: "",
          exp_month_year: "",
          cvc: "",
          customer_id: stripeUserId,
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required(t('CARD_NAME_REQ')),
          number: Yup.number().required(t('CARD_NUMBER_REQ')),
          exp_month_year: Yup.string().required(t('CARD_EXP_REQ')).test(
            t('CARD_EXPIRED'),
            exp_month_year => {
              if (!exp_month_year) {
                return false
              }
              const today = new Date();
              const monthToday = today.getMonth()+1;
              const yearToday = today.getFullYear();
              const [expMonth, expYear] = exp_month_year.split('/');
              if (expYear > yearToday || (expYear === yearToday && expMonth > monthToday)) {
                return true;
              }else{
                return false;
              }
            }
          ),
          cvc: Yup.number().required(t('CARD_CVV_REQ')),
        })}
        enableReinitialize
        validateOnChange
        onSubmit={(values) => handleSaveCard(values)}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit
        }) => (
          <>
            <div className="modal-body pt-3">
              <div className="add-card-wrap">
                <form className="settings-form">
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        {t("CARD_HOLDER_NAME")}
                      </label>
                      <input
                        className="custom-form-control form-control-lg"
                        type="text"
                        name="name"
                        value={values.name}
                        placeholder={t("CARD_HOLDER_NAME")}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <span className="error_" >{errors.name && touched.name && errors.name}</span>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">{t("CARD_NUMBER")}</label>
                      <Cleave
                        className="custom-form-control form-control-lg"
                        name="number"
                        value={values.number}
                        placeholder={t("CARD_NUMBER")}
                        options={{ creditCard: true }}
                        onFocus={handleChange}
                        onChange={handleChange}
                      />
                      <span className="error_" >{errors.number && touched.number && errors.number}</span>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">
                        {t("CARD_EXPIRY_DATE")}
                      </label>
                      <Cleave
                        className="custom-form-control form-control-lg"
                        name="exp_month_year"
                        value={values.exp_month_year}
                        placeholder={t("CARD_EXPIRY")}
                        options={{ date: true, datePattern: ["m", "Y"] }}
                        onFocus={handleChange}
                        onChange={handleChange}
                      />
                      <span className="error_" >{errors.exp_month_year && touched.exp_month_year && errors.exp_month_year}</span>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">{t("CARD_CVV")}</label>
                      <div className="paycard_form">
                        <Cleave
                          className="custom-form-control form-control-lg"
                          name="cvc"
                          value={values.cvc}
                          placeholder={t("CARD_CVV")}
                          options={{
                            blocks: [3],
                            numericOnly: true,
                          }}
                          onFocus={handleChange}
                          onChange={handleChange}
                        />
                        <span className="paycard-icon ">
                          <img src={`assets/img/ic_cvv.png`} alt="cvv/cvc" />
                        </span>
                        <span className="error_" >{errors.cvc && touched.cvc && errors.cvc}</span>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer justify-content-sm-end pt-3">
              <button onClick={ handleSubmit } type="button" className="btn save-btn">
              {t("SAVE")}
              </button>
            </div>
          </>
        )}
      </Formik>
    </>
  );
};

export default AddSubscriptionCard;
