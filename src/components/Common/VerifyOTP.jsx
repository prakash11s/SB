import React, {useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import OtpInput from 'react-otp-input';

import { sendVerifyEmail, verifyOTP } from '../../store/action/Auth/auth.action';

import { VERIFY_VIA, VERIFICATION_TYPE, OTP_RESEND_TIMER } from '../../utility/constants';

const VerifyOTP = ({ verifyOTPData, openLoginModal, openResetPasswordModal }) => {

    const dispatch = useDispatch();

    const [OTP, setOTP] = useState(undefined);

    const [isResendOTP, setIsResendOTP] = useState(false);
    const [seconds, setSeconds] = useState(OTP_RESEND_TIMER);

    const { t } = useTranslation();

    const handleChange = (otp) => {
        setOTP(otp);
    }

    const handleSubmit = (e) => {
        e.preventDefault();        
        if(verifyOTPData.type === VERIFICATION_TYPE.ACCOUNT){
            dispatch(verifyOTP(verifyOTPData.email,verifyOTPData.type,OTP)).then((response)=> {
                if(response.status)
                    openLoginModal();
            });
        } else if(verifyOTPData.type === VERIFICATION_TYPE.FORGOT_PASSWORD){
            dispatch(verifyOTP(verifyOTPData.email,verifyOTPData.type,OTP)).then((response)=> {
                if(response.status)
                    openResetPasswordModal(response.token);
            });
        }
    }

    const handleResendOTP = () => {
        dispatch(sendVerifyEmail(verifyOTPData.email, VERIFY_VIA.EMAIL)).then((response)=> {
            setSeconds(OTP_RESEND_TIMER);
            setOTP(undefined);
            setIsResendOTP(false);
        });
    }

    useEffect(() => {
        if (seconds > 0) {
            setTimeout(() => setSeconds(seconds - 1), 1000);
        } else {
            setIsResendOTP(true);
        }
    },[seconds]);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="modal-body otp-verification">
                    { t('VERIFY_OTP_TEXT') }
                    <div className="mb-3 otp-box">
                        <OtpInput
                            value={OTP}
                            onChange={handleChange}
                            numInputs={6}
                            separator={<span>-</span>}
                        />
                    </div>
                    <div className="mb-3 resend-otp">
                        { !isResendOTP && <span>Resend OTP After { seconds } Seconds</span>}
                        { isResendOTP && <button type="button" onClick={handleResendOTP} className="btn" >{ t('RESEND') }</button> }
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="submit" className="btn signin-btn" disabled={ (OTP && OTP.length === 6)  ? false : true } >{ t('VERIFY_PROCEED') }</button>
                </div>
            </form>
        </>
    );
}

export default VerifyOTP;