import React, { useState, useEffect } from 'react';

import HomeServices from '../../services/Home/Home.service';

import DiscountSlider from './DiscountSlider';
import BannerSlider from './BannerSlider';

import Services from './Services';
import Offers from './Offers';
import CustomerSay from './CustomerSay';
import OurExpert from './OurExpert';
import Statistics from './Statistics';
import WorkGuarantee from './WorkGuarantee';

const Home = ({ generalSettings }) => {

  const [serviceList, setServiceList] = useState([]);
  const [statisticsList, setStatisticsList] = useState([]);
  const [testimonialList, setTestimonialList] = useState([]);
  const [offersList, setOffersList] = useState([]);

  /** Easy on scroll event listener */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }
  /** Back to top button */
  let backtotop = document.querySelector('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  useEffect(() => {
    Promise.all([HomeServices.category(), HomeServices.statistics(), HomeServices.testimonial(), HomeServices.offers(), HomeServices.generalSettings()]).then((values) => {
      if (values[0].status) {
        setServiceList(values[0].data.data);
      }
      if (values[1].status) {
        setStatisticsList(values[1].data.data);
      }
      if (values[2].status) {
        setTestimonialList(values[2].data.data);
      }
      if (values[3].status) {
        setOffersList(values[3].data.data);
      }
    });

  }, []);

  return (
    <>
      <BannerSlider />
      <main id="main">
        <Services serviceList={serviceList} isBecomePartner={false} />
        <DiscountSlider offersList={offersList} />
        {/* <Offers offersList={offersList}/> */}
        <WorkGuarantee generalSettings={generalSettings} />
        <CustomerSay testimonialList={testimonialList} />
        {/* <OurExpert /> */}
        <Statistics statisticsList={statisticsList} />
      </main>
      <a href="#" className="back-to-top d-flex align-items-center justify-content-center">
        <img src="assets/img/up-arrow.png" width="22px" alt="" />
      </a>
    </>
  );
}

export default Home;