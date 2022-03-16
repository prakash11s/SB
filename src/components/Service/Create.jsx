import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';

import ServiceServices from "../../services/Service/Service.service";
import Form from "./Form";

const Create = () => {
  const history = useHistory();
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

    serviceImages && serviceImages.map((obj, i) => {
      formData.append(`service_image[${i}]`, obj.file);
    });

    const headersProps = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    ServiceServices.saveService(formData, headersProps)
      .then((response) => {
        setIsLoading(false);
        if (response.data.status) {
          if (response.status) {
            toast.success(response.data.msg);
            history.replace("/services");
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
            <Form
              inNew={true}
              isLoading={isLoading}
              prevStep={false}
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

export default Create;
