import React from 'react'
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';

import { PUBLIC_URL } from '../../utility/constants';

const OurExpert = () => {

    const { t } = useTranslation();
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [{
            breakpoint: 991,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                arrow: false
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrow: false
            }
        }
    ]};

    const expertList = [
        {
            url : PUBLIC_URL+'/assets/img/expert-img-1.png',
            title : 'Home Cleaning Services',
            rating : 'Rated 4.7 Out Of 5'
        },
        {
            url : PUBLIC_URL+'/assets/img/expert-img-2.png',
            title : 'Home Cleaning Services',
            rating : 'Rated 4.7 Out Of 5'
        },
        {
            url : PUBLIC_URL+'/assets/img/expert-img-1.png',
            title : 'Home Cleaning Services',
            rating : 'Rated 4.7 Out Of 5'
        },
        {
            url : PUBLIC_URL+'/assets/img/expert-img-2.png',
            title : 'Home Cleaning Services',
            rating : 'Rated 4.7 Out Of 5'
        }     
    ]

    return (
        <section className="section-experts section-tb8" style={{ backgroundImage:`url(${PUBLIC_URL}'/assets/img/expert-bg.png')` }} >                
            <div className="container">
                <div className="row">
                        <div className="col-md-12">
                            <div className="title-wrap">
                                <div className="title-box text-center">
                                    <h2 className="title-a">{t("OUR_EXPERT")}</h2>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                <div className="experts-active">
                    <Slider {...settings}>
                    {
                        expertList.map((expert, i) => {
                            return(
                                <React.Fragment key={i} >
                                    <div  className="experts-cover" style={{ backgroundImage:`url(${expert.url})` }} >                            
                                        <div className="expert-content">
                                            <h4>{ expert.title }</h4>
                                            <p>{ expert.rating }</p>
                                        </div>
                                    </div>
                                </React.Fragment>
                            );
                        })
                    }
                    </Slider>
                </div>
            </div>
        </section>
    );
}

export default OurExpert;