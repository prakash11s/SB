import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Loader from '../Common/Loader';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import HomeServices from "../../services/Home/Home.service";
import { REGEX } from '../../utility/constants';

const CommonContactUsForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { t, i18n } = useTranslation();

    const handleSubmit = (values, { resetForm }) => {
        setIsLoading(true);
        HomeServices.saveContactForm(values).then((response) => {
            setIsLoading(false);
            if (response.data.status) {
                resetForm()
                toast.success(response.data.msg);
            } else {
                toast.error(response.data.msg);
            }
        });
    }

    const schema = Yup.object().shape({
        full_name: Yup.string().required(t("FULL_NAME_REQ")),
        contact_number: Yup.string().required(t("MOBILE_REQ")).matches(REGEX.MOBILE, t("MOBILE_VALID")),
        email: Yup.string().required(t("EMAIL_REQ")).email(t("EMAIL_VALID")),
        description: Yup.string().required(t("DESCRIPTION_REQ"))
    });

    return (
        <div className="getin-form">
            <h4>{t("COMMON_CONTACT_US_TITLE")}</h4>
            <Formik
                enableReinitialize
                initialValues={{
                    full_name: '',
                    contact_number: '',
                    email: '',
                    description: '',
                    language: i18n.language,
                }}
                validationSchema={schema}
                onSubmit={(values, resetForm) => { handleSubmit(values, resetForm); }} >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                }) => (
                    <form onSubmit={handleSubmit} autoComplete="off" method="POST">
                        <div className="row padding-row">
                            <div className="col-lg-2 col-md-6 mb-3 pe-lg-0">
                                <div className="get-touch-field">
                                    <input
                                        className="custom-form-control form-control-lg"
                                        type="text"
                                        name="full_name"
                                        placeholder={t('NAME')}
                                        onBlur={handleBlur}
                                        value={values.full_name}
                                        onChange={handleChange} />
                                    <span className="error_" >{errors.full_name && touched.full_name && errors.full_name}</span>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-6 mb-3 pe-lg-0">
                                <div className="get-touch-field">
                                    <input
                                        className="custom-form-control form-control-lg"
                                        type="number"
                                        name="contact_number"
                                        placeholder={t('MOBILE_NUMBER')}
                                        onBlur={handleBlur}
                                        value={values.contact_number}
                                        onChange={handleChange} />
                                    <span className="error_" >{errors.contact_number && touched.contact_number && errors.contact_number}</span>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 mb-3 pe-lg-0">
                                <div className="get-touch-field">
                                    <input
                                        className="custom-form-control form-control-lg"
                                        type="text"
                                        name="email"
                                        placeholder={t('EMAIL')}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        onChange={handleChange} />
                                    <span className="error_" >{errors.email && touched.email && errors.email}</span>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 mb-3 pe-lg-0">
                                <div className="get-touch-field">
                                    <input
                                        className="custom-form-control form-control-lg"
                                        type="text"
                                        name="description"
                                        placeholder={t('DESCRIPTION')}
                                        onBlur={handleBlur}
                                        value={values.description}
                                        onChange={handleChange} />
                                    <span className="error_" >{errors.description && touched.description && errors.description}</span>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-3 mb-3 ">
                                <button type="submit" className="btn getin-btn">{isLoading ? <Loader type="dots" /> : t('Get in touch')}</button>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default CommonContactUsForm;