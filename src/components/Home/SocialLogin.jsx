import React from 'react';
import { useDispatch } from 'react-redux';

import { checkSocial } from '../../store/action/Auth/auth.action';
import SocialButton from './SocialButton';
import { SOCIAL_API_KEY } from '../../utility/constants';

const Login = () => {

    const dispatch = useDispatch();

    const handleSocialLogin = (user) => {
        dispatch(checkSocial(user));
    };

    const handleSocialLoginFailure = (error) => {
        //console.error(error);
    };

    return (
        <>
            <div className="social-account">
                <SocialButton
                    className="social-login-button"
                    provider="facebook"
                    appId={SOCIAL_API_KEY.FACEBOOK}
                    onLoginSuccess={handleSocialLogin}
                    onLoginFailure={handleSocialLoginFailure} >
                    <img src="assets/img/f-icon.png" className="social-login" width="20px" alt="" />
                </SocialButton>
                <SocialButton
                    className="social-login-button"
                    provider="google"
                    appId={SOCIAL_API_KEY.GOOGLE}
                    onLoginSuccess={handleSocialLogin}
                    onLoginFailure={handleSocialLoginFailure} >
                    <img src="assets/img/g-icon.png" className="social-login" width="20px" alt="" />
                </SocialButton>
            </div>
        </>
    );
}

export default Login;