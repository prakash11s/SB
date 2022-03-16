import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import moment from "moment";
import { toast } from 'react-toastify';

import PromocodeServices from "../../services/Promocode/Promocode.service";
import {
  PROMOCODE_DURATION_FORMAT,
  DISCOUNT_FIX_PERCENTAGE,
  DISCOUNT_FIX_AMOUNT,
  DURATION_DATE_RANGE,
  DISCOUNT_APPLY_SERVICE,
  DISCOUNT_APPLY_CART,
  DISCOUNT_APPLY_SERVICE_CART
} from "../../utility/constants";
import Form from "./Form";

const Update = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const params = useLocation();
  const [promocodeDetails, setPromocodeDetails] = useState([]);
  const serviceCategoryId = useSelector(
    (state) => state.auth?.user?.provider_info.service_categories_id
  );
  useEffect(() => {
    if(!params?.state?.id){
      history.replace("/promocode");
    }else{
    const payload = { promocode_id: params.state.id };
    PromocodeServices.getPromocodeDetails(payload)
      .then((response) => {
        if (response.data.status) {
          setPromocodeDetails(response.data.data);
        } else {
          console.log(response);
        }
      })
      .catch();
    }
  }, []);
  const handleSubmit = (values) => {
 
    setIsLoading(true);
    const formData = new FormData();
    formData.append("promocode_id", params.state.id);
    formData.append("promocode_name", values.promocode_name);
    formData.append("promocode", values.promocode);
    formData.append("discount_type", values.discount_type.value);
    if(values.discount_type.value === DISCOUNT_FIX_AMOUNT){
      formData.append("fix_amount", values.fix_amount);
    }else if(values.discount_type.value === DISCOUNT_FIX_PERCENTAGE){
      formData.append("fix_percentage", values.fix_percentage);
      formData.append("max_discount_amount", values.max_discount_amount);
    }
    formData.append("duration_type", values.duration_type.value);
    if(values.duration_type.value === DURATION_DATE_RANGE){
      formData.append("start_date", moment(values.start_date).format(PROMOCODE_DURATION_FORMAT));
      formData.append("end_date", moment(values.end_date).format(PROMOCODE_DURATION_FORMAT));
    }
    formData.append("discount_apply", values.discount_apply.value);
    if(values.discount_apply.label === DISCOUNT_APPLY_SERVICE){
      formData.append("service_category_id", serviceCategoryId);
      values.service_id && values.service_id.map((el,i) => formData.append("service_id["+i+"]", el.value));
    } else if(values.discount_apply.label === DISCOUNT_APPLY_CART){
      formData.append("cart_min_value", values.cart_min_value);
      formData.append("cart_max_value", values.cart_max_value);
    } else if(values.discount_apply.label === DISCOUNT_APPLY_SERVICE_CART){
      formData.append("service_category_id", serviceCategoryId);
      values.service_id && values.service_id.map((el,i) => formData.append("service_id["+i+"]", el.value));
      formData.append("cart_min_value", values.cart_min_value);
      formData.append("cart_max_value", values.cart_max_value);
    }
    formData.append("photos", values.photos);
    const headersProps = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    PromocodeServices.updatePromocode(formData, headersProps)
      .then((response) => {
        setIsLoading(false);
        if (response.data.status) {
          if (response.status) {
            toast.success(response.data.msg);
            history.replace("/promocode");
          }
        } else {
          toast.error(response.data.msg);
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      <div className="row g-4 settings-section">
        <div className="col-12 col-md-12">
          <div className="app-card app-card-settings shadow-sm p-4">
            { promocodeDetails && <Form
              isLoading={isLoading}
              handleSubmit={handleSubmit}
              promocodeDetails={promocodeDetails}
            /> }
          </div>
        </div>
      </div>
    </>
  );
};

export default Update;