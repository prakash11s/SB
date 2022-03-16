import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import HomeServices from "../../services/Home/Home.service";

const TermsCondition = () => {
  const { t, i18n } = useTranslation();
  const [pageContent, setPageContent] = useState(undefined);
  const params = useParams();

  useEffect(() => {
    let payload = params.type
      ? `term_condition_${params.type}`
      : `term_condition_provider`;
    HomeServices.pages(payload)
      .then((response) => {
        if (response.data.status) {
          let content = response.data.data;
          let languageType = params.lang ? params.lang : i18n.language;
          if (languageType === "pt") {
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
        className="terms-condition-section"
        style={{ backgroundImage: `url('/assets/img/expert-img-2.png')` }}
      >
        <div className="container">
          <h2 className="title-a">{ t('TERMS_CONDITION') }</h2>
        </div>
      </section>
      <section className="tc-content section-tb8">
        <div className="container">
          <p dangerouslySetInnerHTML={{ __html: pageContent }} />
        </div>
      </section>
    </>
  );
};

export default TermsCondition;
