import React from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";

const TimeSlot = ({ toggleTimeSlotModal, slots }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="modal-body px-3">
        <div className="time-slot-popup">
          <ul>
            {
              slots.map((slot,i) => {
                return (
                  <li key={i}>
                    <span className={ slot.status }>{ moment(slot.time, "HH:mm:ss").format("LT") }</span>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
      <div className="modal-footer justify-content-sm-end pt-3">
        <button
          type="button"
          onClick={toggleTimeSlotModal}
          className="btn cancel-btn"
        >
          {t("CLOSE")}
        </button>
      </div>
    </>
  );
};

export default TimeSlot;
