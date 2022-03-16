import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { logout } from "../../store/action/Auth/auth.action";

const SetupHeader = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [isOpenProfileMenu, setIsOpenProfileMenu] = useState(false);
  const dispatch = useDispatch();
  const profileImage = useSelector(
    (state) => state.auth.user.provider_info.logo_path
  );
  const handleLogout = () => {
    dispatch(logout()).then((response) => {
      if (response.status) {
        history.replace("/");
      }
    });
  };
  return (
    <div className="container-fluid py-2">
      <div className="app-header-content">
        <div className="row justify-content-between align-items-center">
          <div className="col-auto">
            <div className="app-branding">
              <a className="app-logo" href="#!">
                <img
                  className="logo-icon me-2"
                  src="assets/img/app-logo.png"
                  alt="logo"
                />
                <span className="logo-text">{t("SOUL_BUSINESS")}</span>
              </a>
            </div>
          </div>
          <div className="app-utilities col-auto">
            <div
              onClick={() => {
                setIsOpenProfileMenu(!isOpenProfileMenu);
              }}
              className="app-utility-item app-user-dropdown dropdown"
            >
              <span
                className="dropdown-toggle"
                id="user-dropdown-toggle"
                data-bs-toggle="dropdown"
                role="button"
                aria-expanded="true"
              >
                <img
                  src={profileImage || `assets/img/professional.svg`}
                  alt="user profile"
                />
              </span>
              <ul
                className={"dropdown-menu " + (isOpenProfileMenu ? "show" : "")}
                aria-labelledby="user-dropdown-toggle"
                style={{
                  position: "absolute",
                  inset: "0px auto auto 0px",
                  margin: "0px",
                  transform: "translate(-110px, 27px)",
                }}
              >
                <li onClick={handleLogout}>
                  <span className="dropdown-item" href="#">
                    {t("LOGOUT")}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SetupHeader;
