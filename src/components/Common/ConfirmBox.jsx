import React from "react";
import { useTranslation } from "react-i18next";
import Loader from "../Common/Loader";

const ConfirmBox = ({ isLoading, title, confirmTitle,handleConfirm, handleCancel }) => {
  const { t } = useTranslation();
 
  return (
    <>
      <div className="modal-body pt-3">
        <div className="plan_info">
          <p>{ title }</p>
        </div>
      </div>
      <div className="modal-footer justify-content-sm-end pt-3">
        <button type="button" className="btn save-btn" onClick={handleConfirm}>
          {isLoading ? <Loader color="#e0b154" type="dots" /> : confirmTitle}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="btn cancel-btn"
        >
          {t("CANCEL")}
        </button>
      </div>
    </>
  );
};

export default ConfirmBox;