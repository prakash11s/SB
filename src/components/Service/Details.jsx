import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import Loader from "../../components/Common/Loader";
import ServiceServices from "../../services/Service/Service.service";

const Details = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const params = useLocation();
  const [serviceDetails, setServiceDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const settings = {
    dots: false,
    infinite: true,
    centerMode: true,
    centerPadding: "30px",
    speed: 500,
    slidesToShow: 1,
  };

  const redirectToService = () => {
    history.push({
      pathname: "/services"
    });
  };

  useEffect(() => {
    setIsLoading(true);
    if (!params?.state?.id) {
      history.replace("/services");
    } else {
      const payload = { id: params.state.id };
      ServiceServices.getServiceDetails(payload)
        .then((response) => {
          setIsLoading(false);
          if (response.data.status) {
            setServiceDetails(response.data.data);
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
        <div className="d-flex align-items-center p-2">
          <span className="back-icon-prev">
            <img
              onClick={redirectToService}
              src={`assets/img/ic_back.png`}
              className="rounded-circle"
              alt="Cinque Terre"
            />
          </span>
          <h4 className=" m-0">{t("SERVICE DETAILS")}</h4>
        </div>
        <hr />
        <div className="app-card app-card-settings">
          <div className="app-content pt-3 pt-md-3 pt-lg-4 pb-5">
            <div className="container-xl">
              <div className="service-detail-wrap">
                {isLoading ? <Loader type="dots" /> : <div className="row">
                  <div className="col-lg-5 col-md-6">
                    <div className="service-left-slider">
                      <div className="service-active">
                        <Slider {...settings}>
                          {serviceDetails &&
                            serviceDetails?.services_images?.map((image) => {
                              return (
                                <div
                                  key={image.id}
                                  className="service-list-image"
                                >
                                  <div
                                    className="service-img"
                                    style={{
                                      backgroundImage: `url(${image.service_image_path})`,
                                    }}
                                  ></div>
                                </div>
                              );
                            })}
                        </Slider>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-7 col-md-6">
                    <div className="service-right-content mt-3 mt-md-0">
                      <h6>{t("SERVICE_INFO")}:</h6>
                      <ul>
                        <li>
                          <span>{t("NAME")}:</span>
                          {serviceDetails && serviceDetails?.service_name}
                        </li>
                        <li>
                          <span>{t("PRICE")}:</span>
                          {serviceDetails && serviceDetails?.service_value}
                        </li>
                        <li>
                          <span>{t("TYPE")}:</span>
                          <span>
                            {serviceDetails &&
                              serviceDetails?.service_type != null &&
                              serviceDetails.service_type
                                .split(",")
                                .map((type, i) => {
                                  return <label key={i}>{t(type)}</label>;
                                })}
                          </span>
                        </li>
                        <li>
                          <span>{t("PAYMENT_TYPE")}:</span>
                          <span>
                            {serviceDetails &&
                              serviceDetails?.payment_type != null &&
                              serviceDetails.payment_type
                                .split(",")
                                .map((type, i) => {
                                  return <label key={i}>{t(type)}</label>;
                                })}
                          </span>
                        </li>
                        <li>
                          <span>{t("DURATION")}:</span>
                          {serviceDetails && serviceDetails?.duration_minutes}
                        </li>
                        <li>
                          <span>{t("TAGS")}:</span>
                          <span>
                            {serviceDetails &&
                              serviceDetails?.tag != null &&
                              serviceDetails.tag.split(",").map((tags, i) => {
                                return <label key={i}>{tags}</label>;
                              })}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="service-bottom-content">
                      <h6>{t("OTHER_INFO")}</h6>
                      <ul>
                        <li>
                          <span className="main-sub">{t("DESCRIPTION")}:</span>
                          {serviceDetails && serviceDetails?.description}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
