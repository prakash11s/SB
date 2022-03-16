import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = ({ generalSettings }) => {
  const { t } = useTranslation();

const INFO_MAIL = generalSettings.find(el => el.setting_title === 'INFO_MAIL')?.setting_value;
const APPLE_STORE_LINK = generalSettings.find(el => el.setting_title ==='APPLE_STORE_LINK')?.setting_value;
const GOOGLE_PLAY_STORE_LINK = generalSettings.find(el => el.setting_title === 'GOOGLE_PLAY_STORE_LINK')?.setting_value;
const FACEBOOK_LINK = generalSettings.find(el => el.setting_title === 'FACEBOOK_LINK')?.setting_value;
const INSTAGRAM_LINK = generalSettings.find(el => el.setting_title === 'INSTAGRAM_LINK')?.setting_value;
const TWITTER_LINK = generalSettings.find(el => el.setting_title === 'TWITTER_LINK')?.setting_value;
const LINKED_IN_LINK = generalSettings.find(el => el.setting_title === 'LINKED_IN_LINK')?.setting_value;
const YOUTUBE_LINK = generalSettings.find(el => el.setting_title === 'YOUTUBE_LINK')?.setting_value;

  return (
    <footer className="section-footer">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-4 col-md-5 footer-left">
            <div className="widget-a ">
              <div className="footer-logo">
                <img src="assets/img/footer-logo.png" alt="" />
              </div>
              <div className="w-body-a">
                <p className="footer-about color-dark">{t("FOOTER_INFO")}</p>
              </div>
              <div className="w-footer-a">
                <ul className="list-unstyled">
                  <li className="">
                    <span className="color-dark">
                      <img src="assets/img/ic-mail.png" alt="" />
                      { INFO_MAIL }
                    </span>
                  </li>
                  <li className="copy-right-text">
                    <span className="color-dark">{t("COPY_RIGHTS")}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-8 col-md-7 footer-right">
            <div className="widget-a">
              <div className="w-body-a text-center">
                <div className="become-partner-link">
                  <a href="#">
                    <img
                      src="assets/img/f-partner.svg"
                      className="me-2"
                      alt=""
                    />
                    {t("BECOME_PARTNER")}
                  </a>
                </div>
                <div className="footer-menu">
                  <ul className="list-unstyled">
                    <li>
                      <Link to="/about_us">{t("ABOUT_US")}</Link>
                    </li>
                    <li>
                      <Link to="/terms_condition">{t("TERMS_CONDITION")}</Link>
                    </li>
                    {/* <li>
                      <Link to="/privacy_policy">{t("PRIVACY_POLICY")}</Link>
                    </li> */}
                    <li>
                      <Link to="/contact_us">{t("CONTACT_US")}</Link>
                    </li>
                  </ul>
                </div>
                <div className="footer-application">
                  <ul className="list-unstyled">
                    <li>
                      <a href={APPLE_STORE_LINK} target="_blank">
                        <img src="assets/img/f-app-store.svg" alt="" />
                      </a>
                    </li>
                    <li>
                    <a href={GOOGLE_PLAY_STORE_LINK} target="_blank">
                        <img src="assets/img/f-play-store.svg" alt="" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="footer-social">
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      <a href={FACEBOOK_LINK} target="_blank">
                        <i className="fa fa-facebook-f"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href={TWITTER_LINK} target="_blank">
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href={INSTAGRAM_LINK} target="_blank">
                        <i className="fa fa-instagram" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href={LINKED_IN_LINK} target="_blank">
                        <i className="fa fa-linkedin" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href={YOUTUBE_LINK} target="_blank">
                        <i className="fa fa-youtube" aria-hidden="true"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
