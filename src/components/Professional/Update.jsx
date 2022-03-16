import React, { useState, useEffect } from "react";
import moment from "moment";
import { useLocation, useHistory } from "react-router-dom";

import SetupServices from "../../services/Setup/setup.service";
import ProfessionalsServices from "../../services/Professional/Professional.service";
import Form from "./Form";

const Update = () => {
  const history = useHistory();
  const params = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [expertise, setExpertise] = useState([]);
  const [professionalDetails, setProfessionalDetails] = useState([]);
  const [slots, setSlots] = useState([]);
  const [timeSlotError, setTimeSlotError] = useState("");

  const onInit = async () => {
    if (!params?.state?.id) {
      history.replace("/professionals");
    } else {
      try {
        const payload = { id: params.state.id };
        const profDetails = await ProfessionalsServices.getProfessionalDetails(
          payload
        );
        const expertise = await SetupServices.getExpertiseList();
        const availabilityPeriod = await SetupServices.getAvailabilityPeriod();
        if (profDetails.data.status) {
          setProfessionalDetails(profDetails.data.data);
        }
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
          const updatedSlot =
            profDetails.data.data &&
            availabilityPeriod.data.data.map((object) => {
              let dayOff = profDetails.data.data?.day_off?.split(",") || [];
              let existingDay =
                profDetails.data.data &&
                profDetails.data.data?.time_slot_schedule?.filter(
                  (existDay) => existDay.day === object.day
                );
              let existingSlots =
                existingDay &&
                existingDay[0] !== undefined &&
                existingDay[0].length !== 0 &&
                existingDay[0]?.timeSlot.map((existSlot) => existSlot.time);
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
                slot.push({
                  key: 0,
                  slot: startTime,
                  is_selected:
                    existingSlots &&
                    existingSlots.length !== 0 &&
                    existingSlots.includes(startTime)
                      ? true
                      : false,
                });
                for (let i = 1; i < parseInt(duration); i++) {
                  let slotTime = startTimeUTC.add(1, "hours").format("hh:mm A");
                  slot.push({
                    key: i,
                    slot: slotTime,
                    is_selected:
                      existingSlots &&
                      existingSlots.length !== 0 &&
                      existingSlots.includes(slotTime)
                        ? true
                        : false,
                  });
                }
              }
              return {
                day: object.day,
                day_off: dayOff.includes(object.day) ? true : false,
                repeat: false,
                value: slot,
              };
            });
          setSlots(updatedSlot);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    onInit();
  }, []);

  const handleSubmit = (value) => {
    let selectedSlots = [];
    
    selectedSlots.push(slots.filter(slot => slot.value.some(days => [true].includes(days.is_selected))));
    if(selectedSlots[0].length > 0){
      setTimeSlotError("")
      setIsLoading(true);
      const formData = new FormData();
      let tagValue = value.tag ? value.tag.map((obj) => obj.value).join(",") : "";
      let expertiseId = value.expertise_id
        ? value.expertise_id.map((obj) => obj.value).join(",")
        : "";
      formData.append("id", params.state.id);
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
            if (dayObj.value.length !== 0)
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
      ProfessionalsServices.updateProfessional(formData, headersProps)
        .then((response) => {
          setIsLoading(false);
          if (response.data.status) {
            if (response.status) {
              history.replace("/professionals");
            }
          } else {
            console.log(response);
          }
        })
        .catch(() => {
          setIsLoading(false);
        });
    }else{
      setTimeSlotError("Please select the time slots")
    }
  };

  return (
    <>
      <div className="row g-4 settings-section">
        <div className="col-12 col-md-12">
          <div className="app-card app-card-settings shadow-sm p-4">
            {professionalDetails && slots && (
              <Form
                inNew={false}
                isLoading={isLoading}
                prevStep={false}
                expertise={expertise}
                handleSubmit={handleSubmit}
                slots={slots}
                setSlots={setSlots}
                timeSlotError={timeSlotError}
                professionalDetails={professionalDetails}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Update;
