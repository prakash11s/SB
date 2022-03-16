import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const ProfessionalTimeslot = ({ toggleTimeSlotModal, slots, setSlots }) => {
  const { t } = useTranslation();
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [daySlots, setDaySlots] = useState([]);
  const [dayOff, setDayOff] = useState(false);
  const [dayRepeat, setDayRepeat] = useState(false);
  const [isChanges, setIsChanges] = useState(false);

  const monthYear = `${new Date().toLocaleString("default", {
    month: "long",
  })} ${new Date().getFullYear()}`;

  useEffect(() => {
    setDaySlots(slots.find((obj) => obj.day === selectedDay).value);
    setDayRepeat(slots.find((obj) => obj.day === selectedDay).repeat);
    setDayOff(slots.find((obj) => obj.day === selectedDay).day_off);
  }, [selectedDay, isChanges]);

  const handleChangeDayRepeat = () => {
    const selectedSlot = slots;
    let dayIndex = slots.findIndex((obj) => obj.day === selectedDay);
    let repeatStatus = !selectedSlot[dayIndex].repeat;
    selectedSlot[dayIndex].repeat = repeatStatus;
    selectedSlot[dayIndex].day_off = false;
    
    let repeatSlot = slots[dayIndex].value
      .filter((obj) => (obj.is_selected === true ? obj.slot : null))
      .map((obj) => obj.slot);

    selectedSlot.map((dayObj) => {
      if (dayObj.day_off === false && dayObj.day !== selectedDay) {
        dayObj.value.length !== 0 &&
          dayObj.value.map((slotObj) => {
            if (repeatSlot.includes(slotObj.slot)) {
              slotObj.is_selected = repeatStatus;
            }
          });
      }
    });

    setSlots(selectedSlot);
    setIsChanges(!isChanges);
  };

  const handleChangeDayOff = () => {
    const selectedSlot = slots;
    let dayIndex = slots.findIndex((obj) => obj.day === selectedDay);
    selectedSlot[dayIndex].day_off = !selectedSlot[dayIndex].day_off;
    selectedSlot[dayIndex].repeat = false;
    selectedSlot[dayIndex].value.map((obj) => (obj.is_selected = false));
    setSlots(selectedSlot);
    setIsChanges(!isChanges);
  };

  const handleChangeSlot = (key) => {
    const selectedSlot = slots;
    let dayIndex = slots.findIndex((obj) => obj.day === selectedDay);
    let slotIndex = slots[dayIndex].value.findIndex((obj) => obj.key === key);
    selectedSlot[dayIndex].day_off = false;
    selectedSlot[dayIndex].value[slotIndex].is_selected =
      !selectedSlot[dayIndex].value[slotIndex].is_selected;
    setSlots(selectedSlot);
    setIsChanges(!isChanges);
  };

  return (
    <>
      <div className="modal-body p-0 px-3">
        <div className="add-timeslot">
          <div className="slot_wrap">
            <div className="select_slot_day">
              <ul>
                {slots.map((slot) => {
                  return (
                    <li
                      key={slot.day}
                      onClick={() => setSelectedDay(slot.day)}
                      className={slot.day === selectedDay ? "d_selected" : ""}
                    >
                      {slot.day}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="timeslot_cover">
              <div className="row mb-3 d-flex justify-content-between align-items-center">
                <div className="col-5 rd_align text-start">
                  <h4>{monthYear}</h4>
                </div>
                <div className="col-7 rd_align">
                  <div className="repeat-dayoff">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="dayRepeat"
                      id="dayRepeat"
                      checked={dayRepeat === true ? true : false}
                      onClick={handleChangeDayRepeat}
                    />
                    <label
                      className="form-check-label me-3"
                      htmlFor="dayRepeat"
                    >
                      {t("REPEAT")}
                    </label>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="dayOff"
                      id="dayOff"
                      checked={dayOff === true ? true : false}
                      onClick={handleChangeDayOff}
                    />
                    <label className="form-check-label" htmlFor="dayOff">
                      {t("DAY_OFF")}
                    </label>
                  </div>
                </div>
              </div>
              <div className="select_slot_time">
                <ul>
                  {daySlots.map((obj) => {
                    return (
                      <li
                        className={obj.is_selected ? "t_selected" : ""}
                        key={obj.key}
                        onClick={() => handleChangeSlot(obj.key)}
                      >
                        {obj.slot}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="modal-footer model-footer-fixed justify-content-sm-end pt-3">
        <button
          type="button"
          onClick={toggleTimeSlotModal}
          className="btn cancel-btn"
        >
          {t("CANCEL")}
        </button>
        <button
          onClick={toggleTimeSlotModal}
          type="submit"
          className="btn save-btn"
        >
          {t("SAVE")}
        </button>
      </div> */}
    </>
  );
};

export default ProfessionalTimeslot;
