import React,{useState} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Loader from '../Common/Loader';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { resetPassword } from '../../store/action/Auth/auth.action';
import { REGEX } from '../../utility/constants';

const ResetPassword = ({ token, openLoginModal }) => {

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const handleSubmit = (values) => {
        setIsLoading(true);        
        dispatch(resetPassword(values.password, values.confirm_password,token)).then((response)=> {
            setIsLoading(false);
            if(response.status)
                openLoginModal();
        });        
    }

    const schema = Yup.object().shape({
        password: Yup.string().required('Password is required').matches(REGEX.PASSWORD,t("PWD_VALID")),
        confirm_password: Yup.string().required(t("PASSWORD_REQ"))
        .oneOf([Yup.ref(t("PASSWORD")), null], t("PASSWORD_MATCH"))
      });

    return (
        <>
            <Formik
                enableReinitialize
                initialValues={{ 
                    password: '',
                    confirm_password: ''
                }}
                validationSchema={schema}
                onSubmit={(values ,{ setSubmitting }) => { handleSubmit(values); }} >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                }) => (
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <div className="modal-body">
                            <div className="account-registration">
                                <div className="mb-3">
                                    <input
                                    className="custom-form-control form-control-lg" 
                                    type="password"
                                    name="password"
                                    placeholder={ t('NEW_PWD') }
                                    onBlur={handleBlur}
                                    value={values.password}
                                    onChange={handleChange} />
                                    <span className="error_" >{errors.password && touched.password && errors.password}</span>
                                </div>
                                <div className="mb-3">
                                    <input
                                    className="custom-form-control form-control-lg" 
                                    type="password"
                                    name="confirm_password"
                                    placeholder={ t('CONFIRM_PWD') }
                                    onBlur={handleBlur}
                                    value={values.confirm_password}
                                    onChange={handleChange} />
                                    <span className="error_" >{errors.confirm_password && touched.confirm_password && errors.confirm_password}</span>
                                </div>
                            </div>                            
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn signin-btn" >{ isLoading ? <Loader type="dots"/> : t('CONTINUE') }</button>
                        </div>        
                    </form>
                )}
            </Formik>
        </>
    );
}

export default ResetPassword;