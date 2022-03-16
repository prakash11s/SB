import React from "react";
import { useTranslation } from "react-i18next";

const BookingAcceptReject = ({ setAcceptRejectPayload, acceptRejectBooking, toggleRejectModal }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="modal-body pt-1">
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Reject Note</label>
          <textarea onChange={(event) => {
            setAcceptRejectPayload(event.target.value);
          }} className="form-control rounded-0 fc-hight mt-2" id="exampleFormControlTextarea1" rows="5"></textarea>
        </div>
      </div>
      <div className="modal-footer justify-content-sm-end pt-3">
        <button type="button" className="btn cancel-btn" onClick={toggleRejectModal}>
          {t("CLOSE")}
        </button>
        <button
          type="button"
          onClick={() => {
            setAcceptRejectPayload();
            acceptRejectBooking("Rejected");
            toggleRejectModal()
          }}
          className="btn save-btn"
        >
          {t("SAVE")}
        </button>
      </div>
    </>
  );
};

export default BookingAcceptReject;
