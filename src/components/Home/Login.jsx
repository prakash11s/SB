import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { login } from '../../store/action/Auth/auth.action';
import SocialLogin from './SocialLogin';
import {VERIFICATION_TYPE} from '../../utility/constants';
import Loader from "../Common/Loader";

const Login = ({ openRegistrationModal, openVerifyEmailModal }) => {
    
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (values) => {
        setIsLoading(true);
        dispatch(login(values.email,values.password)).then((response)=> {
            setIsLoading(false);
            if(response.status){
                openVerifyEmailModal(values.email, VERIFICATION_TYPE.ACCOUNT);
            }
        }).catch(()=>{
            setIsLoading(false);
        });
    }
    return (  
        <>    
            <Formik
                initialValues={{ 
                    email: '',
                    password: '',
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().required(t('EMAIL_REQ')).email(t('EMAIL_VALID')),
                    password: Yup.string().required(t('PWD_REQ'))
                  })}
                onSubmit={(values) => { handleSubmit(values); }} >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit
                }) => (            
                    <form onSubmit={handleSubmit} autoComplete="off"  className="popup-account">
                        <div className="modal-body">
                            <div className="account-registration">
                                <div className="mb-3">
                                    <div className="front-profile">
                                        <input
                                        className="custom-form-control form-control-lg" 
                                        type="test"
                                        name="email"
                                        placeholder={ t('EMAIL') }
                                        onBlur={handleBlur}
                                        value={values.email}
                                        onChange={handleChange} />
                                        <span className="form-icon">
                                            <img
                                                src={`assets/img/ic_email_secondary.png`}
                                                alt="FB"
                                            />
                                        </span>
                                    </div>
                                    <span className="error_" >{errors.email && touched.email && errors.email}</span>
                                </div>
                                <div className="mb-3">
                                    <div className="front-profile">
                                        <input
                                        className="custom-form-control form-control-lg" 
                                        type="password"
                                        name="password"
                                        placeholder={ t('PASSWORD') }
                                        onBlur={handleBlur}
                                        value={values.password}
                                        onChange={handleChange} />
                                        <span className="form-icon">
                                            <img
                                                src={`assets/img/ic_password_secondary.png`}
                                                alt="FB"
                                            />
                                        </span>
                                    </div>
                                    <span className="error_" >{errors.password && touched.password && errors.password}</span>
                                </div>   
                            </div>             
                        </div>    
                        <div className="modal-footer">
                            <button onClick={openRegistrationModal} type="button" className="btn signup-btn" >{ t('SIGN_UP') }</button>
                            <button type="submit" className="btn submit-btn"  >{ isLoading ? <Loader type="dots"/> : t("CONTINUE") }</button>
                        </div>            
                    </form>
                )}
            </Formik>
            <div className="social-login">
                <SocialLogin />
            </div>
            <div className="forgot-link">
                <button onClick={() => { openVerifyEmailModal('',VERIFICATION_TYPE.FORGOT_PASSWORD) }} className="btn" >{ t("FORGOT_PWD") }</button>
            </div>
        </>
    );
}

export default Login;