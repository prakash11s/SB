import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { CUSTOM_SELECT_STYLE, COLORS } from "../../utility/constants";
import Loader from "../../components/Common/Loader";
import DashboardServices from "../../services/Dashboard/Dashboard.service";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import ModalHOC from './../Common/Modal';
import DataDate from './../Common/DataDate';

const Dashboard = () => {
  const { t } = useTranslation();
  const [generalScheduleScheme, setGeneralScheduleScheme] = useState([]);
  const [servicesCompletedByType, setServicesCompletedByType] = useState([]);
  const [professionalCompletedService, setProfessionalCompletedService] =
    useState([]);
  const [professionalList, setProfessionalList] = useState([]);
  const [generalBillingByService, setGeneralBillingByService] = useState([]);
  const [paymentByProfessional, setPaymentByProfessional] = useState([]);
  const [professionalEvaluation, setProfessionalEvaluation] = useState([]);
  const [servicesEvaluation, setServicesEvaluation] = useState([]);
  const [serviceReportList, setServiceReportList] = useState([]);
  const [serviceReport, setServiceReport] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isMonth, setIsMonth] = useState(false);
  const [isYear, setIsYear] = useState(false);
  const [isWeek, setIsWeek] = useState(false);

  const [isGeneralScheduleScheme, setIsGeneralScheduleScheme] = useState(true);
  const [isServicesCompletedByType, setIsServicesCompletedByType] = useState(true);
  const [isProfessionalCompletedService, setIsProfessionalCompletedService] = useState(true);
  const [isGeneralBillingByService, setIsGeneralBillingByService] = useState(true);
  const [isPaymentByProfessional, setIsPaymentByProfessional] = useState(true);
  const [isProfessionalEvaluation, setIsProfessionalEvaluation] = useState(true);
  const [isServicesEvaluation, setIsServicesEvaluation] = useState(true);

  const [isButtonActive, setIsButtonActive] = useState(true);
  const [isSelectError, setIsSelectError] = useState(false);

  const [tabViews, setTabViews] = useState([
    { title: "Date", value: "date", isActive: false },
    { title: "Week", value: "week", isActive: false },
    { title: "Month", value: "month", isActive: true },
    { title: "Year", value: "year", isActive: false },
  ]);

  const [year, setYear] = useState(moment().year());
  const [month, setMonth] = useState(moment().month());
  const [week, setWeek] = useState(moment(moment().format('L'), "MMDDYYYY").isoWeek());
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleTabClick = (tab) => {

    const filterTabList = tabViews.map((el) =>
      el.title === tab ? { ...el, isActive: true } : { ...el, isActive: false }
    );

    setTabViews(filterTabList)
    if (tab === 'Date') {
      setDate(moment().format("YYYY-MM-DD"))
      setMonth(moment().month() + 1)
    } else if (tab === 'Week') {
      setWeek(moment(moment().format('L'), "MMDDYYYY").isoWeek())
      setIsWeek(true)
      setIsMonth(false)
      setIsYear(false)
    } else if (tab === 'Month') {
      setMonth(moment().month())
      setIsYear(false)
      setIsWeek(false)
      setIsMonth(!isMonth)
    } else if (tab === 'Year') {
      setYear(moment().year())
      setIsMonth(false)
      setIsWeek(false)
      setIsYear(true)
    }
    else {
      setTabViews(filterTabList);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    let payload = {
      filtertype: tabViews.filter((type) => type.isActive === true)[0].value,
    };

    if (payload.filtertype === "year") {
      payload['year'] = year
    } else if (payload.filtertype === "date") {
      payload['date'] = date
    } else if (payload.filtertype === "week") {
      payload['week'] = week
      payload['year'] = year
    } else {
      payload['month'] = month + 1
      payload['year'] = year
    }

    DashboardServices.getChartData(payload)
      .then((response) => {
        if (response.data.status) {
          setIsLoading(false);
          let dashboardBoardData = response.data.data;

          setGeneralScheduleScheme(dashboardBoardData.general_schedule_scheme);
          setIsGeneralScheduleScheme(false);
          for (let data = 0; data < dashboardBoardData.general_schedule_scheme?.length; data++) {
            for (let i = 0; i < Object.values(dashboardBoardData.general_schedule_scheme[data]).length - 1; i++) {
              if (Object.values(dashboardBoardData.general_schedule_scheme[data])[1] !== 0) {
                setIsGeneralScheduleScheme(true);
                break;
              }
            }
          }

          setServicesCompletedByType(
            dashboardBoardData.services_completed_by_type
          );
          setIsServicesCompletedByType(false);
          for (let data = 0; data < dashboardBoardData.services_completed_by_type?.length; data++) {
            for (let i = 0; i < Object.values(dashboardBoardData.services_completed_by_type[data]).length - 1; i++) {
              if (Object.values(dashboardBoardData.services_completed_by_type[data])[3] !== 0) {
                setIsServicesCompletedByType(true);
                break;
              }
            }
          }

          setProfessionalCompletedService(
            dashboardBoardData.professional_completed_services
          );
          setIsProfessionalCompletedService(false);
          for (let data = 0; data < dashboardBoardData.professional_completed_services?.length - 1; data++) {
            for (let i = 1; i < Object.values(dashboardBoardData.professional_completed_services[data]).length - 1; i++) {
              if (Object.values(dashboardBoardData.professional_completed_services[data])[i] !== 0) {
                setIsProfessionalCompletedService(true);
                break;
              }
            }
          }

          setProfessionalList(
            dashboardBoardData.professional_list
          );

          setGeneralBillingByService(
            dashboardBoardData.general_billing_by_service
          );
          setIsGeneralBillingByService(false);
          for (let data = 0; data < dashboardBoardData.general_billing_by_service?.length; data++) {
            for (let i = 0; i < Object.values(dashboardBoardData.general_billing_by_service[data]).length - 1; i++) {
              if (Object.values(dashboardBoardData.general_billing_by_service[data])[3] !== 0) {
                setIsGeneralBillingByService(true);
                break;
              }
            }
          }

          setPaymentByProfessional(dashboardBoardData.payment_by_professional);
          setIsPaymentByProfessional(false);
          for (let data = 0; data < dashboardBoardData.payment_by_professional?.length; data++) {
            for (let i = 0; i < Object.values(dashboardBoardData.payment_by_professional[data]).length - 1; i++) {
              if (Object.values(dashboardBoardData.payment_by_professional[data])[1] !== 0) {
                setIsPaymentByProfessional(true);
                break;
              }
            }
          }


          setProfessionalEvaluation(dashboardBoardData.professional_evaluation);
          setIsProfessionalEvaluation(false);
          for (let data = 0; data < dashboardBoardData.professional_evaluation?.length; data++) {
            for (let i = 0; i < Object.values(dashboardBoardData.professional_evaluation[data]).length - 1; i++) {
              if (Object.values(dashboardBoardData.professional_evaluation[data])[1] !== 0) {
                setIsProfessionalEvaluation(true);
                break;
              }
            }
          }

          setServicesEvaluation(dashboardBoardData.services_evaluation);
          setIsServicesEvaluation(false);
          for (let data = 0; data < dashboardBoardData.services_evaluation.length; data++) {
            for (let i = 0; i < Object.values(dashboardBoardData.services_evaluation[data]).length - 1; i++) {
              if (Object.values(dashboardBoardData.services_evaluation[data])[1] !== 0) {
                setIsServicesEvaluation(true);
                break;
              }
            }
          }
          let reportList = [];
          for (const property in dashboardBoardData.service_report_list) {
            reportList.push({
              label: dashboardBoardData.service_report_list[property],
              value: property
            })
          }
          setServiceReportList(reportList);
        } else {
          console.log(response);
        }
      })
      .catch();
  }, [date, week, month, year, tabViews]);

  const dateChangeHandler = (date) => {
    setDate(moment(date).format("YYYY-MM-DD"));
    setIsDateOpen(!isDateOpen);
  }

  const handleButtonClick = (value) => {
    if (value === "month") {
      setIsMonth(true);
    }
    setIsOpen(true);
  };

  const handleDateButtonClick = () => {
    setIsDateOpen(true);
  };

  const toggleDateModal = () => {
    setIsOpen(!isOpen);
  };

  const toggleDatePickerModal = () => {
    setIsDateOpen(!isDateOpen);
  };

  const changeServiceReport = (event) => {
    event.value ? setIsSelectError(false) : setIsSelectError(true);
    setServiceReport(event);
  }

  const onClickProvideReportType = (event) => {
    setIsLoading(true);
    setIsButtonActive(!isButtonActive);

    if (serviceReport) {
      let payload = {};
      if (startDate && endDate) {
        payload['report_type'] = serviceReport.value;
        payload['type'] = event;
        payload['from_date'] = moment(startDate).format("YYYY-MM-DD");
        payload['to_date'] = moment(endDate).format("YYYY-MM-DD");
      } else {
        payload['report_type'] = serviceReport.value;
        payload['type'] = event;
      }

      DashboardServices.getSendProviderReportEmail(payload)
        .then((response) => {
          if (response.data.status) {
            setIsLoading(false);
            response?.data?.data.length > 1 ? window.open(response.data.data) : toast.success(response.data.msg);
          } else {
            toast.error(response.data.msg);
          }
        })
        .catch();
      setServiceReport("");
      setStartDate("");
      setEndDate("");
    } else {
      setIsSelectError(true)
    }
  }

  return (
    <>
      <div className="app-content px-3 px-md-3 px-lg-4 mt-4">
        <div className="container-xl">
          <h1 className="app-page-title">{t("KPI")}</h1>
        </div>
      </div>
      <div className="px-md-3 px-lg-4">
        <div className="container-xl">
          <div className="col-md-12">
            <div className="dashboard-content">
              <div className="row d-flex align-items-end">
                <div className="col-md-4">
                  <label className="form-label">{t("SERVICE_REPORT")}</label>
                  <Select
                    className=" pb-2"
                    onChange={changeServiceReport}
                    value={serviceReport}
                    styles={CUSTOM_SELECT_STYLE}
                    isSearchable={false}
                    options={serviceReportList}

                  />
                  {isSelectError && <span className="error_text">
                    {t("SERVICE_REPORT_REQ")}
                  </span>}

                </div>
                <div className="col-md-6 pb-2">
                  <div className="row ">
                    <div className="col-6">
                      <label className="form-label">{t("DATE_RANGE")}</label>
                      <div className="date-picker-reports-box">
                        <DatePicker
                          className="date-picker-reports"
                          dateFormat="dd MMM yyyy"
                          selected={startDate}
                          onChange={(dates) => {
                            const [start, end] = dates;
                            setStartDate(start);
                            setEndDate(end);
                          }}
                          startDate={startDate}
                          endDate={endDate}
                          selectsRange
                          withPortal
                        ></DatePicker>

                        {/* <DatePicker 
                          dateFormat="dd MMM yyyy"
                          className="date-picker-reports"
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          calendarStartDay={3}
                          withPortal
                        /> */}
                      </div>
                    </div>
                    {/* <div className="col-6">
                      <div className="date-picker-reports-box">
                        <DatePicker
                          dateFormat="dd MMM yyyy"
                          className="date-picker-reports"
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                          calendarStartDay={3}
                          withPortal
                        />
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="col-md-12 p-2 text-end">
                  <button
                    type="button"
                    onClick={(event) => onClickProvideReportType("export", event)}
                    className={`btn ${isButtonActive ? "app-btn-secondary ms-2" : "app-btn-primary ms-2"
                      }`}
                  >
                    {t("EXPORT")}
                  </button>
                  <button

                    type="submit"
                    onClick={(event) => onClickProvideReportType("email", event)}
                    className={`btn ${isButtonActive ? "app-btn-primary ms-2" : "app-btn-secondary ms-2"
                      }`}
                  >
                    {t("EXPORT_REPORT_MAIL")}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row align-items-center justify-content-center">
            <div className="col-md-8 row justify-content-center">
              {tabViews.map((el, i) => {
                return (
                  <div key={i} className="col-md-3 col-6 mb-md-0 mb-2">
                    <button
                      className={`btn kpi-btn select-kpi ${el.isActive ? "app-btn-primary" : "app-btn-secondary"
                        }`}
                      onClick={() => handleTabClick(el.title)}
                    >
                      {el.title}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="col-md-4 justify-content-center container">
              {tabViews?.map((ele, index) => {
                if (ele.title === 'Date' && ele.isActive === true) {
                  return <button key={index} className="dropdown-popup  btn-sm" onClick={(event) => handleDateButtonClick(event)} value={date}>{date}</button>
                } else if (ele.title === 'Week' && ele.isActive === true) {
                  return <button key={index} className="dropdown-popup  btn-sm" onClick={(event) => handleButtonClick(event)} value={week}>{`Week ${week} ${year}`}</button>
                } else if (ele.title === 'Month' && ele.isActive === true) {
                  return <button key={index} className="dropdown-popup btn-sm" onClick={() => handleButtonClick("month")} value={month}>{`${moment().month(month).format("MMMM")} ${year}`}</button>
                } else if (ele.title === 'Year' && ele.isActive === true) {
                  return <button key={index} className="dropdown-popup btn-sm" onClick={(event) => handleButtonClick(event)} value={year}>{year}</button>
                } else {
                  return ''
                }
              })}
            </div>
          </div>
        </div>
      </div>

      {isOpen && <ModalHOC isModalOpen={isOpen} toggleModal={toggleDateModal} children={<DataDate toggleDateModal={toggleDateModal} tab={isWeek ? { week: week } : isMonth ? { month: month } : isYear ? { year: year } : ''}
        setYear={setYear} setMonth={setMonth} setWeek={setWeek} week={week} month={month} year={year}
      />} />}

      {isDateOpen && <ModalHOC isModalOpen={isDateOpen} toggleModal={toggleDatePickerModal} children={<DatePicker
        selected={new Date()}
        onChange={(date) => dateChangeHandler(date)}
        inline
      />} />}

      <div className="pt-3 p-md-3 p-lg-4">
        <div className="container-xl">
          <div className="row">
            <div className="col-md-6">
              <div className="dashboard-content">
                <h6>{t("GENERAL_SCHEDULE_SCHEME")}</h6>
                <div>
                  {isLoading ? <Loader type="dots" /> : isGeneralScheduleScheme ? <PieChart
                    chartData={generalScheduleScheme?.map((data) => ({
                      id: data?.title,
                      label: data.title,
                      value: data.count,
                    }))}
                    innerRadius={0.5}
                    colors={COLORS}
                  /> : <h4 className="no-data-text">No chart data available</h4>}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="dashboard-content">
                <h6>{t("SERVICE_COMPLETED_TYPE")}</h6>
                {isLoading ? <Loader type="dots" /> : isServicesCompletedByType ? <PieChart
                  chartData={servicesCompletedByType?.map((data) => ({
                    id: data.service_name + " " + data.service_count + ";" + Number(data.service_percentage).toFixed(2) + "%",
                    label: data.service_name,
                    value: data.service_count,
                  }))}
                  innerRadius={0}
                  colors={COLORS}
                /> : <h4 className="no-data-text">{t("NO_CHART_DATA_AVAILABLE")}</h4>}
              </div>
            </div>

            <div className="col-md-12">
              <div className="dashboard-content">
                <h6>{t("PROFESSIONAL_COMPLETED_SERVICES")}</h6>
                {isLoading ? <Loader type="dots" /> : isProfessionalCompletedService ? <BarChart
                  chartData={professionalCompletedService}
                  keyName={professionalList}
                  layout={"horizontal"}
                  indexName={"service_name"}
                  bottomTitle={""}
                  leftTitle={""}
                  legends={true}
                  colors={COLORS}
                  isCurrency={false}
                  tickRotation={0.1}
                /> : <h4 className="no-data-text">{t("NO_CHART_DATA_AVAILABLE")}</h4>}
              </div>
            </div>

            <div className="col-md-12">
              <div className="dashboard-content">
                <h6>{t("GENERAL_BILLING_SERVICES")}</h6>
                {isLoading ? <Loader type="dots" /> : isGeneralBillingByService ? <BarChart
                  chartData={generalBillingByService}
                  keyName={["total_collection"]}
                  indexName={"service_name"}
                  layout={"vertical"}
                  bottomTitle={"Services"}
                  leftTitle={"Total Collection"}
                  legends={false}
                  colors={COLORS}
                  colorBy={"indexValue"}
                  isCurrency={true}
                  left={60}
                  right={50}
                /> : <h4 className="no-data-text">{t("NO_CHART_DATA_AVAILABLE")}</h4>}
              </div>
            </div>

            <div className="col-md-12">
              <div className="dashboard-content">
                <h6>{t("PAYMENT_BY_PROFESSIONAL")}</h6>
                {isLoading ? <Loader type="dots" /> : isPaymentByProfessional ? <BarChart
                  chartData={paymentByProfessional.map((data) => ({
                    gain_collection: data.gain_collection,
                    professional_name: data.professional_name,
                  }))}
                  keyName={["gain_collection"]}
                  layout={"vertical"}
                  indexName={"professional_name"}
                  bottomTitle={"Professional"}
                  leftTitle={"Gain Collection"}
                  legends={false}
                  colors={COLORS}
                  colorBy={"indexValue"}
                  isCurrency={true}
                  left={60}
                  right={50}
                /> : <h4 className="no-data-text">{t("NO_CHART_DATA_AVAILABLE")}</h4>}
              </div>
            </div>

            <div className="col-md-6">
              <div className="dashboard-content">
                <h6>{t("PROFESSIONAL_EVALUATION")}</h6>
                {isLoading ? <Loader type="dots" /> : isProfessionalEvaluation ? <PieChart
                  chartData={professionalEvaluation?.map((data) => ({
                    id: data.name,
                    label: data.name,
                    value: data.average,
                  }))}
                  innerRadius={0}
                  colors={COLORS}
                /> : <h4 className="no-data-text">{t("NO_CHART_DATA_AVAILABLE")}</h4>}
              </div>
            </div>

            <div className="col-md-6">
              <div className="dashboard-content">
                <h6>{t("SERVICE_EVALUATION")}</h6>
                {isLoading ? <Loader type="dots" /> : isServicesEvaluation ? <PieChart
                  chartData={servicesEvaluation?.map((data) => ({
                    id: data.service_name,
                    label: data.service_name,
                    value: data.service_rating,
                  }))}
                  innerRadius={0}
                  colors={COLORS}
                /> : <h4 className="no-data-text">{t("NO_CHART_DATA_AVAILABLE")}</h4>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
