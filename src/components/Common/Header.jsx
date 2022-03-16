import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { logout } from "../../store/action/Auth/auth.action";
import LangSelector from '../Common/LangSelector';

const Header = ({ toggleIsSideMenuOpenModal }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isOpenProfileMenu, setIsOpenProfileMenu] = useState(false);
  const profileImage = useSelector(
    (state) => state?.auth?.user?.provider_info?.logo_path
  );
  const handleLogout = () => {
    dispatch(logout()).then((response) => {
      if (response.status) {
        history.replace("/");
      }
    });
  };

  return (
    <div className="app-header-inner">
      <div className="container-fluid py-2">
        <div className="app-header-content">
          <div className="row justify-content-between align-items-center">
            <div className="col-auto">
					    <span id="sidepanel-toggler" className="sidepanel-toggler d-inline-block d-xl-none" onClick={ toggleIsSideMenuOpenModal } >
						    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" role="img"><title>Menu</title><path stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" d="M4 7h22M4 15h22M4 23h22"></path></svg>
					    </span>
				    </div>
            <div className="col-auto d-flex">
              <LangSelector/>
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
                    className={
                      "dropdown-menu " + (isOpenProfileMenu ? "show" : "")
                    }
                    aria-labelledby="user-dropdown-toggle"
                    style={{
                      position: "absolute",
                      inset: "0px auto auto 0px",
                      margin: "0px",
                      transform: "translate(-110px, 27px)",
                    }}
                  >
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        {t("PROFILE")}
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/change_password">
                        {t("CHANGE_PASSWORD")}
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li onClick={handleLogout}>
                      <span className="dropdown-item">
                        {t("LOGOUT")}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
