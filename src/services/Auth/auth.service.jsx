import moment from "moment";

import apiClient, { setHeader } from "../../utility/apiClient";
import {
    DEVICE_TYPE,
    LOGIN_SOCIAL_TYPE,
    USER_DEVICE_INFO,
    USER_TYPE,
} from "../../utility/constants";

const AuthServices = {
    login: (email, password) => {
        return apiClient.post("login", {
            email: email,
            password: password,
            fcm_token: USER_DEVICE_INFO,
            device_type: DEVICE_TYPE,
        });
    },
    checkSocial: (email, provider) => {
        return apiClient.post("check_social_account", {
            email: email,
            social_media_type: provider,
            login_type: LOGIN_SOCIAL_TYPE,
            fcm_id: USER_DEVICE_INFO,
            device_type: DEVICE_TYPE,
        });
    },
    register: (payload) => {
        return apiClient.post("register", {
            ...payload,
            fantacy_name: payload.fantasy_name,
            user_type: USER_TYPE,
            fcm_id: USER_DEVICE_INFO,
            device_type: DEVICE_TYPE,
            service_location: payload.service_location
                ? payload.service_location.map((obj) => obj.value).join(",")
                : "",
            date_of_birth:
                payload.date_of_birth &&
                moment(payload.date_of_birth).format("yyyy-MM-DD"),
        });
    },
    sendVerifyEmail: (email, verifyVia) => {
        return apiClient.post("send_verification_code", {
            email: email,
            varify_type: verifyVia,
        });
    },
    sendForgotPasswordEmail: (email) => {
        return apiClient.post("forgot_password", {
            email: email,
        });
    },
    verifyOTP: (email, verifyType, otp) => {
        return apiClient.post("otp_verification", {
            email: email,
            varify_type: verifyType,
            otp_code: otp,
        });
    },
    resetPassword: (password, confirm_password, token) => {
        return apiClient.post("reset_new_password", {
            new_password: password,
            confirm_password: confirm_password,
            reset_pass_token: token,
        });
    },
    changeLanguage: (language) => {
        return apiClient.post("language_change", {
            language: language,
        }, setHeader());
    },
    changePassword: (payload) => {
        return apiClient.post("change_password", payload, setHeader());
    },    
    logout: () => {
        return apiClient.post("logout", {}, setHeader());
    }
};

export default AuthServices;
