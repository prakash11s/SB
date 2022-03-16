import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { setupPlan } from "../../store/action/Setup/setup.action";
import Loader from "../Common/Loader";

const Subscription = ({ toggleSubscriptionModal, plans }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    const planId = plans[0]?.id ? { plan_id: plans[0]?.id } : undefined;
    if (planId) {
      dispatch(setupPlan(planId))
        .then((response) => {
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      <div className="modal-body pt-3">
        <div className="plan_info">
          <h4>{t("FREE_PLAN_TITLE")}</h4>
          <p>{t("FREE_PLAN_DESCRIPTION")}</p>
        </div>
      </div>
      <div className="modal-footer justify-content-sm-end pt-3">
        <button type="button" className="btn cancel-btn" onClick={handleSubmit}>
          {isLoading ? <Loader color="#e0b154" type="dots" /> : t("TRY_FREE")}
        </button>
        <button
          type="button"
          onClick={toggleSubscriptionModal}
          className="btn save-btn"
        >
          {t("SUBSCRIPTION")}
        </button>
      </div>
    </>
  );
};

export default Subscription;
