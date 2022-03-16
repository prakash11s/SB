import React from "react";
import { useTranslation } from "react-i18next";

const SubscriptionPlan = ({
  toggleSubscriptionModal,
  plans,
  setSelectedPlanDetails,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="app-content pt-3 p-md-3 p-lg-4 mtop60">
        <div className="container-xl">
          <h1 className="app-page-title" onClick={toggleSubscriptionModal}>
            <span className="back-icon-prev"><img src="assets/img/ic_back.png" width="20px" alt="" /></span>{t("SUBSCRIPTION_PLAN")}
          </h1>
          <div className="progress-bar-steps"></div>
          <hr className="mb-4" />
          <div className="row g-4">
            <div className="col-12 col-md-12">
              <div className="app-card app-card-settings p-4">
                <div className="subscription-plan">
                  <div className="row">
                    {plans &&
                      plans.map((plan) => {
                        return (
                          <div key={plan.id} className="col-lg-4 col-md-6 mb-4">
                            <div className="subscription-plan-list basic-plan">
                              <h3>{plan.plan_name}</h3>
                              <h2>${plan.plan_price}</h2>
                              <h6>{plan.plan_description}</h6>
                              <div className="included-info">
                                <h4>{t("INCLUDED")}</h4>
                                <ul>
                                  {plan.get_plan_feature.map((feature) => {
                                    return (
                                      <li key={feature.id}>
                                        {feature.feature}
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                              <button
                                type="button"
                                className="btn choose-plan-btn mt-4"
                                onClick={() => {
                                  setSelectedPlanDetails(plan);
                                }}
                              >
                                {t("CHOOSE_PLAN")}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPlan;
