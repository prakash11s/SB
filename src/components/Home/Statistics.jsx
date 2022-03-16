import React from 'react'
import { useTranslation } from 'react-i18next';

const Statistics = ({ statisticsList }) => {
    const { t } = useTranslation();
    const getFormatedCounter = (n) => {
        if (n <= 100) return n;
        if (n < 1e3) return n + " +";
        if (n >= 1e3 && n < 1e6) return +(Math.floor(n / 1e3)).toFixed(0) + " K +";
        if (n >= 1e6 && n < 1e9) return +(Math.floor(n / 1e6)).toFixed(0) + " Million +";
        if (n >= 1e9 && n < 1e12) return +(Math.floor(n / 1e9)).toFixed(0) + " Billion +";
    }
    const statistics = [
        {
            count: getFormatedCounter(Object.values(statisticsList)[0]),
            title: t('CUSTOMER_SERVED')
        },
        {
            count: getFormatedCounter(Object.values(statisticsList)[1]),
            title: t('VERIFIED_EXPERTS')
        },
        {
            count: getFormatedCounter(Object.values(statisticsList)[2]),
            title: t('LIVE_SERVICES')
        }
    ];
    return (
        <section className="customer-satisfaction section-tb8">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title-wrap">
                            <div className="title-box text-center">
                                <h2 className="title-a">{t("STATISTICS_TITLE")}</h2>
                                <p>{t("STATISTICS_PARAGRAPH")}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {
                        statistics.map((survey, i) => {
                            return (
                                <div key={i} className="col-md-4 col-sm-4 survey-col">
                                    <div className="survey-content">
                                        <div className="title-box text-center">
                                            <h2 className="title-a">{survey.count}</h2>
                                            <p>{survey.title}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </section>
    );
}

export default Statistics;