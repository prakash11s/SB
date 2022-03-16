import React, { useState, useEffect } from "react";
import Stepper from "react-stepper-horizontal";

import Theme from "./Theme";
import Schedule from "../Common/Schedule";
import Category from "./Category";
import Service from "./Service";
import Professional from "./Professional";

const steps = [
  { title: "Theme" },
  { title: "Availability Period" },
  { title: "Category" },
  { title: "Service" },
  { title: "Professional" },
];

const SetupStepper = ({ defaultStep, setDefaultStep }) => {

  const [step, setStep] = useState(defaultStep);

  useEffect(() => {
    
  }, [step])
  const renderStepComponent = () => {
    switch (defaultStep) {
      case 0:
        return <Theme nextStep={nextStep} />;
      case 1:
        return <Schedule isSetup={true} prevStep={prevStep} nextStep={nextStep} />;
      case 2:
        return <Category prevStep={prevStep} nextStep={nextStep} />;
      case 3:
        return <Service prevStep={prevStep} nextStep={nextStep} />;
      case 4:
        return <Professional prevStep={prevStep} />;
      default:
        break;
    }
  };

  const nextStep = () => {
    setStep(step + 1);
    setDefaultStep(defaultStep + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
    setDefaultStep(defaultStep - 1);
  };

  return (
    <>
      <div className="app-content pt-3 p-md-3 p-lg-4 mtop60">
        <div className="container-xl">
          <h1 className="app-page-title">Account Setup</h1>
          <div className="progress-bar-steps">
            <Stepper
              steps={steps}
              activeColor={"#E0B154"}
              completeColor={"#E0B154"}
              activeStep={defaultStep}
            />
          </div>
          {renderStepComponent(defaultStep)}
        </div>
      </div>
    </>
  );
};

export default SetupStepper;
