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
} from "./setup.type";
import { toast } from "react-toastify";

import SetupServices from "../../../services/Setup/setup.service";
import StripeServices from "../../../services/Stripe/stripe.service";

export const setupPlan = (payload) => (dispatch) => {
  return SetupServices.setPlan(payload)
    .then((response) => {
      let message = response.data.msg;
      if (response.data.status) {
        toast.success(message);
        dispatch({
          type: SAVE_SUBSCRIPTION_SUCCESS,
          payload: { current_plan : response.data.data }
        });
        return { status: true };
      } else {
        toast.error(message);
        dispatch({
          type: SAVE_SUBSCRIPTION_FAIL,
        });
        return { status: false };
      }
    })
    .catch();
};

export const setupPaidPlan = (payload) => (dispatch) => {
  return StripeServices.setSubscription(payload)
    .then((response) => {
      let message = response.data.msg;
      if (response.data.status) {
        toast.success(message);
        dispatch({
          type: SAVE_SUBSCRIPTION_SUCCESS,
          payload: { current_plan : response.data.data }
        });
        return { status: true };
      } else {
        toast.error(message);
        dispatch({
          type: SAVE_SUBSCRIPTION_FAIL,
        });
        return { status: false };
      }
    })
    .catch();
};

export const setupTheme = (payload, headersProps) => (dispatch) => {
  return SetupServices.setTemplate(payload, headersProps)
    .then((response) => {
      let message = response.data.msg;
      if (response.data.status) {
        toast.success(message);
        dispatch({
          type: SAVE_TEMPLATE_SUCCESS,
          payload: response.data.data,
        });
        return { status: true };
      } else {
        toast.error(message);
        dispatch({
          type: SAVE_TEMPLATE_FAIL,
        });
        return { status: false };
      }
    })
    .catch();
};

export const setupTimePeriod = (payload, headersProps) => (dispatch) => {
  return SetupServices.setPeriod(payload, headersProps)
    .then((response) => {
      let message = response.data.msg;
      if (response.data.status) {
        toast.success(message);
        dispatch({
          type: SAVE_TIME_PERIOD_SUCCESS,
          payload: { time_selection:true },
        });
        return { status: true };
      } else {
        toast.error(message);
        dispatch({
          type: SAVE_TIME_PERIOD_FAIL,
        });
        return { status: false };
      }
    })
    .catch();
};

export const setupCategory = (payload,categoryName) => (dispatch) => {
  return SetupServices.setCategory(payload)
    .then((response) => {
      let message = response.data.msg;
      if (response.data.status) {
        toast.success(message);
        dispatch({
          type: SAVE_CATEGORY_SUCCESS,
          payload: { service_categories_id:response.data.data.category_id, category_name : categoryName }
        });
        return { status: true };
      } else {
        toast.error(message);
        dispatch({
          type: SAVE_CATEGORY_FAIL,
        });
        return { status: false };
      }
    })
    .catch();
};

export const setupService = (payload, headersProps) => (dispatch) => {
  return SetupServices.saveService(payload, headersProps)
    .then((response) => {
      let message = response.data.msg;
      if (response.data.status) {
        toast.success(message);
        dispatch({
          type: SAVE_SERVICE_COUNT_SUCCESS,
          payload: 1,
        });
        return { status: true };
      } else {
        toast.error(message);
        dispatch({
          type: SAVE_SERVICE_COUNT_FAIL,
        });
        return { status: false };
      }
    })
    .catch();
};

export const setupProfessional = (payload, headersProps) => (dispatch) => {
  return SetupServices.saveProfessional(payload, headersProps)
    .then((response) => {
      let message = response.data.msg;
      if (response.data.status) {
        toast.success(message);
        dispatch({
          type: SAVE_PROFESSIONAL_COUNT_SUCCESS,
          payload: 1,
        });
        return { status: true };
      } else {
        toast.error(message);
        dispatch({
          type: SAVE_PROFESSIONAL_COUNT_FAIL,
        });
        return { status: false };
      }
    })
    .catch((e) => {
      console.log('setup service',e);
    });
};