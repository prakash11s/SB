import React from 'react';
import Slider from 'react-slick';

import { PUBLIC_URL } from '../../utility/constants';

const BannerSlider = () => {
    
    const img = PUBLIC_URL+'/assets/img/banner1.png';

    const bannerList = [
        {
            url : img,
            intro_greetings : 'Welcome To Soul Business',
            intro_title_top : 'We Pay 50%, You Pay 50%',
            intro_title : 'Home Services, On Demand.'
        },
        /*{
            url : PUBLIC_URL+'/assets/img/banner1.png',
            intro_greetings : 'Welcome To Soul Business',
            intro_title_top : 'We Pay 30%, You Pay 70%',
            intro_title : 'Home Services, On Demand.'
        },
        {
            url : PUBLIC_URL+'/assets/img/banner1.png',
            intro_greetings : 'Welcome To Soul Business',
            intro_title_top : 'We Pay 15%, You Pay 85%',
            intro_title : 'Home Services, On Demand.'
        },*/        
    ]

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className="intro position-relative hero-banner">
            <div className="intro-active">
                <Slider {...settings}>
                    {
                        bannerList.map((banner, i) => {
                            return(
                                <React.Fragment key={i} >
                                    <div className=" carousel-item-a intro-item bg-image" style={{ backgroundImage:`url(${banner.url})` }}>
                                        <div className="overlay overlay-a"></div>
                                        <div className="intro-content display-table">
                                            <div className="table-cell">
                                                <div className="container">
                                                    <div className="row justify-content-end">
                                                        <div className="col-md-5">
                                                            <div className="intro-body">
                                                                <span>{ banner.intro_greetings }</span>
                                                                <p className="intro-title-top">{ banner.intro_title_top }</p>
                                                                <h1 className="intro-title mb-4">
                                                                    { banner.intro_title }
                                                                </h1>   
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            );
                        })
                    } 
                </Slider>               
            </div>
        </div>
    );
}

export default BannerSlider;
