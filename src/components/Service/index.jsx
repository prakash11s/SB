import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Common/Loader";
import ServiceServices from "../../services/Service/Service.service";
import ModalHOC from "../Common/Modal";
import ConfirmBox from "../Common/ConfirmBox";

const Services = () => {
  const { t } = useTranslation();
  const [servicesList, setServicesList] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(undefined);
  const [selectedServiceStatus, setSelectedServiceStatus] = useState(undefined);
  const toggleIsDisabledModal = () => {
    setIsDisabled(!isDisabled);
  };

  useEffect(() => {
    setIsLoading(true);
    ServiceServices.getServicesList()
      .then((response) => {
        setIsLoading(false);
        if (response.data.status) {
          setServicesList(response.data.data);
        } else {
          console.log(response);
        }
      })
      .catch();
  }, []);

  const handleConfirm = () => {
    setIsLoading(true);
    let payload = { service_id: selectedServiceId, status: selectedServiceStatus };
    ServiceServices.changeServiceStatus(payload)
      .then((response) => {
        setIsLoading(false);
        setIsDisabled(false);
        if (response.data.data.hasOwnProperty("not_disabled")) {
          toast.error(response.data.data.not_disabled);
        } else if (response.data.status) {
          let updatedServicesList = servicesList.map(el => el.id === selectedServiceId ? { ...el, status: selectedServiceStatus } : el);
          setServicesList(updatedServicesList);
          toast.success(response.data.msg);
        } else {
          toast.error(response.data.msg);
        }
      })
      .catch();
  };
  return (
    <>
      <div className="app-content mt-4 px-3 px-md-3 px-lg-4">
        <div className="container-xl">
          <h1 className="app-page-title">{t("SERVICES")}</h1>
        </div>
        <div className="container-xl">
          <Link className="addslot-link " to="/add_service">
            <span className="nav-link-text">+ {t("ADD_SERVICE_TITLE")}</span>
          </Link>

          <div className="row g-4 mb-4">
            {isLoading ? <Loader type="dots" /> :
              servicesList &&
              servicesList.length !== 0 &&
              servicesList.map((service) => {
                return (
                  <div className="col-sm-6 col-lg-3" key={service.id}>
                    <div className="app-card services-card-stat app-card-stat">
                      <div className="app-card-body">
                        <div className={`services-card-list ${service.status}`}>
                          <img className="scl-img"
                            src={service.services_images[0].service_image_path}
                            alt={service.service_name}
                          />
                          <h5>{service.service_name}</h5>
                          <div className="action-detail-btn">
                            <ul>
                              <Link to={{ pathname: "/service_details", state: { id: service.id } }}>
                                <li className="mb-2">
                                  <button className="btn btn-Detail">
                                    <img src={`assets/img/ic_detail.png`} width="15px" alt="detail" /> {t("DETAIL")}
                                  </button>
                                </li>
                              </Link>
                              {service.status === 'Enabled' &&
                                <Link to={{ pathname: "/update_service", state: { id: service.id } }}>
                                  <li className="mb-2">
                                    <button className="btn btn-edit"><img src={`assets/img/ic_edit.png`} width="15px" alt="edit" /> {t("EDIT")}</button>
                                  </li>
                                </Link>}
                              <li
                                className="mb-2"
                                onClick={() => {
                                  toggleIsDisabledModal();
                                  setSelectedServiceId(service.id);
                                  setSelectedServiceStatus(
                                    service.status === "Enabled"
                                      ? "Disabled"
                                      : "Enabled"
                                  );
                                }}
                              >
                                <button className="btn btn-disable">
                                  <img src={`assets/img/ic_disable_user.png`} width="15px" alt="disable" /> {service.status === "Enabled"
                                    ? t('DISABLE') : t('ENABLE')}
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            {isDisabled && (
              <ModalHOC
                isModalOpen={isDisabled}
                toggleModal={toggleIsDisabledModal}
                modalTitle={""}
                children={
                  <ConfirmBox
                    isLoading={isLoading}
                    title={`${t("TITLE_CONFIRMATION")} ${selectedServiceStatus === 'Enabled' ? t('ENABLE') : t('DISABLE')}?`}
                    confirmTitle={t('YES') + `, ${selectedServiceStatus === 'Enabled' ? t('ENABLE') : t('DISABLE')} ` + t('IT')}
                    handleConfirm={handleConfirm}
                    handleCancel={toggleIsDisabledModal}
                  />
                }
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
