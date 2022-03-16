import { useTranslation } from 'react-i18next';
import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import Login from './Login';
import Registration from './Registration';
import ResetPassword from './ResetPassword';
import SideMenu from './SideMenu';

import ModalHOC from '../Common/Modal';
import VerifyEmail from '../Common/VerifyEmail';
import VerifyOTP from '../Common/VerifyOTP';
import GooglePlaces from '../Common/GooglePlaces';

const BottomHeader = () => {

    const { t } = useTranslation();

    const { isSocialUser } = useSelector((state) => state.auth);

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);    
    const [isVerifyEmailOpen, setIsVerifyEmailOpen] = useState(false);
    const [isVerifyOTPOpen, setIsVerifyOTPOpen] = useState(false);
    const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    const [isLocationOpen, setIsLocationOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState({
        address:'',
        latitude: '',
        longitude: ''
      });
    const [verifyData, setVerifyData] = useState({
        email: undefined,
        type: undefined
    });
    
    const [token, setToken] = useState();
    const toggleLocationModal = () => {
        setIsLocationOpen(!isLocationOpen);
    }
    const toggleLoginModal = () => {
        setIsLoginOpen(!isLoginOpen);
    }
    const toggleRegistrationModal = () => {
        setIsRegistrationOpen(!isRegistrationOpen);
    }
    const openVerifyEmailModal = (email, type) => {        
        setVerifyData({
            email: email,
            type: type
        });
        setIsVerifyEmailOpen(true);
        setIsRegistrationOpen(false);
        setIsLoginOpen(false);
    }
    const toggleVerifyEmailModal = () => {
        setIsVerifyEmailOpen(!isVerifyEmailOpen);
    }
    const openVerifyOTPModal = (email, type) => {        
        setVerifyData({
            email: email,
            type: type
        });        
        setIsVerifyOTPOpen(true);
        setIsVerifyEmailOpen(false);
    }
    const toggleVerifyOTPModal = () => {
        setIsVerifyOTPOpen(!isVerifyOTPOpen);
    }
    const toggleResetPasswordModal = () => {
        setIsResetPasswordOpen(!isResetPasswordOpen);
    }
    const openResetPasswordModal = (token) => {
        setToken(token);
        setIsVerifyOTPOpen(false);
        setIsResetPasswordOpen(true);
    }
    const openLoginModal = () => {
        setIsRegistrationOpen(false);
        setIsLoginOpen(true);
        setIsVerifyEmailOpen(false);
        setIsVerifyOTPOpen(false);
        setIsSideMenuOpen(false);
        setIsResetPasswordOpen(false);
    }
    const openRegistrationModal = () => {
        setIsLoginOpen(false);
        setIsRegistrationOpen(true);
    }    
    const toggleSideMenuOpen = () => {
        setIsSideMenuOpen(!isSideMenuOpen);
    }

    useEffect(() => {
        if(isSocialUser) {
            openRegistrationModal();
        }
    }, [isSocialUser])

    return (
        <>
            { isLoginOpen && <ModalHOC isModalOpen={isLoginOpen} toggleModal={toggleLoginModal} modalTitle={ t('LOGIN') } children={<Login openRegistrationModal={openRegistrationModal} openVerifyEmailModal={openVerifyEmailModal} />} /> }
            { isRegistrationOpen && <ModalHOC isModalOpen={isRegistrationOpen} toggleModal={toggleRegistrationModal} modalTitle={ t('SIGN_UP') } children={<Registration openLoginModal={openLoginModal} openVerifyEmailModal={openVerifyEmailModal} toggleLocationModal={ toggleLocationModal } selectedAddress={selectedAddress} />} /> }
            { isVerifyEmailOpen && <ModalHOC isModalOpen={isVerifyEmailOpen} toggleModal={toggleVerifyEmailModal} modalTitle={ t('VERIFY_EMAIL') } children={<VerifyEmail verifyEmailData={verifyData} openVerifyOTPModal={openVerifyOTPModal} openLoginModal={ openLoginModal } /> } /> }
            { isVerifyOTPOpen && <ModalHOC isModalOpen={isVerifyOTPOpen} toggleModal={toggleVerifyOTPModal} modalTitle={ t('OTP_VERIFICATION') } children={<VerifyOTP verifyOTPData={verifyData} openLoginModal={ openLoginModal } openResetPasswordModal={ openResetPasswordModal } /> } /> }
            { isResetPasswordOpen && <ModalHOC isModalOpen={isResetPasswordOpen} toggleModal={toggleResetPasswordModal} modalTitle={ t('RESET_PWD') } children={<ResetPassword token={token} openLoginModal={ openLoginModal } /> } /> }
            
            { isLocationOpen && <ModalHOC isModalOpen={isLocationOpen} toggleModal={toggleLocationModal} children={<GooglePlaces toggleLocationModal={ toggleLocationModal } selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} /> } /> }
            
            { isSideMenuOpen && <SideMenu toggleSideMenuOpen={toggleSideMenuOpen} openLoginModal={openLoginModal} /> }
            
            <nav className="navbar navbar-default navbar-trans navbar-expand-lg">
                <div className="container">
                    <Link className="logo navbar-brand text-brand" to="/">
                        <img src="assets/img/logo.png" alt="" />
                        </Link>
                    <button onClick={toggleSideMenuOpen} className="navbar-toggler collapsed navbar-toggle-box navbar-toggle-box-collapse" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarDefault" aria-expanded="false" aria-label="Toggle navigation">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    
                    <div className="navbar-collapse collapse justify-content-end" id="navbarDefault">
                        <ul className="navbar-nav align-items-center">
                            <li>
                                {/* <div className="form-group search-box">
                                    <input type="text" className="custom-form-control form-control-lg " placeholder={ t('GLOBAL_SEARCH') } />
                                    <span className="search-icon"><i className="fa fa-search" aria-hidden="true"></i></span>
                                </div> */}
                            </li>
                            <li className="nav-item">
                            <a className="nav-link" data-bs-toggle="modal" onClick={() => { setIsLoginOpen(!isLoginOpen) } } role="button">{ t('LOGIN_SIGN_UP') }</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default BottomHeader;