import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import moment from "moment";
import { useTranslation } from "react-i18next";
import Loader from "../../components/Common/Loader";
import PromocodeServices from "../../services/Promocode/Promocode.service";

import {
  DISCOUNT_FIX_PERCENTAGE,
  DISCOUNT_FIX_AMOUNT,
  DURATION_DATE_RANGE,
  DISCOUNT_APPLY_SERVICE_VALUE,
  DISCOUNT_APPLY_CART_VALUE,
  DISCOUNT_APPLY_SERVICE_CART_VALUE,
  DATE_TIME_FORMAT
} from "../../utility/constants";

const Details = () => {

  const { t } = useTranslation();
  const history = useHistory();
  const params = useLocation();
  const [promocodeDetails, setPromocodeDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (!params?.state?.id) {
      history.replace("/promocode");
    } else {
      const payload = { promocode_id: params.state.id };
      PromocodeServices.getPromocodeDetails(payload)
        .then((response) => {
          setIsLoading(false);
          if (response.data.status) {
            setPromocodeDetails(response.data.data);
          } else {
            console.log(response);
          }
        })
        .catch();
    }
  }, []);

  return (
    <>
      <div className="g-4 settings-section">
        <div className="app-card app-card-settings">
          <div className='app-content pt-3 pt-md-3 pt-lg-4 pb-5'>
            <div className="container-xl">
              <div className="promocode-detail-wrap">
                {isLoading ? <Loader type="dots" /> : <div className="row">
                  <div className="col-lg-5 col-md-6">
                    <div className="promocode-left-slider">
                      <div className="promocode-list-image">
                        <div className="promocode-img" style={{ backgroundImage: `url(${promocodeDetails && promocodeDetails?.promocode_photo_path})` }} ></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-7 col-md-6">
                    <div className="promocode-right-content mt-3 mt-md-0">
                      <ul>
                        <li><span>{t("PROMOCODE_NAME")}:</span>{promocodeDetails && promocodeDetails?.promocode_name}</li>
                        <li className="pc-apply-code"><span>{t("PROMOCODE")}:</span> <p>{promocodeDetails && promocodeDetails?.promocode}</p></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="promocode-bottom-content">
                      <h6>{t("DISCOUNT_TYPE")}: {promocodeDetails && promocodeDetails?.discount_type}</h6>
                      {
                        promocodeDetails && promocodeDetails?.discount_type === DISCOUNT_FIX_PERCENTAGE &&
                        <ul>
                          <li><span>{t("FIX_PERCENTAGE")}:</span>{promocodeDetails && promocodeDetails?.fix_percentage}%</li>
                          <li><span>{t("MAX_DISC_AMOUNT")}:</span>{promocodeDetails && promocodeDetails?.max_discount_amount}</li>
                        </ul>
                      }
                      {
                        promocodeDetails && promocodeDetails?.discount_type === DISCOUNT_FIX_AMOUNT &&
                        <ul>
                          <li><span>{t("FIX_AMOUNT")}:</span>{promocodeDetails && promocodeDetails?.fix_amount}</li>
                        </ul>
                      }
                    </div>
                    <div className="promocode-bottom-content">
                      <h6>{t("DURATION")}: {promocodeDetails && promocodeDetails?.duration_type}</h6>
                      {
                        promocodeDetails && promocodeDetails?.duration_type === DURATION_DATE_RANGE &&
                        <ul>
                          <li><span>{t("START_DATE")}:</span>{promocodeDetails && moment(promocodeDetails?.start_date).format(DATE_TIME_FORMAT)}</li>
                          <li><span>{t("END_DATE")}:</span>{promocodeDetails && moment(promocodeDetails?.end_date).format(DATE_TIME_FORMAT)}</li>
                        </ul>
                      }
                      {
                        promocodeDetails && promocodeDetails?.duration_type === DURATION_DATE_RANGE &&
                        <ul>
                        </ul>
                      }
                    </div>
                    <div className="promocode-bottom-content">
                      <h6>{t("DISCOUNT_APPLIED_ON")}: {promocodeDetails && promocodeDetails?.discount_apply}</h6>
                      {
                        promocodeDetails && promocodeDetails?.discount_apply === DISCOUNT_APPLY_SERVICE_VALUE &&
                        <ul>
                          <li><span>{t("SERVICES")}</span>{promocodeDetails && promocodeDetails?.get_discount_apply?.map((service) => service.service_name).join(', ')}</li>
                        </ul>
                      }
                      {
                        promocodeDetails && promocodeDetails?.discount_apply === DISCOUNT_APPLY_CART_VALUE &&
                        <ul>
                          <li><span>{t("CART_MIN_VALUE")}</span>{promocodeDetails && promocodeDetails?.cart_min_value}</li>
                          <li><span>{t("CART_MAX_VALUE")}</span>{promocodeDetails && promocodeDetails?.cart_max_value}</li>
                        </ul>
                      }
                      {
                        promocodeDetails && promocodeDetails?.discount_apply === DISCOUNT_APPLY_SERVICE_CART_VALUE &&
                        <ul>
                          <li><span>{t("SERVICES")}</span>{promocodeDetails && promocodeDetails?.get_discount_apply?.map((service) => service.service_name).join(', ')}</li>
                          <li><span>{t("CART_MIN_VALUE")}</span>{promocodeDetails && promocodeDetails?.cart_min_value}</li>
                          <li><span>{t("CART_MAX_VALUE")}</span>{promocodeDetails && promocodeDetails?.cart_max_value}</li>
                        </ul>
                      }
                    </div>
                  </div>
                </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
