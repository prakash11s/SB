import React from 'react';
import { useTranslation } from 'react-i18next';

const Services = ({ serviceList, isBecomePartner }) => {
    const { t } = useTranslation();

    return (
        <section className="section-services section-tb8">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title-wrap">
                            {isBecomePartner ? <div className="title-box text-center">
                                <h2 className="title-a">{t("SERVICE_TITLE")}</h2>
                                <p>{t("SERVICE_PARAGRAPH")}</p>
                            </div> :
                                <div className="title-box text-center">
                                    <h2 className="title-a">{t('OUR_SERVICE_TITLE')}</h2>
                                    <p>{t('OUR_SERVICE_TEXT')}</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="row">
                    {serviceList && serviceList.map((service) => {
                        return (
                            <div key={service.id} className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 mb-5">
                                <div className="service-list">
                                    <a href="#!">
                                        <img src={service.services_primary_images.category_image_path} alt={service.category_name} />
                                        <h5>{service.category_name}</h5>
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default Services;