import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Common/Loader";
import PromocodeServices from "../../services/Promocode/Promocode.service";
import ModalHOC from "../Common/Modal";
import ConfirmBox from "../Common/ConfirmBox";

const Promocode = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [promocodeList, setPromocodeList] = useState([]);
  const [selectedPromocodeId, setSelectedPromocodeId] = useState(undefined);
  const [selectedPromocodeStatus, setSelectedPromocodeStatus] =
    useState(undefined);
  const toggleIsDisabledModal = () => {
    setIsDisabled(!isDisabled);
  };
  const toggleIsDeleteModal = () => {
    setIsDelete(!isDelete);
  };

  useEffect(() => {
    setIsLoading(true);
    PromocodeServices.getPromocodeList()
      .then((response) => {
        setIsLoading(false);
        if (response.data.status) {
          setPromocodeList(response.data.data);
        } else {
          console.log(response);
        }
      })
      .catch();
  }, []);

  const handleChangeConfirm = () => {
    setIsLoading(true);
    let payload = { id: selectedPromocodeId, status: selectedPromocodeStatus };
    PromocodeServices.changePromocodeStatus(payload)
      .then((response) => {
        setIsLoading(false);
        setIsDisabled(false);
        if (response.data.status) {
          let updatedPromocodeList = promocodeList.map((el) =>
            el.id === selectedPromocodeId
              ? { ...el, status: selectedPromocodeStatus }
              : el
          );
          setPromocodeList(updatedPromocodeList);
          toast.success(response.data.msg);
        } else {
          toast.error(response.data.msg);
        }
      })
      .catch();
  };

  const handleDeleteConfirm = () => {
    setIsLoading(true);
    let payload = { promocode_id: selectedPromocodeId };
    PromocodeServices.deletePromocode(payload)
      .then((response) => {
        setIsLoading(false);
        setIsDelete(false);
        if (response.data.status) {
          let updatedPromocodeList = promocodeList.filter(
            (el) => el.id !== selectedPromocodeId
          );
          setPromocodeList(updatedPromocodeList);
          toast.success(response.data.msg);
        } else {
          toast.error(response.data.msg);
        }
      })
      .catch();
  };

  return (
    <>
      <div className="app-content pt-3 p-md-3 p-lg-4">
        <div className="container-xl">
          <h1 className="app-page-title">{t("PROMOCODE")}</h1>
        </div>
        <div className="container-xl">
          <Link className="addslot-link " to="/add_promocode">
            <span className="nav-link-text">+ {t("ADD_PROMOCODE")}</span>
          </Link>

          <div className="row g-4 mb-4">
            {isLoading ? <Loader type="dots" /> : promocodeList &&
              promocodeList.length !== 0 &&
              promocodeList.map((promocode) => {
                return (
                  <div className="col-sm-6 col-md-4 col-lg-3" key={promocode.id}>
                    <div className="app-card app-card-stat">
                      <div className="app-card-body promo-code-offer">
                        <div
                          className={`professional-card-list ${promocode.status}`}
                        >
                          <span className="promocode-card-image">
                            <img
                              src={promocode.promocode_photo_path}
                              alt={promocode.promocode_name}
                            />
                          </span>
                          <h5>{promocode.promocode_name}</h5>
                          <div className="action-detail-btn">
                            <ul>
                              <Link to={{ pathname: "/promocode_details", state: { id: promocode.id } }}>
                                <li className="mb-2">
                                  <button className="btn btn-Detail">
                                    <img
                                      src="assets/img/ic_detail.png"
                                      width="15px"
                                      alt="detail"
                                    />
                                    {t("DETAIL")}
                                  </button>
                                </li>
                              </Link>
                              {promocode.status === 'Enabled' &&
                                <Link to={{ pathname: "/update_promocode", state: { id: promocode.id } }}>
                                  <li className="mb-2">
                                    <button className="btn btn-edit">
                                      <img
                                        src="assets/img/ic_edit.png"
                                        width="15px"
                                        alt="edit"
                                      />
                                      {t("EDIT")}
                                    </button>
                                  </li>
                                </Link>}
                              <li
                                className="mb-2"
                                onClick={() => {
                                  toggleIsDisabledModal();
                                  setSelectedPromocodeId(promocode.id);
                                  setSelectedPromocodeStatus(
                                    promocode.status === "Enabled"
                                      ? "Disabled"
                                      : "Enabled"
                                  );
                                }}
                              >
                                <button className="btn btn-disable">
                                  <img
                                    src="assets/img/ic_disable_user.png"
                                    width="15px"
                                    alt="disable"
                                  />
                                  {promocode.status === "Enabled"
                                    ? t('DISABLE') : t('ENABLE')}
                                </button>
                              </li>
                              <li className="mb-2"
                                onClick={() => {
                                  toggleIsDeleteModal();
                                  setSelectedPromocodeId(promocode.id);
                                }}>
                                <button className="btn btn-delete">
                                  <img
                                    src="assets/img/ic_delete.png"
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
                    title={t('TITLE_CONFIRMATION') + ` ${selectedPromocodeStatus === "Enabled"
                        ? t('ENABLE') : t('DISABLE')
                      }?`}
                    confirmTitle={t('YES') + `, ${selectedPromocodeStatus === "Enabled"
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

export default Promocode;
