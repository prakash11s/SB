import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import HomeServices from "../../services/Home/Home.service";

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  const [pageContent, setPageContent] = useState(undefined);
  const params = useParams();

  useEffect(() => {
    HomeServices.pages("privacy_policy")
      .then((response) => {
        if (response.data.status) {
          let content = response.data.data;
          if(params.lang === 'pt'){
            setPageContent(content.content_pt);
          }else{
            setPageContent(content.content);
          }
        }
      })
      .catch();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <section
        className="privacy-section"
        style={{ backgroundImage: `url('/assets/img/expert-img-2.png')` }}
      >
        <div className="container">
          <h2 className="title-a">{t("PRIVACY_POLICY")}</h2>
        </div>
      </section>

      <section className="privacy-content section-tb8">
        <div className="container">
          <p dangerouslySetInnerHTML={{ __html: pageContent }} />
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
