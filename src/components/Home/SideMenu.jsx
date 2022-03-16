import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

const SideMenu = ({ toggleSideMenuOpen, openLoginModal }) => {

    const { t } = useTranslation();

    return (        
        <div className="box-collapse-open box-collapse">
            <span onClick={ toggleSideMenuOpen } className="close-box-collapse right-boxed btn-close"></span>
            <ul className="navbar-nav">
                <li>
                    {/* <div className="form-group search-box search-box-mobile mb-3">
                        <input type="text" className="custom-form-control form-control-lg" placeholder={ t('GLOBAL_SEARCH') }/>
                        <span className="search-icon"><i className="fa fa-search" aria-hidden="true"></i></span>
                    </div> */}
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={ openLoginModal }  >{ t('LOGIN_SIGN_UP') }</a>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/become_partner">{ t('BECOME_PARTNER') }</Link>
                </li>
            </ul>
        </div>
        
    );
}

export default SideMenu;