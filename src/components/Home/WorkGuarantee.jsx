import React from "react";
import { useTranslation } from 'react-i18next';

import { PUBLIC_URL } from "../../utility/constants";

const WorkGuarantee = ({ generalSettings }) => {

  const { t } = useTranslation();
  const APPLE_STORE_LINK = generalSettings.find(el => el.setting_title === 'APPLE_STORE_LINK')?.setting_value;
  const GOOGLE_PLAY_STORE_LINK = generalSettings.find(el => el.setting_title === 'GOOGLE_PLAY_STORE_LINK')?.setting_value;

  const guaranteeList = [
    {
      url: PUBLIC_URL + "/assets/img/professional.svg",
      title: t('VERIFIED_PROFESSIONALS'),
    },
    {
      url: PUBLIC_URL + "/assets/img/insured.svg",
      title: t('INSURED_WORK'),
    },
    {
      url: PUBLIC_URL + "/assets/img/re-work.svg",
      title: t('REWORK_ASSURANCE'),
    },
    {
      url: PUBLIC_URL + "/assets/img/support.svg",
      title: t('PROFESSIONAL_SUPPORT'),
    },
  ];

  return (
    <section className="section-work-guarantee section-tb8">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="work-guarantee-title title-wrap">
              <div className="title-box">
                <h2 className="color-white title-a">
                  {t("WORK_GUARANTEE_TITLE")}
                </h2>
                <p className="color-dark">
                  {t("WORK_GUARANTEE_PARAGRAPH")}
                </p>
              </div>
              <div className="app-link">
                <ul>
                  <li>
                    <a href={APPLE_STORE_LINK} target="_blank" className="me-3">
                      <img src="assets/img/appstore.svg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a href={GOOGLE_PLAY_STORE_LINK} target="_blank">
                      <img src="assets/img/playstore.svg" alt="" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row">
              {guaranteeList.map((gaurantee, i) => {
                return (
                  <div key={i} className="col-sm-6 mb-4">
                    <div className="work-guarantee-cover">
                      <img src={gaurantee.url} alt="" />
                      <p>{gaurantee.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkGuarantee;
