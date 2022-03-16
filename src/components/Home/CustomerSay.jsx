import Slider from "react-slick";
import { useTranslation } from 'react-i18next';

const CustomerSay = ({ testimonialList }) => {

    const { t } = useTranslation();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
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
    return (
        <section className="section-testimonial section-tb8">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title-wrap">
                            <div className="title-box text-center">
                                <h2 className="title-a">{ t('CUSTOMER_SAY_TITLE') }</h2>
                                <p>{ t('CUSTOMER_SAY_QUOTE') }</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Slider {...settings}>
                {                    
                    testimonialList && testimonialList.map( (csay,i) => {
                        return (                            
                            <div key={i} className="testimonial-active">
                                <div className="testimonial-cover">
                                    <span>{ csay.title }</span>
                                    <p className="quote">{ csay.quote }</p>
                                    <h6>{ csay.author }</h6>
                                </div>                
                            </div>
                        );
                    })
                }
                </Slider>
            </div>
        </section>
    );

}

export default CustomerSay;