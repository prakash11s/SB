import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import HomeServices from "../../services/Home/Home.service";

const AboutUs = () => {
  const { i18n } = useTranslation();
  const [pageContent, setPageContent] = useState(undefined);
  const [statisticsList, setStatisticsList] = useState([]);
  const params = useParams();

  const getFormatedCounter = (n) => {
    if (n <= 100) return n;
    if (n < 1e3) return n + " +";
    if (n >= 1e3 && n < 1e6) return +(Math.floor(n / 1e3)).toFixed(0) + " K +";
    if (n >= 1e6 && n < 1e9) return +(Math.floor(n / 1e6)).toFixed(0) + " Million +";
    if (n >= 1e9 && n < 1e12) return +(Math.floor(n / 1e9)).toFixed(0) + " Billion +";
  }

  const firstLetterCapital = (word, index) => {
    return Object.keys(word)[index]?.split("_")[0]?.charAt(0)?.toUpperCase() + Object.keys(word)[index]?.split("_")[0]?.slice(1) + " " +
      Object.keys(word)[index]?.split("_")[1]?.charAt(0)?.toUpperCase() + Object.keys(word)[index]?.split("_")[1]?.slice(1)
  }

  const statistics = [
    {
      count: getFormatedCounter(Object.values(statisticsList)[0]),
      title: firstLetterCapital(statisticsList, 0)
    },
    {
      count: getFormatedCounter(Object.values(statisticsList)[1]),
      title: firstLetterCapital(statisticsList, 1)
    },
    {
      count: getFormatedCounter(Object.values(statisticsList)[2]),
      title: firstLetterCapital(statisticsList, 2)
    }
  ];


  useEffect(() => {
    HomeServices.pages('about_us').then((response) => {
      if (response.data.status) {
        let content = response.data.data;
        if (params.lang === 'pt') {
          setPageContent(content.content_pt);
        } else {
          setPageContent(content.content);
        }
      }
    }).catch();
    HomeServices.statistics().then((response) => {
      if (response.data.status) {
        setStatisticsList(response.data.data)
      }
    }).catch();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      {params.lang === "pt" || i18n.language === "pt" ? (
        <>
          <section className="about-section section-tb8">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <h2 className="title-a mb-3">Sobre Nós</h2>
                  <p>
                    A <b>Soul Business</b> é uma plataforma de serviços que
                    permite aos fornecedores de diversos setores a publicar seu
                    negócio de forma gerenciável, controlada e segura,
                    permitindo a visualização de relatórios e indicadores de
                    pagamentos e a gestão dos serviços, o gerenciamento dos
                    profissionais, serviços e cupons, além de disponibilizar aos
                    seus clientes vinculados o acesso da <i>Agenda Online</i>,
                    onde o usuário cliente pode agendar serviços, adiciona-los
                    nos favoritos e avalia-los para um controle de qualidade.
                  </p>
                  <p>
                    A plataforma <b>Soul Business</b> obtém a
                    <i>Agenda Online</i>, no qual é um mecanismo que controla e
                    escala o seu negócio a um alto nível, permitindo a
                    organização dos setores, estabelecimentos e o fornecimento
                    dos serviços aos seus clientes, permitindo a confirmação da
                    disponibilidade, visibilidade da agenda dos profissionais
                    por serviço, controle de confirmação de atendimento com
                    notificação na tela do seu celular, super prático. Os
                    clientes obtêm acesso na plataforma <b>Soul Business</b>
                    através do app disponível para download no Google Store e
                    App Store ou por meio do site www.soulbusinessapp.com.br , e
                    pode usufruir da plataforma <b>Soul Business</b> de forma
                    GRATUITA, adicionando nos seus favoritos todos os serviços,
                    profissionais e estabelecimentos desejados.
                  </p>
                </div>
                <div className="col-md-6">
                  <img alt="" src={`assets/img/about-services.png`} />
                </div>
              </div>
            </div>
          </section>
          <section className="happy-about-section section-tb8">
            <div className="container">
              <h3>
                Os valores essenciais da Soul Business refletem-se em ajudar o
                empreendedor a escalar o próprio negócio em alto nível, de forma
                prática e objetiva.
              </h3>
              <div className="row title-box">
                {
                  statistics.map((survey, i) => {
                    return (
                      <div className="col-md-4">
                        <div className="satifaction-cover">
                          <h2>{survey.count}</h2>
                          <h5 className="mb-2">{survey.title}</h5>
                          <p>
                            Acreditamos no fornecimento do suporte acessível com
                            respostas rápidas, apoio dedicado ao Provedor de Serviço e
                            ao Usuário Consumidor.
                          </p>
                        </div>
                      </div>
                    );
                  })
                }
              </div>
            </div>
          </section>
          <section className="section-team section-tb8">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="title-wrap">
                    <div className="title-box text-center">
                      <h2 className="title-a">Nossa Equipe de Liderança</h2>
                      <p>
                        Nossos líderes então focados na usabilidade da
                        plataforma Soul Business, pensando sempre em prover
                        recursos e controles para sustentar as necessidades dos
                        nossos clientes – Provedor de Serviços e Usuário
                        Consumidor.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="leadership-team-active">
                <div className="row leadership-team-cover justify-content-center">
                  <div className="col-md-4 leadership-team-content mb-5">
                    <span
                      className="leadership-profile"
                      style={{
                        backgroundImage: `url('/assets/img/profile_alexandre.jpeg')`,
                      }}
                    ></span>
                    <h4 className="mt-3">Alexandre Silva de Bem</h4>
                    <h6 className="">Fundador, Soul Business</h6>
                    <p>Especialista em Governança de TI & Compliance</p>
                    <p>Amante e Instrutor de Frameworks de Desenvolvimento;</p>
                    <p>
                      Fundador da ASB Technology e Escritor do Livro Governança
                      de TI na Prática.
                    </p>
                    <p>
                      É professor, palestrante e empreender, desenvolveu a
                      lógica da Sou Business com o principal objetivo, ajudar
                      pessoas de todas as classes, incluindo os informais que
                      trabalham por conta, pessoas e empresas com registro de
                      MEI, ME, EPP e empresas de grandes segmentos.
                    </p>
                  </div>
                  <div className="col-md-4 leadership-team-content mb-5">
                    <span
                      className="leadership-profile"
                      style={{
                        backgroundImage: `url('/assets/img/profile_felipe.jpeg')`,
                      }}
                    ></span>
                    <h4 className="mt-3">Felipe Moreno Barboza</h4>
                    <h6 className="">Co-founder, Soul Business</h6>
                    <p>
                      Especialista em Segurança da informação e Desenvolvimento
                      de Sistemas
                    </p>
                    <p>
                      Apaixonado por desenvolvimento de sistemas e jogos de
                      diversas plataformas;
                    </p>
                    <p>
                      Ajudou no engajamento das configurações e Infraestrutura
                      da plataforma Soul Business, garantindo a produção
                      conforme a regra de negócio designada pelo fundador.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="col-12">
            <div className="container leadership-team-content">
              <div className="row">
                <h6>
                  Nós da equipe Soul Business acreditamos no seu sucesso, defina
                  agora a sua nova realidade com uma plataforma que vai escalar
                  o seu negócio.
                </h6>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <section className="about-section section-tb8">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <h2 className="title-a mb-3">About Us</h2>
                  <p>
                    <b>Soul Business</b> is a service platform that allows
                    suppliers from various sectors to publish their business in
                    a manageable, controlled and secure way, allowing the
                    visualization of reports and payment indicators and the
                    management of services, the management of professionals,
                    services and coupons, in addition to making available to
                    their linked customers access to the <i>Online Schedule</i>,
                    where the client user can schedule services, add them to
                    favorites, and evaluate them for quality control.
                  </p>
                  <p>
                    The <b>Soul Business</b> platform obtains the
                    <i>Online Schedule</i>, in which it is a mechanism that
                    controls and scales your business to a high level, allowing
                    the organization of sectors, establishments and the
                    provision of services to its customers, allowing
                    confirmation of availability, visibility of the agenda of
                    professionals by service, control of confirmation of service
                    with notification on the screen of your mobile phone, super
                    practical. Customers get access to the <b>Soul Business</b>
                    platform through the app available for download in the
                    Google Store and App Store or through the
                    www.soulbusinessapp.com.br website, and the customer can
                    enjoy the <b>Soul Business</b> platform for FREE, adding to
                    your favorites all the services, professionals and
                    establishments you want.
                  </p>
                </div>
                <div className="col-md-6">
                  <img alt="" src={`assets/img/about-services.png`} />
                </div>
              </div>
            </div>
          </section>
          <section className="happy-about-section section-tb8">
            <div className="container">
              <h3>
                Soul Business's core values ​​are reflected in helping the
                entrepreneur to scale his or her own business at a high level,
                in a practical and objective way.
              </h3>
              <div className="row title-box">
                {
                  statistics.map((survey, i) => {
                    return (
                      <div className="col-md-4">
                        <div className="satifaction-cover">
                          <h2>{survey.count}</h2>
                          <h5 className="mb-2">{survey.title}</h5>
                          <p>
                            Acreditamos no fornecimento do suporte acessível com
                            respostas rápidas, apoio dedicado ao Provedor de Serviço e
                            ao Usuário Consumidor.
                          </p>
                        </div>
                      </div>
                    );
                  })
                }
              </div>
            </div>
          </section>
          <section className="section-team section-tb8">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="title-wrap">
                    <div className="title-box text-center">
                      <h2 className="title-a">Our Leadership Team</h2>
                      <p>
                        Our leads then focused on the usability of the Soul
                        Business platform, always thinking of providing
                        resources and controls to sustain the needs of our
                        customers - Service Provider and Consumer User.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="leadership-team-active">
                <div className="row leadership-team-cover justify-content-center">
                  <div className="col-md-4 leadership-team-content mb-5">
                    <span
                      className="leadership-profile"
                      style={{
                        backgroundImage: `url('/assets/img/profile_alexandre.jpeg')`,
                      }}
                    ></span>
                    <h4 className="mt-3">Alexandre Silva de Bem</h4>
                    <h6 className="">Founder, Soul Business</h6>
                    <p>IT Governance & Compliance Specialist</p>
                    <p>Lover and Instructor of Development Frameworks;</p>
                    <p>
                      Founder of ASB Technology and Writer of the IT Governance
                      Book in Practice.
                    </p>
                    <p>
                      He is a teacher, lecturer and entrepreneurship, developed
                      the logic of Sou Business with the main objective, to help
                      people of all classes, including the informal ones who
                      work on account, people and companies with registration of
                      MEI, ME, EPP and companies of large segments.
                    </p>
                  </div>
                  <div className="col-md-4 leadership-team-content mb-5">
                    <span
                      className="leadership-profile"
                      style={{
                        backgroundImage: `url('/assets/img/profile_felipe.jpeg')`,
                      }}
                    ></span>
                    <h4 className="mt-3">Felipe Moreno Barboza</h4>
                    <h6 className="">Co-Founder, Soul Business</h6>
                    <p>
                      Information Security and Systems Development Specialist
                    </p>
                    <p>
                      Passionate about developing systems and games from various
                      platforms;
                    </p>
                    <p>
                      Helped in the engagement of the settings and
                      infrastructure of the Soul Business platform, ensuring
                      production according to the business rule designed by the
                      founder.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="col-12">
            <div className="container leadership-team-content">
              <div className="row">
                <h6>
                  We of the Soul Business team believe in your success! now set
                  your new reality with a platform that will scale your
                  business.
                </h6>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AboutUs;
