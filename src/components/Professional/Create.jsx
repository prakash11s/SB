import React, { useState, useEffect } from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';

import SetupServices from "../../services/Setup/setup.service";
import ProfessionalsServices from "../../services/Professional/Professional.service";
import Form from "./Form";

const Create = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [expertise, setExpertise] = useState([]);
  const [slots, setSlots] = useState([]);
  const [timeSlotError, setTimeSlotError] = useState("");
  const [priceMinValidation, setPriceMinValidation] = useState("");

  const onInit = async () => {
    try {
      const expertise = await SetupServices.getExpertiseList();
      const availabilityPeriod = await SetupServices.getAvailabilityPeriod();
      if (expertise.data.status) {
        let expertiseList = expertise.data.data.map((el) => {
          return {
            label: el.service_name,
            value: el.id,
          };
        });
        setExpertise(expertiseList);
      }
      if (availabilityPeriod.data.status) {
        const updatedSlot = availabilityPeriod.data.data.map((object) => {
          let slot = [];
          if (object.start_time !== null && object.end_time !== null) {
            let startTimeUTC = moment(object.start_time, "hh:mm A");
            let endTimeUTC = moment(object.end_time, "hh:mm A");
            let duration = moment
              .utc(endTimeUTC.diff(startTimeUTC))
              .format("HH");
            let startTime = moment
              .utc(object.start_time, "hh:mm A")
              .format("hh:mm A");
            slot.push({ key: 0, slot: startTime, is_selected: false });
            for (let i = 1; i < parseInt(duration); i++) {
              slot.push({
                key: i,
                slot: startTimeUTC.add(1, "hours").format("hh:mm A"),
                is_selected: false,
              });
            }
          }
          return {
            day: object.day,
            day_off: false,
            repeat: false,
            value: slot,
          };
        });
        setSlots(updatedSlot);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onInit();
  }, []);

  const handleSubmit = (value) => {
    setTimeSlotError("")
    setPriceMinValidation("")
    if (parseInt(value.professional_price) > 0) {
      let selectedSlots = [];

    selectedSlots.push(slots.filter(slot => slot.value.some(days => [true].includes(days.is_selected))));

    if (selectedSlots[0].length > 0) {
      setIsLoading(true);
      const formData = new FormData();
      let tagValue = value.tag ? value.tag.map((obj) => obj.value).join(",") : "";
      let expertiseId = value.expertise_id
        ? value.expertise_id.map((obj) => obj.value).join(",")
        : "";
      formData.append("name", value.name);
      formData.append("email", value.email);
      formData.append("mobile_number", value.mobile_number);
      formData.append("cpf_no", value.cpf_no);
      formData.append("professional_price", value.professional_price);
      formData.append("avg_experience", value.avg_experience);
      formData.append("gain", value.gain);
      formData.append("expertise_id", expertiseId);
      formData.append("tag", tagValue);
      formData.append("description", value.description);
      formData.append("profile_photo", value.profile_photo);

      var dayOffList = [];

      slots.length !== 0 &&
        slots.map((dayObj, dayI) => {
          if (dayObj.day_off === true) {
            dayOffList.push(dayObj.day);
          } else {
            formData.append(`period[${dayI}][day]`, dayObj.day);
            dayObj.value.length !== 0 &&
              dayObj.value.map((slotObj, slotI) => {
                if (slotObj.is_selected)
                  formData.append(
                    `period[${dayI}][time][${slotI}]`,
                    slotObj.slot
                  );
              });
          }
        });
      formData.append("day_off", dayOffList.join(","));

      const headersProps = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      ProfessionalsServices.saveProfessional(formData, headersProps)
        .then((response) => {
          setIsLoading(false);
          if (response.data.status) {
            if (response.status) {
              toast.success(response.data.msg);
              history.replace("/professionals");
            }
          } else {
            toast.error(response.data.msg);
          }
        })
        .catch(() => {
          setIsLoading(false);
        });
    } else {
      setTimeSlotError("Please select the time slots")
    }
    }else{
      setPriceMinValidation("Min Price can not be equal or smaller than zero")
    }
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
              expertise={expertise}
              handleSubmit={handleSubmit}
              slots={slots}
              setSlots={setSlots}
              timeSlotError={timeSlotError}
              priceMinValidation = {priceMinValidation}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
