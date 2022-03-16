import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SOCIAL_REGISTER_CHECK,
  SOCIAL_REGISTER_CANCEL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  VERIFY_MAIL_SEND_SUCCESS,
  VERIFY_MAIL_SEND_FAIL,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAIL,
  RESET_PWD_SUCCESS,
  RESET_PWD_FAIL,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL,
  PROFILE_PHOTO_UPDATE_SUCCESS,
  PROFILE_PHOTO_UPDATE_FAIL,
  LANGUAGE_SELECTOR_SUCCESS,
  LANGUAGE_SELECTOR_FAIL
} from "../../action/Auth/auth.type";
import {
  SAVE_SUBSCRIPTION_SUCCESS,
  SAVE_SUBSCRIPTION_FAIL,
  SAVE_TEMPLATE_SUCCESS,
  SAVE_TEMPLATE_FAIL,
  SAVE_TIME_PERIOD_SUCCESS,
  SAVE_TIME_PERIOD_FAIL,
  SAVE_CATEGORY_SUCCESS,
  SAVE_CATEGORY_FAIL,
  SAVE_SERVICE_COUNT_SUCCESS,
  SAVE_SERVICE_COUNT_FAIL,
  SAVE_PROFESSIONAL_COUNT_SUCCESS,
  SAVE_PROFESSIONAL_COUNT_FAIL
} from "../../action/Setup/setup.type";

const initialState = { isLoggedIn: false, user: null };

const auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: payload?.user?.account_verify === 1 ? true : false,
        user: payload.user ? payload.user : null,
        isSocialUser: false,
        socialUser: null,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case VERIFY_MAIL_SEND_SUCCESS:
    case VERIFY_MAIL_SEND_FAIL:
    case VERIFY_OTP_SUCCESS:
    case VERIFY_OTP_FAIL:
    case RESET_PWD_SUCCESS:
    case RESET_PWD_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        isSocialUser: false,
        socialUser: null,
      };
    case SOCIAL_REGISTER_CHECK:
      return {
        ...state,
        isSocialUser: true,
        socialUser: payload.social_user,
      };
    case SOCIAL_REGISTER_CANCEL:
      return {
        ...state,
        isSocialUser: false,
        socialUser: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
    case LOGOUT:
      return {
        ...initialState,
      };
    case SAVE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
      };
    case SAVE_TEMPLATE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          provider_info: {
            ...state.user.provider_info,
            ...payload.provider_info,
          },
        },
      };
    case SAVE_TIME_PERIOD_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          provider_info: {
            ...state.user.provider_info,
            ...payload,
          },
        },
      };
    case SAVE_CATEGORY_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          provider_info: {
            ...state.user.provider_info,
            ...payload,
          },
        },
      };
    case SAVE_SERVICE_COUNT_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          provider_info: {
            ...state.user.provider_info,
            provider_services:
              state.user.provider_info.provider_services + payload,
          },
        },
      };
    case SAVE_PROFESSIONAL_COUNT_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          provider_info: {
            ...state.user.provider_info,
            professional: state.user.provider_info.professional + payload,
          },
        },
      };
    case PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        }
      };
    case PROFILE_PHOTO_UPDATE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          provider_info: {
            ...state.user.provider_info,
            ...payload,
          },
        },
      };
    case LANGUAGE_SELECTOR_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,        
            ...payload,
        },
      };
    case SAVE_SUBSCRIPTION_FAIL:
    case SAVE_TEMPLATE_FAIL:
    case SAVE_TIME_PERIOD_FAIL:
    case SAVE_CATEGORY_FAIL:
    case SAVE_SERVICE_COUNT_FAIL:
    case SAVE_PROFESSIONAL_COUNT_FAIL:
    case PROFILE_UPDATE_FAIL:
    case LANGUAGE_SELECTOR_FAIL:
    case PROFILE_PHOTO_UPDATE_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default auth;
