import { React, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  return (
    <>
      <div className="app-content pt-3 p-md-3 p-lg-4">
        <div className="container-xl">
          {/* <h1 className="app-page-title">{ t('PROFILE') }</h1> */}
          <div className="row gy-4">
            <div className="col-12 col-lg-12">
              <div className="app-card app-card-account shadow-sm d-flex flex-column align-items-start">
                <div className="app-card-header p-3 border-bottom-0 w-100">
                  <div className="row align-items-center gx-3">
                    <div className="col-6">
                      <div className="d-flex align-items-center">
                        <div className="app-icon-holder" style={{ backgroundImage: `url(${user?.provider_info?.logo_path || `assets/img/professional.svg`})` }} >
                        </div>
                        <h4 className="app-card-title mx-3">{t('PROFILE')}</h4>
                      </div>
                    </div>
                    <div className="col-6 text-end">
                      <Link className="btn app-btn-primary" to="/profile_update">
                        {t("MANAGE_PROFILE")}
                        <img className="manage-profile-ico"
                          src={`assets/img/ic_edit.png`}
                          width="15px"
                          alt="edit"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="app-card-body px-4 w-100">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="item border-bottom py-3">
                        <div className="row justify-content-between align-items-center">
                          <div className="col-auto">
                            <div className="item-label text-label">
                              <strong>{t('FULL_NAME')}</strong>
                            </div>
                            <div className="item-data">{user?.name}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="item border-bottom py-3">
                        <div className="row justify-content-between align-items-center">
                          <div className="col-auto">
                            <div className="item-label text-label">
                              <strong>{t(`${user?.provider_type}_NO`)}</strong>
                            </div>
                            <div className="item-data">{user?.cpf_no}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="item border-bottom py-3">
                        <div className="row justify-content-between align-items-center">
                          <div className="col-auto">
                            <div className="item-label text-label">
                              <strong>{t('EMAIL')}</strong>
                            </div>
                            <div className="item-data">{user?.email}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="item border-bottom py-3">
                        <div className="row justify-content-between align-items-center">
                          <div className="col-auto">
                            <div className="item-label text-label">
                              <strong>{t('FANTASY_NAME')}</strong>
                            </div>
                            <div className="item-data">{user?.provider_info?.fantacy_name}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="item border-bottom py-3">
                        <div className="row justify-content-between align-items-center">
                          <div className="col-auto">
                            <div className="item-label text-label">
                              <strong>{t('COMPANY_NAME')}</strong>
                            </div>
                            <div className="item-data">{user?.provider_info?.company_name}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="item border-bottom py-3">
                        <div className="row justify-content-between align-items-center">
                          <div className="col-auto">
                            <div className="item-label text-label">
                              <strong>{t('INVENTED_NAME')}</strong>
                            </div>
                            <div className="item-data">{user?.provider_info?.invented_name}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="item border-bottom py-3">
                        <div className="row justify-content-between align-items-center">
                          <div className="col-auto">
                            <div className="item-label text-label">
                              <strong>{t('MOBILE_NUMBER')}</strong>
                            </div>
                            <div className="item-data">{user?.mobile_number}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="item border-bottom py-3">
                        <div className="row justify-content-between align-items-center">
                          <div className="col-auto">
                            <div className="item-label text-label">
                              <strong>{t('DOB')}</strong>
                            </div>
                            <div className="item-data">{user?.date_of_birth}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="item border-bottom py-3">
                        <div className="row justify-content-between align-items-center">
                          <div className="col-auto">
                            <div className="item-label text-label">
                              <strong>{t('LANGUAGE')}</strong>
                            </div>
                            <div className="item-data">{user?.language}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="item border-bottom py-3">
                        <div className="row justify-content-between align-items-center">
                          <div className="col-auto">
                            <div className="item-label text-label">
                              <strong>{t('ADDRESS')}</strong>
                            </div>
                            <div className="item-data">{user?.address}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="item border-bottom py-3">
                        <div className="row justify-content-between align-items-center">
                          <div className="col-auto">
                            <div className="item-label text-label">
                              <strong>{t('SERVICE_LOCATION')}</strong>
                            </div>
                            <div className="item-data">{user?.provider_info?.service_location && user?.provider_info?.service_location.split(",").map((el) => t(el)).join(", ")}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="item border-bottom py-3">
                        <div className="row justify-content-between align-items-center">
                          <div className="col-auto">
                            <div className="item-label text-label">
                              <strong>{t('PIX_NUMBER')}</strong>
                            </div>
                            <div className="item-data">{user?.provider_info?.pix_number}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="item border-bottom py-3">
                        <div className="row justify-content-between align-items-center">
                          <div className="col-auto">
                            <div className="item-label text-label">
                              <strong>{t('DESCRIPTION')}</strong>
                            </div>
                            <div className="item-data">{user?.provider_info?.description}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
