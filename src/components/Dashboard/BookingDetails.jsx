import React, { useState, useEffect, useRef } from "react";
import { useLocation, useHistory } from "react-router";
import { toast } from "react-toastify";
import moment from "moment";
import { useTranslation } from "react-i18next";

import ModalHOC from "../Common/Modal";
import DashboardServices from "../../services/Dashboard/Dashboard.service";
import Loader from "../../components/Common/Loader";
import BookingAcceptReject from "./BookingAcceptReject";
import { PAYMENT_UPON_DELIVERY } from "../../utility/constants";

const BookingDetails = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const params = useLocation();
  const [bookDetails, setBookDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptRejectPayload, setAcceptRejectPayload] = useState({});
  const [selectedPaymentType, setSelectedPaymentType] = useState("Pix");
  const [description, setDescription] = useState("");
  const [paymentImageURL, setPaymentImageURL] = useState(
    `assets/img/ic_upload.png`
  );
  const [paymentImage, setPaymentImage] = useState(undefined);
  const [isRejectModal, setIsRejectModal] = useState(false);

  const totalRating = [1, 2, 3, 4, 5];

  const toggleRejectModal = () => {
    setIsRejectModal(!isRejectModal);
  };

  const redirectToBooking = () => {
    history.push({
      pathname: "/booking",
      state: bookDetails?.bookingDetails?.booking_status,
    });
  };

  const redirectToBookingAfterAccept = () => {
    history.push({
      pathname: "/booking",
      state: "Completed",
    });
  };

  const acceptRejectBooking = (BookingType) => {
    setIsLoading(true);
    let payload = {};
    if (BookingType === "Accepted") {
      payload["booking_id"] = parseInt(params?.state?.id);
      payload["booking_status"] = BookingType;
    } else if (BookingType === "Rejected" && acceptRejectPayload !== undefined) {
      payload["booking_id"] = parseInt(params?.state?.id);
      payload["booking_status"] = BookingType;
      payload["reject_note"] = acceptRejectPayload;
    }

    DashboardServices.getAcceptRejectBooking(payload).then((response) => {
      setIsLoading(false);
      if (response.data.status) {
        toast.success(response.data.msg);
        history.push({
          pathname: '/booking',
          state: "Accepted"
        });
      } else {
        toast.error(response.data.msg);
      }
    });
  };

  useEffect(() => {
    setIsLoading(true);
    if (!params?.state?.id) {
      history.replace("/booking");
    } else {
      let payload = {
        booking_id: params?.state?.id,
      };
     
      DashboardServices.getProviderBookingDetails(payload).then((response) => {
        setIsLoading(false);
        if (response.data.status) {
          setBookDetails(response?.data?.data);
        }
      });
    }
  }, []);

  const logoInputRef = useRef(null);
  const handleFileUpload = (event) => {
    let profile =
      event.target.files.length > 0 ? event.target.files[0] : undefined;
    if (profile !== undefined) {
      setPaymentImageURL(URL.createObjectURL(profile));
      setPaymentImage(profile);
    }
  };

  const daysFormat = (dayFormat, monthYear) => {
    if (dayFormat >= 11 && dayFormat <= 13) {
      return `${dayFormat} th ${monthYear}`;
    }
    switch (dayFormat % 10) {
      case 1:
        return `${dayFormat} st ${monthYear}`;
      case 2:
        return `${dayFormat} nd ${monthYear}`;
      case 3:
        return `${dayFormat} rd ${monthYear}`;
      default:
        return `${dayFormat} th ${monthYear}`;
    }
  };

  const setBookingCompleted = (event) => {
    setIsLoading(true);
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    if (bookDetails?.bookingDetails?.payment_type !== PAYMENT_UPON_DELIVERY) {
      formData.append("booking_id", bookDetails?.bookingDetails?.booking_id);
      formData.append("booking_status", "Completed");
    } else {
      formData.append("booking_id", bookDetails?.bookingDetails?.booking_id);
      formData.append("booking_status", "Completed");
      formData.append("payment_type", selectedPaymentType);
      formData.append("amount", bookDetails?.bookingDetails?.total_paid);
      formData.append("reference_image", paymentImage);
      formData.append("description", description);
    }

    const headersProps = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    DashboardServices.getCompleteBooking(formData, headersProps).then(
      (response) => {
        setIsLoading(false);
        if (response.data.status) {
          redirectToBookingAfterAccept();
          toast.success(response.data.msg);
        } else {
          toast.error(response.data.msg);
        }
      }
    );
  };

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <span className="back-icon-prev">
            <img
              onClick={redirectToBooking}
              src={`assets/img/ic_back.png`}
              className="rounded-circle"
              alt="Cinque Terre"
            />
          </span>
          <h4 className=" m-0">Booking Details</h4>
        </div>
        {isLoading ? <Loader type="dots" /> : <h5 className=" m-0">#{bookDetails?.bookingDetails?.order_id} | {moment(bookDetails?.bookingDetails?.created_at).format("DD")} {moment(bookDetails?.bookingDetails?.created_at).format('MMM')} {moment(bookDetails?.bookingDetails?.created_at).format("hh:mm A")} </h5>}
      </div>
      <hr />
      {isLoading ? <Loader type="dots" /> : bookDetails && bookDetails ? (
        <div className="col-md-12">
          <div className="booking-detail-wrap card mdb-color lighten-2 z-depth-2">
            <div className="row px-3">
              <div className="col-md-6">
                <div className="booking-card-title booking-detail-card-title pt-3">
                  <div className="bct-sub">
                    <h5>
                      {bookDetails?.bookingDetails?.get_user_detail?.name || ""}
                    </h5>
                    <span
                      className={`accepted-label ${bookDetails?.bookingDetails?.booking_status}-booking`}
                    >
                      {bookDetails?.bookingDetails?.booking_status || ""}
                    </span>
                  </div>
                  <img
                    src={
                      bookDetails?.bookingDetails?.get_user_detail
                        ?.profile_photo_path || `assets/img/professional.svg`
                    }
                    className="rounded-circle"
                    alt="Cinque Terre"
                  />
                </div>
                <div className="booking-card-title booking-detail-card-title">
                  <div className="bct-sub">
                    <h5>
                      {bookDetails?.professional?.professional_name || ""}
                    </h5>
                    <span
                      className={`mx-2 ${bookDetails?.bookingDetails?.booking_type === "Online"
                        ? "online"
                        : bookDetails?.bookingDetails?.booking_type ===
                          "At Establishment"
                          ? "at-establishment"
                          : bookDetails?.bookingDetails?.booking_type ===
                            "At Home"
                            ? "at-home"
                            : ""
                        }`}
                    >
                      {t(bookDetails?.bookingDetails?.booking_type) || ""}
                    </span>
                  </div>
                  <img
                    src={
                      bookDetails?.professional?.professional_image ||
                      `assets/img/professional.svg`
                    }
                    className="rounded-circle"
                    alt="Cinque Terre"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="booking-detail-content pt-3">
                  {bookDetails &&
                    bookDetails?.booking_item !== undefined &&
                    bookDetails?.booking_item.map((bookingItem) => (
                      <div key={bookingItem?.id}>
                        <div className="d-flex justify-content-between">
                          <h6 className="services-name-text">
                            {bookingItem.service_name}
                          </h6>
                          <div>Qty : {bookingItem?.service_qty || ""} </div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <div>
                            Price : R$ {bookingItem.service_price || ""}
                          </div>
                          <div>{moment(bookDetails?.slot_date_time).format("DD")} {moment(bookDetails?.slot_date_time).format('MMM')} | {moment(bookDetails?.slot_date_time).format("hh:mm A")}</div>
                        </div>
                        <div>
                          Durations:
                          {moment
                            .utc()
                            .startOf("day")
                            .add({
                              minutes: bookingItem?.service_duration,
                            })
                            .format("HH[ hrs ]mm[ min ]")}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="col-md-12">
                <div className="address-detail">
                  {bookDetails?.booking_address && (
                    <div className="mt-2">
                      <div className="d-flex justify-content-between">
                        <h6>Address</h6>
                      </div>
                      {bookDetails?.booking_address?.booking_type ===
                        "At Home" ? (
                        <p>{bookDetails?.booking_address?.user_name}</p>
                      ) : (
                        ""
                      )}
                      {bookDetails?.booking_address?.booking_type ===
                        "At Home" ? (
                        <p>{bookDetails.booking_address.address}</p>
                      ) : bookDetails.booking_address.booking_type ===
                        "At Establishment" ? (
                        <p>{bookDetails.booking_address.address}</p>
                      ) : (
                        ""
                      )}

                      <p>{bookDetails?.booking_address.mobile_number}</p>
                      <p>{bookDetails.booking_address.booking_type}</p>
                    </div>
                  )}
                </div>
              </div>
              <hr />
              <div className="col-md-12">
                <div className="mt-2">
                  <h6>Payment Type</h6>
                  <div>
                    <i className="far fa-money-bill-wave-alt"></i>
                    {bookDetails?.bookingDetails?.payment_type || ""}
                  </div>
                </div>
                <hr />
                <div className="price-detail mt-2">
                  <h6>Price Details</h6>
                  <div className="d-flex justify-content-between">
                    <p>Total Amount</p>
                    <div>
                      R$ {bookDetails?.bookingDetails?.total_amount || ""}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>Promo Discount</p>
                    <div>
                      -R$
                      {bookDetails?.bookingDetails?.promocode_amount || "00:00"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="total-pay-bg d-flex justify-content-between mt-4">
              <h5>Total Pay</h5>
              <h6>R$ {bookDetails?.bookingDetails?.total_paid || ""} </h6>
            </div>
            <div className="row">
              <div className="col-md-12">
                {(bookDetails?.service_rating?.rate !== null ||
                  bookDetails?.service_rating?.review !== null) &&
                  bookDetails?.bookingDetails?.booking_status === "Completed" ? (
                  <div className="mt-3 mb-3 px-3">
                    <h5 className="review-title">Reviews</h5>
                    <div className="card review-card">
                      <div className="card-body">
                        {bookDetails?.service_rating?.rate &&
                          totalRating?.map((rateCount, index) => {
                            if (bookDetails?.service_rating?.rate > index) {
                              return (
                                <img
                                  src={`assets/img/ic_star_activated_2.png`}
                                  width="15px"
                                  alt="starActivated"
                                />
                              );
                            } else {
                              return (
                                <img
                                  src={`assets/img/ic_star_deactivated.png`}
                                  width="15px"
                                  alt="starActivated"
                                />
                              );
                            }
                          })}
                        <p>{bookDetails?.service_rating?.review}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {bookDetails?.bookingDetails?.booking_status === "Pending" ? (
                  <div className="card-header">
                    <div className="d-flex justify-content-end accept-reject-btn">
                      <button
                        className="btn app-btn-primary"
                        onClick={() => {
                          setAcceptRejectPayload();
                          acceptRejectBooking("Accepted");
                        }}
                      >
                        {isLoading ? <Loader type="dots" /> : "Accept"}
                      </button>
                      <button
                        className="btn app-btn-secondary"
                        onClick={toggleRejectModal}
                      >
                        Reject
                      </button>
                    </div>
                    <p className="fs-6 mt-3">
                      Your video consultation will be start here at
                      {bookDetails?.booking_item !== undefined
                        ? moment(
                          bookDetails?.booking_item[0].time,
                          "h:mm a"
                        ).format("h:mm a")
                        : ""}
                      of
                      {daysFormat(
                        bookDetails?.booking_item !== undefined
                          ? moment(bookDetails?.booking_item[0].date).format(
                            "DD"
                          )
                          : "",
                        bookDetails?.booking_item !== undefined
                          ? moment(bookDetails?.booking_item[0].date).format(
                            "MMM YYYY"
                          )
                          : ""
                      )}
                    </p>
                  </div>
                ) : (
                  ""
                )}

                {bookDetails?.bookingDetails?.booking_status === "Accepted" &&
                  bookDetails?.bookingDetails?.payment_type ===
                  PAYMENT_UPON_DELIVERY && (
                    <div className="mt-2 px-3 mt-3">
                      <p>Select Payment Type and Complete the Order</p>
                      <h6>Select Payment Type</h6>
                      <input
                        onChange={(event) => {
                          setSelectedPaymentType(event.target.value);
                        }}
                        type="radio"
                        id="html"
                        name="fav_language"
                        value="Pix"
                        checked={selectedPaymentType === "Pix"}
                      />
                      <label className="ms-2" htmlFor="html">
                        Pix
                      </label>
                      <br />
                      <input
                        onChange={(event) => {
                          setSelectedPaymentType(event.target.value);
                        }}
                        type="radio"
                        id="css"
                        name="fav_language"
                        value="Cash"
                        checked={selectedPaymentType === "Cash"}
                      />
                      <label className="ms-2" htmlFor="css">
                        Cash
                      </label>
                      <br />
                      <input
                        onChange={(event) => {
                          setSelectedPaymentType(event.target.value);
                        }}
                        type="radio"
                        id="javascript"
                        name="fav_language"
                        value="Card Machine"
                        checked={selectedPaymentType === "Card Machine"}
                      />
                      <label className="ms-2" htmlFor="javascript">
                        Card Machine
                      </label>
                      <div className="form-group mt-3">
                        <h6>Add Description</h6>
                        <textarea
                          className="form-control fc-hight"
                          onChange={(event) => {
                            setDescription(event.target.value);
                          }}
                          id="exampleFormControlTextarea1"
                          rows="4"
                          cols="50"
                        ></textarea>
                      </div>
                      <div className="form-group mt-3 mb-3">
                        <h6>Upload Payment Image</h6>
                        <input
                          type="file"
                          accept="image/png, image/jpg, image/jpeg"
                          ref={logoInputRef}
                          style={{ display: "none" }}
                          name="payment_image"
                          onChange={handleFileUpload}
                        />
                        <img
                          onClick={() => logoInputRef.current.click()}
                          src={paymentImageURL}
                          alt="Payment Image"
                          style={{
                            width: 100,
                            height: 100,
                            padding: 2,
                            border: "1px solid #ced4da",
                            borderRadius: "7px",
                          }}
                        />
                      </div>
                    </div>
                  )}
                {bookDetails?.bookingDetails?.booking_status === "Accepted" && (
                  <div className="d-flex justify-content-end mb-4">
                    <button
                      className="btn app-btn-primary select-kp btn-large mt-2 mx-2"
                      onClick={(event) => {
                        setBookingCompleted(event);
                      }}
                    >
                      {isLoading ? (
                        <Loader type="dots" />
                      ) : (
                        "Received & Complete"
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-order-placeholder">
          <p><img src={`assets/img/no-order-placeholder.png`} width="150px" alt="" /></p>
          {t("NO_DATA_IMAGE")}
        </div>
      )}
      {isRejectModal && (
        <ModalHOC
          isModalOpen={isRejectModal}
          toggleModal={toggleRejectModal}
          children={
            <BookingAcceptReject
              setAcceptRejectPayload={setAcceptRejectPayload}
              acceptRejectBooking={acceptRejectBooking}
              toggleRejectModal={toggleRejectModal}
            />
          }
        />
      )}
    </div>
  );
};

export default BookingDetails;
