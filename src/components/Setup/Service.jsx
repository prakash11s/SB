import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { setupService } from "../../store/action/Setup/setup.action";
import Form from "../Service/Form";

const Service = ({ prevStep, nextStep }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { provider_services } = useSelector(
    (state) => state.auth?.user?.provider_info
  );

  const [isLoading, setIsLoading] = useState(false);
  const [serviceImages, setServiceImages] = useState();

  const handleSubmit = (value) => {
    setIsLoading(true);
    const formData = new FormData();

    let tagValue = value.tag ? value.tag.map((obj) => obj.value).join(",") : "";
    let serviceType = value.service_type
      ? value.service_type.map((obj) => obj.value).join(",")
      : "";
    let paymentType = value.payment_type
      ? value.payment_type.map((obj) => obj.value).join(",")
      : "";
    formData.append("service_name", value.service_name);
    formData.append("service_value", value.service_value);
    formData.append("tag", tagValue);
    formData.append("description", value.description);
    formData.append("duration_minutes", value.duration_minutes);
    formData.append("service_type", serviceType);
    formData.append("payment_type", paymentType);
    formData.append("service_image_primary", value.service_image_primary);

    serviceImages.map((obj,i) => {
      formData.append(`service_image[${i}]`, obj.file);
    });

    const headersProps = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    dispatch(setupService(formData, headersProps))
      .then((response) => {
        setIsLoading(false);
        if (response.status) {
          nextStep();
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
            <br />
            {provider_services !== 0 && (
              <div className="col-auto d-flex justify-content-end mb-2">
                <button
                  onClick={nextStep}
                  type="button"
                  className="btn app-btn-primary"
                >
                  {t("SKIP")}
                </button>
              </div>
            )}
            <br />
            <Form
              inNew={true}
              isLoading={isLoading}
              prevStep={prevStep}
              serviceImages={serviceImages}
              setServiceImages={setServiceImages}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
