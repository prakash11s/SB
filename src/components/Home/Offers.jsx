import React from 'react'
import { useTranslation } from 'react-i18next';

const Offers = ({ offersList }) => {

    const { t } = useTranslation();
    
    return (
        <section className="section-best-offer section-tb8">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title-wrap">
                            <div className="title-box text-center">
                                <h2 className="title-a">{t("Best Offers")}</h2>
                                {/* <p>Hygienic & single-use products | low-contact services</p> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {
                        offersList.length !== 0 && offersList.map((offer, i) => {
                            return(
                                <div key={i} className="col-lg-3 col-md-4 col-sm-6 mb-3">
                                    <div className="offer-list">
                                        <a href="#">
                                            <div className="offer-img" style={{ backgroundImage:`url(${offer.promocode_photo_path})` }} >
                                                <span><i className="fa fa-arrow-right"></i></span>
                                            </div>
                                            <h5>{ offer.promocode_name }</h5>
                                            <p>{ offer.discount_apply }</p>
                                        </a>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </section>
    );
}

export default Offers;