import React,{useState} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Loader from '../Common/Loader';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { sendVerifyEmail, sendForgotPasswordEmail } from '../../store/action/Auth/auth.action';
import { VERIFICATION_TYPE, VERIFY_VIA } from '../../utility/constants';

const VerifyEmail = ({ verifyEmailData, openVerifyOTPModal, openLoginModal }) => {

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const handleSubmit = (values) => {
        setIsLoading(true);
        if(verifyEmailData.type === VERIFICATION_TYPE.ACCOUNT){
            dispatch(sendVerifyEmail(values.email, VERIFY_VIA.EMAIL)).then((response)=> {
                setIsLoading(false);
                if(response.status){
                    openVerifyOTPModal(values.email, verifyEmailData.type);
                }
            });
        } else if(verifyEmailData.type === VERIFICATION_TYPE.FORGOT_PASSWORD){            
            dispatch(sendForgotPasswordEmail(values.email)).then((response)=> {
                setIsLoading(false);
                if(response.status){
                    openVerifyOTPModal(values.email, verifyEmailData.type);
                }
            });
        }
    }

    const schema = Yup.object().shape({
        email: Yup.string().required('Please enter email Id.').email('Please enter valid email Id.'),
      });

    return (
        <>
            <Formik
                enableReinitialize
                initialValues={{ 
                    email: verifyEmailData.email,
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
                            { (verifyEmailData.type === VERIFICATION_TYPE.ACCOUNT) ? t('VERIFY_ACCOUNT_EMAIL_TEXT') : t('FORGOT_PWD_EMAIL_TEXT') }
                            <div className="account-registration">
                                <div className="mb-3">
                                    <input
                                    className="custom-form-control form-control-lg" 
                                    type="text"
                                    name="email"
                                    placeholder={ t('VERIFY_EMAIL') }
                                    onBlur={handleBlur}
                                    value={values.email}
                                    onChange={handleChange} />
                                    <span className="error_" >{errors.email && touched.email && errors.email}</span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn signin-btn" >{ isLoading ? <Loader type="dots"/> : t('CONTINUE') }</button>
                        </div>
                    </form>
                )}
            </Formik>
            { (verifyEmailData.type === VERIFICATION_TYPE.FORGOT_PASSWORD) ? <div className="forgot-link"><button onClick={ openLoginModal } className="btn" >{ t('LOGIN') }</button></div> : '' }
        </>
    );
}

export default VerifyEmail;