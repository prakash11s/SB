import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import LangSelector from '../Common/LangSelector';

const TopHeader = () => {

    const { t } = useTranslation();

    return (
        <section id="topbar" className="d-flex align-items-center">
            <div className="container-md container-fluid d-flex justify-content-center justify-content-between mobile-view-topbar">
                <div className="d-flex align-items-center justify-content-center">
                </div>
                <div className="top-links">
                    <div className="lang_ul">
                        <LangSelector />
                        <div className="top_li mobile-partner-text">
                            <Link to="/become_partner"><img src="assets/img/beacom-partner.svg" alt="" />{t('BECOME_PARTNER')}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default TopHeader;