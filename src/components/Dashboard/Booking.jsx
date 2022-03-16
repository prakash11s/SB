import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import moment from "moment";
import { useTranslation } from "react-i18next";
import Loader from "../../components/Common/Loader";
import DashboardServices from "../../services/Dashboard/Dashboard.service";

const Booking = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const [bookingList, setBookingList] = useState([]);
  const [tabViews, setTabViews] = useState([
    { title: "Pending", value: "pending", isActive: true },
    { title: "Ongoing", value: "ongoing", isActive: false },
    { title: "Completed", value: "completed", isActive: false },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location.state === "Accepted") {
      init('Ongoing');
      handleTabClick('Ongoing');
    } else if (location.state === "Completed") {
      init(location.state);
      handleTabClick(location.state);
    } else {
      init('Pending');
      handleTabClick('Pending');
    }
  }, [location.state]);

  const init = (statusType) => {
    setIsLoading(true);
    let payload = {
      page: 1,
      booking_status: statusType
    };
    DashboardServices.getBooking(payload).then((response) => {
      setIsLoading(false);
      if (response.data.status) {
        setBookingList(response?.data?.data);
      } else {
        setBookingList([]);
      }
    });
  }

  const handleTabClick = (tab) => {
    if (location.state !== "Accepted" || location.state !== "Completed" ||
      location.state !== "Pending") {
      init(tab);
    }
    const filterTabList = tabViews.map((el) =>
      el.title === tab ? { ...el, isActive: true } : { ...el, isActive: false }
    );
    setTabViews(filterTabList);
  }

  const acceptBooking = (bookingId) => {
    setIsLoading(true);
    let payload = {
      booking_id: bookingId,
      booking_status: "Accepted"
    };

    DashboardServices.getAcceptRejectBooking(payload).then((response) => {
      setIsLoading(false);
      if (response.data.status) {
        toast.success(response.data.msg);
      } else {
        toast.error(response.data.msg);
      }
    });
  }

  return (
    <>
      <div className="container mt-4">
        <h1 className="app-page-title">{t("BOOKING")}</h1>
        <hr />
        <div className="col-md-12 row justify-content-center pt-2">
          {tabViews.map((el, i) => {
            return (
              <div key={i} className="col-md-3 col-6 mb-md-0 mb-2">
                <button
                  className={`btn kpi-btn select-kpi ${el.isActive ? "app-btn-primary" : "app-btn-secondary"
                    }`}
                  onClick={() => handleTabClick(el.title)}
                >
                  {t(el.title)}
                </button>
              </div>
            );
          })}
        </div>
        <div className="row">
          {isLoading ? <Loader type="dots" /> : bookingList.length !== 0 ? bookingList.map((booking) => {
            return (
              <div key={booking.booking_id} className="col-md-6 mt-4">
                <Link className="booking-box-wrap" key={booking.booking_id} to={{ pathname: "/booking_details", state: { id: booking.booking_id } }}>
                  <div className="card mdb-color lighten-2 z-depth-2 booking-card-box">
                    <div className="card-header d-flex justify-content-between">
                      <h6 className="card-title m-0">#{booking?.order_id || ''}</h6>
                      <p className="date-slot-highlight">{moment(booking?.slot_date_time).format("DD")} {moment(booking?.slot_date_time).format('MMM')} | {moment(booking?.slot_date_time).format("hh:mm A")}</p>
                    </div>

                    <div className="booking-card-body">
                      <h6>{booking?.service_name || '' || ''}</h6>
                      <div className="booking-card-title">
                        <h5>{booking?.get_user_detail?.name || ''}</h5>
                        <img src={booking?.get_user_detail?.profile_photo_path || `assets/img/professional.svg`} className="rounded-circle" alt="Cinque Terre" />
                      </div>

                      <div className="booking-card-title">
                        <h5>{booking?.professional_name} </h5>
                        <img src={booking?.profile_photo_path || `assets/img/professional.svg`} className="rounded-circle" alt="Cinque Terre" />
                      </div>
                      <div className="position-relative mt-3">
                        <h6 className={booking?.booking_type === "Online" ? "online" : booking?.booking_type
                          === "At Establishment" ? "at-establishment" : booking?.booking_type
                            === "At Home" ? "at-home" : ""} >{t(booking?.booking_type) || ''}</h6>
                        <div className="label-badge ">
                          {
                            booking.type === "Normal Booking" ? "" : <span>{t("Custom")}</span>
                          }
                        </div>
                      </div>
                      <div className="booking-bottom-footer">
                        <div className="booking-card-price-amount">
                          <h5>R${booking?.total_amount || ''} |</h5>
                          <span className={`accepted-label ${booking?.booking_status}-booking`}>{booking?.booking_status || ''}</span>
                        </div>
                        {booking?.booking_status === "Accepted" ? "" : booking?.booking_status === "Completed" ? "" : <button className="btn app-btn-primary" onClick={() => {
                          acceptBooking(booking.booking_id);
                        }}>{t("Accept")}</button>}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )
          }) :
            <div className="no-order-placeholder">
              <p><img src={`assets/img/no-order-placeholder.png`} width="150px" alt="" /></p>
              {t("NO_DATA_IMAGE")}
            </div>}
        </div>
      </div>
    </>
  );
};

export default Booking;
