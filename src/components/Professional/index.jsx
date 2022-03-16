import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Common/Loader";
import ProfessionalsServices from "../../services/Professional/Professional.service";
import ModalHOC from "../Common/Modal";
import ConfirmBox from "../Common/ConfirmBox";

const Professionals = () => {
  const { t } = useTranslation();
  const [professionalsList, setProfessionalsList] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProfessionalId, setSelectedProfessionalId] =
    useState(undefined);
  const [selectedProfessionalStatus, setSelectedProfessionalStatus] =
    useState(undefined);
  const toggleIsDisabledModal = () => {
    setIsDisabled(!isDisabled);
  };
  const toggleIsDeleteModal = () => {
    setIsDelete(!isDelete);
  };

  useEffect(() => {
    setIsLoading(true);
    ProfessionalsServices.getProfessionalsList()
      .then((response) => {
        setIsLoading(false);
        if (response.data.status) {
          setProfessionalsList(response.data.data);
        } else {
          console.log(response);
        }
      })
      .catch();
  }, []);

  const handleChangeConfirm = () => {
    setIsLoading(true);
    let payload = {
      id: selectedProfessionalId,
      status: selectedProfessionalStatus,
    };
    ProfessionalsServices.changeProfessionalStatus(payload)
      .then((response) => {
        setIsLoading(false);
        setIsDisabled(false);
        if (response.data.data.hasOwnProperty("not_disabled")) {
          toast.error(response.data.data.not_disabled);
        } else if (response.data.status) {
          let updatedProfessionalList = professionalsList.map((el) =>
            el.id === selectedProfessionalId
              ? { ...el, status: selectedProfessionalStatus }
              : el
          );
          setProfessionalsList(updatedProfessionalList);
          toast.success(response.data.msg);
        } else {
          toast.error(response.data.msg);
        }
      })
      .catch();
  };

  const handleDeleteConfirm = () => {
    setIsLoading(true);
    let payload = { id: selectedProfessionalId };
    ProfessionalsServices.deleteProfessional(payload)
      .then((response) => {
        setIsLoading(false);
        setIsDelete(false);
        if (response.data.data.hasOwnProperty("not_deleted")) {
          toast.error(response.data.data.not_deleted);
        } else if (response.data.status) {
          let updatedProfessionalList = professionalsList.filter(
            (el) => el.id !== selectedProfessionalId
          );
          setProfessionalsList(updatedProfessionalList);
          toast.success(response.data.data.deleted);
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
          <h1 className="app-page-title">{t("PROFESSIONAL")}</h1>
        </div>
        <div className="container-xl">
          <Link className="addslot-link " to="/add_professional">
            <span className="nav-link-text">+ {t("ADD_PROFESSIONAL")}</span>
          </Link>

          <div className="row g-4 mb-4">
            {isLoading ? <Loader type="dots" /> : professionalsList &&
              professionalsList.length !== 0 &&
              professionalsList.map((professional) => {
                return (
                  <div className="col-sm-6 col-lg-3" key={professional.id}>
                    <div className="app-card professional-card-stat app-card-stat">
                      <div className="app-card-body">
                        <div
                          className={`professional-card-list ${professional.status}`}
                        >
                          <img
                            className="pcl-img"
                            src={professional.profile_photo_path}
                            alt={professional.name}
                          />
                          <h5>{professional.name}</h5>
                          <p>{professional.avg_experience}+ {t("YEAR_EXPERIENCE")}</p>
                          <div className="action-detail-btn">
                            <ul>
                              {professional.status === "Enabled" && (
                                <>
                                  <Link to={{ pathname: "/professional_details", state: { id: professional.id } }}>
                                    <li className="mb-2">
                                      <button className="btn btn-Detail">
                                        <img
                                          src={`assets/img/ic_detail.png`}
                                          width="15px"
                                          alt="detail"
                                        />
                                        {t("DETAIL")}
                                      </button>
                                    </li>
                                  </Link>
                                  <Link to={{ pathname: "/update_professional", state: { id: professional.id } }}>
                                    <li className="mb-2">
                                      <button className="btn btn-edit">
                                        <img
                                          src={`assets/img/ic_edit.png`}
                                          width="15px"
                                          alt="edit"
                                        />
                                        {t("EDIT")}
                                      </button>
                                    </li>
                                  </Link>
                                </>
                              )}
                              <li
                                className="mb-2"
                                onClick={() => {
                                  toggleIsDisabledModal();
                                  setSelectedProfessionalId(professional.id);
                                  setSelectedProfessionalStatus(
                                    professional.status === "Enabled"
                                      ? "Disabled"
                                      : "Enabled"
                                  );
                                }}
                              >
                                <button className="btn btn-disable">
                                  <img
                                    src={`assets/img/ic_disable_user.png`}
                                    width="15px"
                                    alt="disable"
                                  />
                                  {professional.status === "Enabled"
                                    ? t('DISABLE') : t('ENABLE')}
                                </button>
                              </li>
                              <li
                                className="mb-2"
                                onClick={() => {
                                  toggleIsDeleteModal();
                                  setSelectedProfessionalId(professional.id);
                                }}
                              >
                                <button className="btn btn-delete">
                                  <img
                                    src={`assets/img/ic_delete.png`}
                                    width="15px"
                                    alt="delete"
                                  />
                                  {t("DELETE")}
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
                    title={t('TITLE_CONFIRMATION') + ` ${selectedProfessionalStatus === "Enabled"
                      ? t('ENABLE') : t('DISABLE')
                      }?`}
                    confirmTitle={t('YES') + `, ${selectedProfessionalStatus === "Enabled"
                      ? t('ENABLE') : t('DISABLE')
                      } ` + t('IT')}
                    handleConfirm={handleChangeConfirm}
                    handleCancel={toggleIsDisabledModal}
                  />
                }
              />
            )}
            {isDelete && (
              <ModalHOC
                isModalOpen={isDelete}
                toggleModal={toggleIsDeleteModal}
                modalTitle={""}
                children={
                  <ConfirmBox
                    isLoading={isLoading}
                    title={`${t("TITLE_CONFIRMATION")} ${t('DELETE')}?`}
                    confirmTitle={t('DELETE_IT')}
                    handleConfirm={handleDeleteConfirm}
                    handleCancel={toggleIsDeleteModal}
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

export default Professionals;
