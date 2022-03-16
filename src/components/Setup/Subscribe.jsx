import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { setupPaidPlan } from "../../store/action/Setup/setup.action";
import StripeServices from "../../services/Stripe/stripe.service";
import ModalHOC from "../Common/Modal";
import AddSubscriptionCard from "./AddSubscriptionCard";
import Loader from "../Common/Loader";

const Subscribe = ({ setSelectedPlanDetails, selectedPlan }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const stripeUserId = useSelector((state) => state.auth?.user?.stripe_user_id);
  const [cardList, setCardList] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [isAddCard, setIsAddCard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toggleAddCardModal = () => {
    setIsAddCard(!isAddCard);
  };

  const setDefaultCard = (cardId) => {
    StripeServices.setDefaultCard({
      customer_id: stripeUserId,
      card_id: cardId,
    }).then((response) => {
      toast.success(response.data.msg);
      if (response.data.status) {
        getCards();
        setCustomer(response.data.data.data);
      } else {
        toast.error(response.data.msg);
      }
    });
  };
  const removeCard = (cardId) => {
    StripeServices.removeCustomerCard({
      customer_id: stripeUserId,
      card_id: cardId,
    }).then((response) => {
      toast.success(response.data.msg);
      if (response.data.status) {
        getCards();
      } else {
        toast.error(response.data.msg);
      }
    });
  };
  const getCards = () => {
    StripeServices.getCustomerCard({
      customer_id: stripeUserId
    }).then((response) => {
      if (response.data.status) { 
        setCardList(response.data.data.data);
      } else {
        toast.error(response.data.msg);
      }
    });
  }

  const handleSubscribe = () => {
    if (cardList.length !== 0) {
      setIsLoading(true);
      dispatch(
        setupPaidPlan({
          customer_id: stripeUserId,
          plan_price_id: selectedPlan.plan_price_id,
          plan_id: selectedPlan.id,
        })
      )
        .then((response) => {
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }else{
      toast.error(t('ADD_PAYMENT_SOURCE'));
    }
  };

  useEffect(() => {
    if (stripeUserId) {
      StripeServices.getCustomer({ customer_id: stripeUserId }).then(
        (response) => {
          if (response.data.status) {
            setCustomer(response.data.data.data);
            getCards();
          }
        }
      );
    }
  }, []);

  return (
    <>
      <div className="app-content pt-3 p-md-3 p-lg-4 mtop60">
        <div className="container-xl">
          <h1
            className="app-page-title"
            onClick={() => {
              setSelectedPlanDetails(null);
            }}
          >
            <span className="back-icon-prev"><img src="assets/img/ic_back.png" width="20px" alt="" /></span>{t("PAYMENT")}
          </h1>
          <div className="progress-bar-steps"></div>
          <hr className="mb-4" />
          <div className="row g-4">
            <div className="col-12 col-md-12">
              <div className="app-card app-card-settings p-4">
                <div className="row">
                  <div className="col-md-5">
                    <div className="selected-subscription-wrap">
                      <div className="selected-ss-plan">
                        <h3>{selectedPlan.plan_name}</h3>
                        <h2>${selectedPlan.plan_price}</h2>
                        <h6>{selectedPlan.plan_description}</h6>
                        <div className="included-info">
                          <h4>{t("INCLUDED")}</h4>
                          <ul>
                            {selectedPlan.get_plan_feature.map((feature) => {
                              return (
                                <li key={feature.id}>{feature.feature}</li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-7 col-lg-6 col-lg-offset-1">
                    <div className="payment-info">
                      <ul className="newcard_ul">
                        <li>
                          <input
                            className="form-check-input card_check"
                            type="radio"
                            name="pay"
                            id="pay"
                            checked
                          />
                          <label htmlFor="pay" className="lable_card">
                            {t("PAYMENT_TYPE_CARD")}
                          </label>
                        </li>
                        <li>
                          <ul>
                            <span
                              onClick={toggleAddCardModal}
                              className="add-newcard-link"
                            >
                              + {t("ADD_NEW_CARD")}
                            </span>
                          </ul>
                          <ul className="addcard_list">
                            {cardList && cardList.length !== 0 &&
                              cardList.map((card, i) => {
                                return (
                                  <li
                                    key={i}
                                    className={
                                      customer.default_source === card.id
                                        ? "is_selected"
                                        : ""
                                    }
                                    onClick={() => setDefaultCard(card.id)}
                                  >
                                    <span>**** **** **** {card.last4}</span>
                                    <div className="card_remove_edit">
                                      <button
                                        className="btn remove_card_link"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          removeCard(card.id);
                                        }}
                                      >
                                        {t("REMOVE")}
                                      </button>
                                    </div>
                                  </li>
                                );
                              })}
                          </ul>
                        </li>
                        {/* <li>
                          <input
                            className="form-check-input card_check"
                            type="radio"
                            name="pay"
                            id="netb"
                          />
                          <label htmlFor="netb" className="lable_card">
                            {t("PAYMENT_TYPE_NETBANKING")}
                          </label>
                        </li> */}
                      </ul>
                      <button
                        onClick={handleSubscribe}
                        type="button"
                        className="btn subscribe_btn"
                      >
                        {isLoading ? (
                          <Loader type="dots" />
                        ) : (
                          t("SUBSCRIBE")
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isAddCard && (
        <ModalHOC
          isModalOpen={isAddCard}
          toggleModal={toggleAddCardModal}
          modalTitle={"Add Card"}
          children={
            <AddSubscriptionCard
              stripeUserId={stripeUserId}
              toggleAddCardModal={toggleAddCardModal}
              setCardList={setCardList}
            />
          }
        />
      )}
    </>
  );
};

export default Subscribe;
