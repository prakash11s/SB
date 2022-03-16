import Slider from "react-slick";

const DiscountSlider = ({ offersList }) => {

    const settings = {
        dots: false,
        infinite: true,
        centerMode: true,
        centerPadding: "60px",
        speed: 500,
        slidesToShow: 3,
        responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                arrow: false
            }
        },
        {
            breakpoint: 991,
            settings: {
                slidesToShow: 1.5,
                slidesToScroll: 1.5,
                arrow: false
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrow: false,
                centerMode: false,
            }
        },
    ]};
    return (
        <section className="section-discount section-tb8">
            <div className="container">
                <div className="discount-active">
                <Slider {...settings}>
                    { offersList && offersList.length !== 0 && offersList.map((offer, i) => {
                        return (
                    <div className="discount-list" key={i}>
                        <div className="discount-card">
                            <div className="discount-content">
                                <h4>{ offer.promocode_name }</h4>
                                <h6>{ offer.promocode }</h6>
                                { offer.fix_amount ? <h3>{offer.fix_amount}$</h3> : <h3>{offer.fix_percentage}%</h3> }
                                {/* <p>Min 30% off</p> */}
                            </div>
                            <div className="discount-img" style={{ backgroundImage:`url(${offer.promocode_photo_path})` }} ></div>
                        </div>
                    </div>
                    )
                    })}
                </Slider> 
                </div>
            </div>
        </section>
    );
}
export default DiscountSlider;