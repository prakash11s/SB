import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import HomeServices from "../../services/Home/Home.service";
import CommonContactUsForm from '../Home/CommonContactUsForm';

const ContactUs = () => {
  const { t, i18n } = useTranslation();
  const [pageContent, setPageContent] = useState(undefined);
  const params = useParams();

  useEffect(() => {
    HomeServices.pages("contact_us")
      .then((response) => {
        if (response.data.status) {
          let content = response.data.data;
          if (params.lang === 'pt' || i18n.language === "pt") {
            setPageContent(content.content_pt);
          } else {
            setPageContent(content.content);
          }
        }
      })
      .catch();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [i18n.language]);

  return (
    <>
      <section
        className="contact-section"
        style={{ backgroundImage: `url('/assets/img/expert-img-2.png')` }}
      >
        <div className="container">
          <h2 className="title-a">{t('CONTACT_US')}</h2>
          <p>
            {t('CONTACT_US_QUERY_EMAIL')}
            <a href="mailto:help@soulbusiness.com" className="contactus__email">
              {t("SOUL_BUSSINESS_HELP_MAIL")}
            </a>
          </p>
        </div>
      </section>

      <section className="contactus-help section-tb8">
        <div className="container">
          <h3>{t('CONTACT_US_QUOTE')}</h3>
          <div className="row mt-4 ">
            <p dangerouslySetInnerHTML={{ __html: pageContent }} />
          </div>
        </div>
      </section>

      <section className="become-section section-tb8 pb-0">
        <CommonContactUsForm />
      </section>
    </>
  );
};

export default ContactUs;
