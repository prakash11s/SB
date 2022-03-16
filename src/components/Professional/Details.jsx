import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProfessionalsServices from "../../services/Professional/Professional.service";
import ModalHOC from "../Common/Modal";
import Loader from "../../components/Common/Loader";
import TimeSlot from "./TimeSlot";

const Details = () => {

  const { t } = useTranslation();
  const history = useHistory();
  const params = useLocation();
  const [professionalDetails, setProfessionalDetails] = useState([]);
  const [slots, setSlots] = useState([]);
  const [isTimeSlot, setIsTimeSlot] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleTimeSlotModal = () => {
    setIsTimeSlot(!isTimeSlot);
  };

  useEffect(() => {
    setIsLoading(true);
    if (!params?.state?.id) {
      history.replace("/professionals");
    } else {
      const payload = { id: params.state.id };
      ProfessionalsServices.getProfessionalDetails(payload)
        .then((response) => {
          setIsLoading(false);
          if (response.data.status) {
            setProfessionalDetails(response.data.data);
          } else {
            console.log(response);
          }
        })
        .catch();
    }
  }, []);

  return (
    <>
      <div className="g-4 settings-section">
        <div className="app-card app-card-settings">
          <div className='app-content pt-3 pt-md-3 pt-lg-4 pb-5'>
            <div className="container-xl">
              <div className="professional-detail-wrap">
                {isLoading ? <Loader type="dots" /> : <div className="row">
                  <div className="col-md-4">
                    <div className="professional-left-slider">
                      <div className="professional-profile-image mb-3 mb-md-0" style={{ backgroundImage: `url(${professionalDetails && professionalDetails.profile_photo_path})` }}>
                        <div className="profile-image-prof" >
                          <span style={{ backgroundImage: `url(${professionalDetails && professionalDetails.profile_photo_path})` }}>
                          </span>
                          <p>{professionalDetails && professionalDetails?.name}</p>
                        </div>
                      </div>
                    </div>
                    <div className="professional-bottom-content mt-3 mt-md-0">
                      <div>
                        <h6>{t("PERSONAL_INFO")}</h6>
                        <ul>
                          <li><span>{t("EMAIL")}:</span> {professionalDetails && professionalDetails?.email}</li>
                          <li><span>{t("MOBILE_NUMBER")}:</span>{professionalDetails && professionalDetails?.mobile_number}</li>
                        </ul>
                      </div>
                      <div className="mt-3">
                        <h6>{t("PROFESSIONAL_INFO")}</h6>
                        <ul>
                          <li><span>{t("AVG_EXPERIENCE")}:</span>{professionalDetails && professionalDetails?.avg_experience}</li>
                          <li><span>CPF No:</span>{professionalDetails && professionalDetails?.cpf_no}</li>
                          <li><span>Expertise:</span>
                            <span>
                              {
                                professionalDetails && professionalDetails?.expertise != null && professionalDetails.expertise.split(',').map((expert, i) => {
                                  return (
                                    <label key={i}>{expert}</label>
                                  )
                                })
                              }
                            </span>
                          </li>
                          <li>
                            <span>{t("TAGS")}:</span>
                            <span>
                              {
                                professionalDetails && professionalDetails?.tag != null && professionalDetails.tag.split(',').map((tags, i) => {
                                  return (
                                    <label key={i}>{tags}</label>
                                  )
                                })
                              }
                            </span>
                          </li>
                          <li><span>{t("PRICE")}:</span>{professionalDetails && professionalDetails?.professional_price}</li>
                          <li><span>{t("GAIN")}:</span>{professionalDetails && professionalDetails?.gain}%</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="professional-right-content mt-3 mt-md-0">
                      <h6>{t("OTHER_INFO")}</h6>
                      <ul>
                        <li><span className="main-sub">{t("DESCRIPTION")}:</span>{professionalDetails && professionalDetails?.description}</li>
                        <li className="mt-2">
                          <span className="main-sub">{t("TIME_SLOTS")}:</span>
                          <ul>
                            {
                              professionalDetails && professionalDetails?.time_slot != null && professionalDetails.time_slot.map((slot, i) => {
                                return (
                                  <li key={i} className="time-slot-time" onClick={() => { setSlots(slot.timeSlot); toggleTimeSlotModal(); }}>{slot.date}<span><i className="fa fa-info"></i></span></li>
                                )
                              })
                            }
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>}
                {isTimeSlot && (
                  <ModalHOC
                    isModalOpen={isTimeSlot}
                    toggleModal={toggleTimeSlotModal}
                    modalTitle={"Time Slots"}
                    children={
                      <TimeSlot
                        toggleTimeSlotModal={toggleTimeSlotModal}
                        slots={slots}
                      />
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
