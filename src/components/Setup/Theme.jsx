import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import SetupServices from "../../services/Setup/setup.service";
import { setupTheme } from "../../store/action/Setup/setup.action";
import Loader from "../Common/Loader";

import {
  CUSTOM_SELECT_STYLE,
  PRIMARY_COLORS_LIST,
  SECONDARY_COLORS_LIST,
  TEMPLATE_LIST,
  REGEX
} from "../../utility/constants";

const Theme = ({ nextStep }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedPrimaryColor, setSelectedPrimaryColor] = useState({
    colorCode: "#000000",
    value: "Black",
    label: "Black",
  });
  const [selectedSecondaryColor, setSelectedSecondaryColor] = useState({
    colorCode: "#E0B154",
    value: "Yellow",
    label: "Yellow",
  });
  const [selectedTemplate, setSelectedTemplate] = useState(undefined);
  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState({
    templateLogo : '',
    description : '',
    facebookLink : '',
    instagramLink : '',
    linkedinLink : '',
    youtubeLink : '',
  });
  
  const changePrimaryColor = (event) => {
    setSelectedPrimaryColor(event);
  };
  const changeSecondaryColor = (event) => {
    setSelectedSecondaryColor(event);
  };
  const changeTemplate = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const [logo, setLogo] = useState(undefined);
  const [templateLogo, setTemplateLogo] = useState(undefined);

  const onInit = () => {
    SetupServices.getTemplate().then((response) => {
      if (response.data.status) {
        let themeData = response.data.data;

        let pColor = PRIMARY_COLORS_LIST.find(
          (cCode) => cCode.colorCode === themeData?.primary_color
        );
        pColor && setSelectedPrimaryColor(pColor);

        let sColor = SECONDARY_COLORS_LIST.find(
          (cCode) => cCode.colorCode === themeData?.secondary_color
        );
        pColor && setSelectedSecondaryColor(sColor);

        setDescription((themeData?.description !== 'null' || themeData?.description !== null) ? themeData?.description: '');
        setSelectedTemplate(themeData?.template_id || 1);
        setLogo(themeData?.logo_path || `assets/img/ic_upload.png`);
        setTemplateLogo(themeData?.logo_path || undefined);
        setFacebookLink(
          themeData?.facebook_social_link !== "null"
            ? themeData?.facebook_social_link
            : ""
        );
        setInstagramLink(
          themeData?.instagram_social_link !== "null"
            ? themeData?.instagram_social_link
            : ""
        );
        setLinkedinLink(
          themeData?.linkedin_social_link !== "null"
            ? themeData?.linkedin_social_link
            : ""
        );
        setYoutubeLink(
          themeData?.youtube_social_link !== "null"
            ? themeData?.youtube_social_link
            : ""
        );
      }
    });
  };

  useEffect(() => {
    onInit();
  }, []);

  const logoInputRef = useRef(null);
  const handleFileUpload = (event) => {
    let profile =
      event.target.files.length > 0 ? event.target.files[0] : undefined;
    if (profile !== undefined) {
      setLogo(URL.createObjectURL(profile));
      setTemplateLogo(profile);
    }
  };

  const handleSubmit = () => {
    
    setError({
      templateLogo : '',
      description : '',
      facebookLink : '',
      instagramLink : '',
      linkedinLink : '',
      youtubeLink : '',
    });

    let isErrorExist = false;
    if(description === '' || (description && !description.replace(/\s/g, '').length)){
      setError(prevState => { return { ...prevState, description : t('DESCRIPTION_REQ') } })
      isErrorExist = true;
    }
    if(!templateLogo){
      setError(prevState => { return { ...prevState, templateLogo : t('LOGO_REQ') } })
      isErrorExist = true;
    }
    if(facebookLink && !REGEX.URL.test(facebookLink)){
      setError(prevState => { return { ...prevState, facebookLink : t('INVALID_URL') } })
      isErrorExist = true;
    }
    if(instagramLink && !REGEX.URL.test(instagramLink)){
      setError(prevState => { return { ...prevState, instagramLink : t('INVALID_URL') } })
      isErrorExist = true;
    }
    if(linkedinLink && !REGEX.URL.test(linkedinLink)){
      setError(prevState => { return { ...prevState, linkedinLink : t('INVALID_URL') } })
      isErrorExist = true;
    }
    if(youtubeLink && !REGEX.URL.test(youtubeLink)){
      setError(prevState => { return { ...prevState, youtubeLink : t('INVALID_URL') } })
      isErrorExist = true;
    }
    
    if(!isErrorExist){
    setIsLoading(true);
    const formData = new FormData();
    formData.append("primary_color", selectedPrimaryColor.colorCode);
    formData.append("secondary_color", selectedSecondaryColor.colorCode);
    formData.append("template_id", selectedTemplate);
    formData.append("logo", templateLogo);
    formData.append("facebook_social_link", facebookLink);
    formData.append("instagram_social_link", instagramLink);
    formData.append("linkedin_social_link", linkedinLink);
    formData.append("youtube_social_link", youtubeLink);
    formData.append("description", description);

    const headersProps = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    dispatch(setupTheme(formData, headersProps))
      .then((response) => {
        setIsLoading(false);
        if (response.status) {
          nextStep();
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
    }
  };

  return (
    <>
      <hr className="mb-4" />
      <div className="row g-4 settings-section">
        <div className="col-12 col-md-12">
          <div className="app-card app-card-settings shadow-sm p-4">
            <h2 className="title mb-2 mt-0">Choose Theme</h2>
            <span className="subtitle">{t("CHOOSE_COLOR_TEXT")}</span>
            <br />
            <br />
            <div className="app-card-body">
              <form className="settings-form">
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label htmlFor="name" className="form-label">
                      {t("PRIMARY_COLOR")}
                    </label>
                    <Select
                      onChange={changePrimaryColor}
                      value={selectedPrimaryColor}
                      styles={CUSTOM_SELECT_STYLE}
                      isSearchable={false}
                      options={PRIMARY_COLORS_LIST}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="name" className="form-label">
                      {t("SECONDARY_COLOR")}
                    </label>
                    <Select
                      onChange={changeSecondaryColor}
                      value={selectedSecondaryColor}
                      styles={CUSTOM_SELECT_STYLE}
                      isSearchable={false}
                      options={SECONDARY_COLORS_LIST}
                    />
                  </div>
                  <span>{t("CHOOSE_THEME_TEXT")}</span>
                  <br />
                  <br />
                  <div className="mb-3 col-md-12">
                    <div className=" g-4 template-theme">
                      {TEMPLATE_LIST.map((template) => {
                        return (
                          <div
                            key={template.template_id}
                            className={`template-theme-cover ${
                              selectedTemplate === template.template_id
                                ? "active-template"
                                : ""
                            }`}
                            onClick={() => {
                              changeTemplate(template.template_id);
                            }}
                          >
                            <div className="app-card app-card-doc shadow-sm h-100">
                              <div className="app-card-thumb-holder">
                                <div className="app-card-thumb">
                                  <img
                                    className="thumb-image"
                                    src={template.image}
                                    alt=""
                                    style={{ height: "112px" }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="mb-3">{t("LOGO_TEXT")}</div>
                  <div className="mb-3 col-md-12">
                  <h2 className="title">Do you want to add a logo?</h2>
                    <input
                      type="file"
                      accept="image/png, image/jpg, image/jpeg"
                      ref={logoInputRef}
                      style={{ display: "none" }}
                      name="profile_image"
                      onChange={handleFileUpload}
                    />
                    <img
                      onClick={() => logoInputRef.current.click()}
                      src={logo}
                      alt="Company Logo"
                      style={{
                        width: 100,
                        height: 100,
                        padding:2,
                        border: "1px solid #ced4da",
                        borderRadius: "7px",
                      }}
                    />
                    { error.templateLogo !== '' && <span className="error_text"> { error.templateLogo } </span> }
                  </div>
                  
                  <div className="mb-3 col-md-6">
                    <label className="form-label">{t("FACEBOOK")}</label>
                    <div className="social-cover">
                      <span className="social-icon">
                        <img
                          src={`assets/img/f-icon.png`}
                          alt="FB"
                        />
                      </span>
                      <input
                        className="custom-form-control form-control-lg"
                        type="text"
                        name="facebook"
                        placeholder={t("FACEBOOK")}
                        value={facebookLink || ""}
                        onChange={(e) => {
                          setFacebookLink(e.target.value);
                        }}
                      />                      
                    </div>
                    { error.facebookLink !== '' && <span className="error_text"> { error.facebookLink } </span> }
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">{t("INSTAGRAM")}</label>
                    <div className="social-cover">
                      <span className="social-icon">
                        <img
                          src={`assets/img/insta-icon.png`}
                          alt="FB"
                        />
                      </span>
                      <input
                        className="custom-form-control form-control-lg"
                        type="text"
                        name="instagram"
                        placeholder={t("INSTAGRAM")}
                        value={instagramLink || ""}
                        onChange={(e) => {
                          setInstagramLink(e.target.value);
                        }}
                      />                      
                    </div>
                    { error.instagramLink !== '' && <span className="error_text"> { error.instagramLink } </span> }
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">{t("LINKEDIN")}</label>
                    <div className="social-cover">
                      <span className="social-icon">
                        <img
                          src={`assets/img/in-icon.png`}
                          alt="FB"
                        />
                      </span>
                      <input
                        className="custom-form-control form-control-lg"
                        type="text"
                        name="linkedin"
                        placeholder={t("LINKEDIN")}
                        value={linkedinLink || ""}
                        onChange={(e) => {
                          setLinkedinLink(e.target.value);
                        }}
                      />                      
                    </div>
                    { error.linkedinLink !== '' && <span className="error_text"> { error.linkedinLink } </span> }
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">{t("YOUTUBE")}</label>
                    <div className="social-cover">
                      <span className="social-icon">
                        <img
                          src={`assets/img/youtube-icon.png`}
                          alt="FB"
                        />
                      </span>
                      <input
                        className="custom-form-control form-control-lg"
                        type="text"
                        name="youtube"
                        placeholder={t("YOUTUBE")}
                        value={youtubeLink || ""}
                        onChange={(e) => {
                          setYoutubeLink(e.target.value);
                        }}
                      />
                    </div>
                    { error.youtubeLink !== '' && <span className="error_text"> { error.youtubeLink } </span> }
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">{t("DESCRIPTION")}</label>
                    <textarea
                          className="custom-form-control form-control-lg"
                          rows="3"
                          name="description"
                          placeholder={t("DESCRIPTION")}
                          value={description}
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                        />
                        { error.description !== '' && <span className="error_text"> { error.description } </span> }
                    </div>
                </div>
                <div className="row justify-content-between">
                  <div className="col-auto"></div>
                  <div className="col-auto">
                    <button
                      onClick={handleSubmit}
                      type="button"
                      className="btn app-btn-primary"
                    >
                      {isLoading ? <Loader type="dots" /> : t("NEXT")}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Theme;
