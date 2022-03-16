import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SetupServices from "../../services/Setup/setup.service";
import SetupStepper from "../Setup/SetupStepper";
import SubscriptionPlan from "../Setup/SubscriptionPlan";
import Subscription from "../Setup/Subscription";
import ModalHOC from "../Common/Modal";
import Subscribe from "./Subscribe";

const Setup = () => {
  const {
    template_id,
    time_selection,
    service_categories_id,
    provider_services,
    professional,
  } = useSelector((state) => state.auth?.user?.provider_info);
  const currentPlan = useSelector((state) => state.auth?.user?.current_plan);
  const [defaultStep, setDefaultStep] = useState(null);
  const [plan, setPlan] = useState([]);
  const [isSubscription, setIsSubscription] = useState(
    !currentPlan ? true : false
  );
  const toggleSubscriptionModal = () => {
    setIsSubscription(!isSubscription);
  };
  const [selectedPlan, setSelectedPlan] = useState(null);
  const setSelectedPlanDetails = (sPlan) => {
    setSelectedPlan(sPlan);
  };
  useEffect(() => {
    if (template_id === null) {
      setDefaultStep(0);
    } else if (time_selection === false) {
      setDefaultStep(1);
    } else if (service_categories_id === null) {
      setDefaultStep(2);
    } else if (provider_services === 0) {
      setDefaultStep(3);
    } else if (professional === 0) {
      setDefaultStep(4);
    }
    if (!currentPlan) {
      SetupServices.getSubscriptionPlan().then((response) => {
        if (response.data.status) {
          setPlan(response.data.data);
        }
      });
    }
  }, []);
  
  return (
    <>
      {!currentPlan ? (
        <>
          {isSubscription ? (
            <ModalHOC
              isModalOpen={isSubscription}
              modalTitle=""
              children={
                <Subscription
                  toggleSubscriptionModal={toggleSubscriptionModal}
                  plans={plan.free_plan}
                />
              }
            />
          ) : !selectedPlan ? (
            <SubscriptionPlan
              toggleSubscriptionModal={toggleSubscriptionModal}
              plans={plan.paid_plan}
              setSelectedPlanDetails={setSelectedPlanDetails}
            />
          ) : (
            <Subscribe setSelectedPlanDetails={setSelectedPlanDetails} selectedPlan={selectedPlan} />
          )}
        </>
      ) : (defaultStep >= 0 ? (
        <>
          <SetupStepper defaultStep={defaultStep} setDefaultStep={setDefaultStep} />
        </>
      ) : (
        <></>
      ))}
    </>
  );
};
export default Setup;
