import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import HomeServices from "../../services/Home/Home.service";
import CommonContactUsForm from "../Home/CommonContactUsForm";
import Services from "./Services";
import Statistics from "./Statistics";

const BecomePartner = () => {
  const { i18n } = useTranslation();
  const [pageContent, setPageContent] = useState(undefined);
  const [serviceList, setServiceList] = useState([]);

  const [statisticsList, setStatisticsList] = useState([]);
  const params = useParams();

  useEffect(() => {
    HomeServices.pages("become_partner")
      .then((response) => {
        if (response.data.status) {
          let content = response.data.data;
          if (params.lang === "pt") {
            setPageContent(content.content_pt);
          } else {
            setPageContent(content.content);
          }
        }
      })
      .catch();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    Promise.all([HomeServices.category(), HomeServices.statistics()]).then(
      (values) => {
        if (values[0].status) {
          setServiceList(values[0].data.data);
        }
        if (values[1].status) {
          setStatisticsList(values[1].data.data);
        }
      }
    );
  }, []);

  return (
    <>
      <section className="become-section section-tb8 pb-0">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              {params.lang === "pt" || i18n.language === "pt" ? (
                <>
                  <h2 className="title-a mb-3">
                    Ganhar mais. Ganhe respeito. Segurança garantida.
                  </h2>
                  <p>
                  A SoulBusiness esta ajudando milhares de empreendedores a alcançar os seus objetivos, através de uma plataforma escalável e confiável. Venha fazer parte dessa escalada com a gente! Torne-se um membro premium.
                  </p>
                </>
              ) : (
                <>
                  <h2 className="title-a mb-3">
                    Earn More. Earn Respect. Safety Ensured.
                  </h2>
                  <p>
                  SoulBusiness is helping thousands of entrepreneurs to achieve their goals, through a scalable and reliable platform. Come join this climb with us! Become a premium member.
                  </p>
                </>
              )}
            </div>
            <div className="col-md-6">
              <img alt="" src={`assets/img/about-services.png`} />
            </div>
          </div>
        </div>
        <CommonContactUsForm />
      </section>

      <Statistics statisticsList={statisticsList} />

      <Services serviceList={serviceList} isBecomePartner={true} />
    </>
  );
};

export default BecomePartner;
