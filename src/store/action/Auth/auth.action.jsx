import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, 
         SOCIAL_REGISTER_CHECK, SOCIAL_REGISTER_CANCEL, 
         REGISTER_SUCCESS, REGISTER_FAIL,
         VERIFY_MAIL_SEND_SUCCESS, VERIFY_MAIL_SEND_FAIL,
         VERIFY_OTP_SUCCESS, VERIFY_OTP_FAIL,
         RESET_PWD_SUCCESS, RESET_PWD_FAIL,
         PROFILE_UPDATE_SUCCESS,PROFILE_UPDATE_FAIL,
         LANGUAGE_SELECTOR_SUCCESS,  LANGUAGE_SELECTOR_FAIL,
         PROFILE_PHOTO_UPDATE_SUCCESS, PROFILE_PHOTO_UPDATE_FAIL } from './auth.type';
import { toast } from 'react-toastify';

import { USR_NOT_VERIFIED_ERROR, VERIFICATION_TYPE } from '../../../utility/constants';

import AuthServices from '../../../services/Auth/auth.service';
import DashboardServices from '../../../services/Dashboard/Dashboard.service';

export const login = (email, password) => (dispatch) => {
  return AuthServices.login(email, password).then(
    (response) => {
      let message = response.data.msg;
      if(response.data.status){
        toast.success(message);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: response.data.data[0]},
        });        
        return { status : false }
      }else if(response.data.error_code === USR_NOT_VERIFIED_ERROR){
        toast.error(message);
        return { status : true }
      }else{
        toast.error(message);
        dispatch({
          type: LOGIN_FAIL,
        });
        return { status : false }
      }      
    }
  ).catch();
};

export const logout = () => (dispatch) => {  
  return AuthServices.logout().then(
    (response) => {
      let message = response.data.msg;
      if(response.data.status){
        toast.success(message);
        dispatch({
          type: LOGOUT
        });
        localStorage.clear();
        return { status : true }
      }
    }
  ).catch();
};

export const checkSocial = (user) => (dispatch) => {
  return AuthServices.checkSocial(user._profile.email,user._provider).then(
    (response) => {
      let message = response.data.msg;
      if(response.data.status){
        toast.success(message);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: response.data.data[0]},
        });
      }else{
        dispatch({
          type: SOCIAL_REGISTER_CHECK,
          payload:{ social_user: user }
        });
      }      
    }
  ).catch();
};

export const socialRegisterCancel = () => (dispatch) => {  
  dispatch({
    type: SOCIAL_REGISTER_CANCEL,
  });  
};

export const register = (payload) => (dispatch) => {
  return AuthServices.register(payload).then(
    (response) => {
      let message = response.data.msg;
      if(response.data.status){
        let user = response.data.data[0];
        toast.success(message);
        if(user.account_verify === 1){
          user.provider_info.time_selection = false;
          user.provider_info.provider_services = 0;
          user.provider_info.professional = 0;
        }
        dispatch({
          type: REGISTER_SUCCESS,
          payload: { user: user },
        });
        if(user.account_verify === 1) {
          return { status : false};
        }else{
          return { status : true, email: user.email };
        }


      }else{
        toast.error(message);
        dispatch({
          type: REGISTER_FAIL,
        });
        return { status : false};
      }      
    }
  ).catch();
};

export const sendVerifyEmail = (email,verifyVia) => (dispatch) => {
  return AuthServices.sendVerifyEmail(email,verifyVia).then(
    (response) => {
      let message = response.data.msg;
      if(response.data.status){
        toast.success(message);
        dispatch({
          type: VERIFY_MAIL_SEND_SUCCESS
        });
        return { status : true };
      }else{
        toast.error(message);
        dispatch({
          type: VERIFY_MAIL_SEND_FAIL,
        });
      }
    }
  ).catch();
};

export const sendForgotPasswordEmail = (email) => (dispatch) => {
  return AuthServices.sendForgotPasswordEmail(email).then(
    (response) => {
      let message = response.data.msg;
      if(response.data.status){
        toast.success(message);
        dispatch({
          type: VERIFY_MAIL_SEND_SUCCESS
        });
        return { status : true };
      }else{
        toast.error(message);
        dispatch({
          type: VERIFY_MAIL_SEND_FAIL,
        });
      }
    }
  ).catch();
};

export const verifyOTP = (email,verifyType,otp) => (dispatch) => {
  return AuthServices.verifyOTP(email,verifyType,otp).then(
    (response) => {      
      let message = response.data.msg;      
      if(response.data.status){
        toast.success(message);
        dispatch({
          type: VERIFY_OTP_SUCCESS
        });
        if(verifyType === VERIFICATION_TYPE.FORGOT_PASSWORD)
          return { status : true, token : response.data.data.reset_pass_token }
        else
          return { status : true }
      }else{
        toast.error(message);
        dispatch({
          type: VERIFY_OTP_FAIL,
        });
        return { status : false }
      }
    }
  ).catch();
};

export const resetPassword = (password, confirm_password,token) => (dispatch) => {
  return AuthServices.resetPassword(password, confirm_password,token).then(
    (response) => {
      let message = response.data.msg;      
      if(response.data.status){
        toast.success(message);
        dispatch({
          type: RESET_PWD_SUCCESS
        });
        return { status : true }
      }else{
        toast.error(message);
        dispatch({
          type: RESET_PWD_FAIL,
        });
        return { status : false }
      }
    }
  ).catch();
};

export const languageSelector = (payload) => (dispatch) => {
  return AuthServices.changeLanguage(payload).then(
    (response) => {
      let message = response.data.msg;      
      if(response.data.status){
        toast.success(message);
        dispatch({
          type: LANGUAGE_SELECTOR_SUCCESS,
          payload: {language:payload},
        });
      }else{
        toast.error(message);
        dispatch({
          type: LANGUAGE_SELECTOR_FAIL,
        });
      }      
    }
  ).catch();
};

export const updateProfile = (payload) => (dispatch) => {
  return DashboardServices.updateProfile(payload).then(
    (response) => {
      let message = response.data.msg;      
      if(response.data.status){
        toast.success(message);
        dispatch({
          type: PROFILE_UPDATE_SUCCESS,
          payload: response.data.data,
        });
        
        return { status : true};
      }else{
        toast.error(message);
        dispatch({
          type: PROFILE_UPDATE_FAIL,
        });
        return { status : false};
      }      
    }
  ).catch();
};

export const updateProfilePhoto = (payload, headersProps) => (dispatch) => {
  return DashboardServices.updateProfilePhoto(payload, headersProps).then(
    (response) => {
      let message = response.data.msg;      
      if(response.data.status){
        toast.success(message);
        dispatch({
          type: PROFILE_PHOTO_UPDATE_SUCCESS,
          payload: response.data.data,
        });
        return { status : true};
      }else{
        toast.error(message);
        dispatch({
          type: PROFILE_PHOTO_UPDATE_FAIL,
        });
        return { status : false};
      }      
    }
  ).catch();
};