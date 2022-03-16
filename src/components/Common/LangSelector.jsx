import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import { LANGUAGE_OPTIONS } from '../../utility/constants';
import {
  languageSelector
} from "../../store/action/Auth/auth.action";

const LangSelector = () => {
  const { i18n } = useTranslation();

  const dispatch = useDispatch();
  const {
    language
  } = useSelector((state) => state.auth.user !== null && state.auth?.user);
 
  const [langSelected, setLangSelected] = useState(language);

  useEffect(() => {
    const languageSelected = LANGUAGE_OPTIONS?.find(element => element?.value === language);
    setLangSelected(languageSelected);
     changeLanguage({ label: 'onReload', value: languageSelected?.value });
  }, [language]);

  const customStyles = {
    option: (styles, state) => ({
      ...styles,
      cursor: "pointer",
      backgroundColor: state.isSelected ? "#E0B154" : styles.backgroundColor,
      textAlign: "center",

      color: "#3F3F3F",
      "&:hover": {
        backgroundColor: "#F6F6F6",
      }
    }),
    control: (styles) => ({
      ...styles,
      cursor: "pointer",
    }),
  };

  const changeLanguage = (event) => {
    if (event.label === 'onReload') {
      i18n.changeLanguage(event.value);
    } else {
      i18n.changeLanguage(event.value);
      dispatch(languageSelector(event.value)).then().catch();
    }
  }

  return (
    <Select
      placeholder="Portuguese"
      className="select-format"
      onChange={changeLanguage}
      value={langSelected}
      styles={customStyles}
      isSearchable={false}
      options={LANGUAGE_OPTIONS}
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      }}
    />
  )
}

export default LangSelector;