import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from "moment";

import { MONTHS } from "../../utility/constants";

const DataDate = (props) => {
    const { t } = useTranslation();
    const [arrayData, setArrayData] = useState([]);
    const [year, setYear] = useState([new Date().getFullYear()]);
    const [yearToggle, setYearToggle] = useState(false);

    useEffect(() => {
        init();
        let arrayOfData = [];
        for (let i = 2020; i <= year; i++) {
            arrayOfData.push(i);
            setYear(arrayOfData);
        }
    },[]);
    const init = () => {
        if (Object.keys(props.tab)[0] === 'week') {
            let arrayOfData = [];
            setArrayData([]);
            for (let i = 0; i <= moment(moment().format('L'), "MMDDYYYY").isoWeek(); i++) {
                arrayOfData.push(i);
                setArrayData(arrayOfData);
            }
        } else if (Object.keys(props.tab)[0] === 'month') {
            let arrayOfData = [];
            setArrayData([]);
            for (let i = 0; i < moment().month() + 1; i++) {
                arrayOfData[i] = MONTHS[i];
                setArrayData(arrayOfData);
            }
        } else if (Object.keys(props.tab)[0] === 'year') {
            let arrayOfData = [];
            setArrayData([]);
            for (let i = 2020; i <= moment().year(); i++) {
                arrayOfData.push(i);
                setArrayData(arrayOfData);
                setYear(arrayOfData);
            }
            setYearToggle(true);
        }
    };

    const handleToggleYearClick = () => {
        setYearToggle(!yearToggle);

        if (Object.keys(props.tab)[0] === 'month' && !yearToggle) {
            let arrayOfData = [];
            setArrayData([]);
            for (let i = 0; i < MONTHS.length; i++) {
                arrayOfData[i] = MONTHS[i];
                setArrayData(arrayOfData);
            }
        } else if (Object.keys(props.tab)[0] === 'week' && !yearToggle) {
            let arrayOfData = [];
            setArrayData([]);
            for (let i = 0; i <= moment(`${props.year}-01-01`).isoWeeksInYear() + 1; i++) {
                arrayOfData.push(i);
                setArrayData(arrayOfData);
            }
        } else {
            init();
        }
    };

    return (
        <>
            <div className="modal-body p-0 px-3">
                <div className="add-timeslot">
                    <div className="slot_wrap">
                        <div className={Object.keys(props.tab)[0] === "year" ? "select_slot_day d-none" : "select_slot_day"}>
                            <ul onClick={(event) => handleToggleYearClick(event)}>
                                {Object.keys(props?.tab)[0] !== 'year' && year.map((ele, index) => {
                                    return (
                                        <li key={index}
                                            onClick={() => props.setYear(ele)}
                                            className={ele === props.year ? "d_selected" : ""}
                                        >
                                            {ele}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="timeslot_cover">
                            <div className="select_slot_time">
                                <ul>
                                    {arrayData?.map((ele, index) => {
                                        if (Object.keys(props?.tab)[0] === 'month') {
                                            return (
                                                <li key={index}
                                                    onClick={() => props.setMonth(index)}
                                                    className={index === props.month ? "t_selected" : ""}
                                                >
                                                    {ele}
                                                </li>
                                            )
                                        } else if (Object.keys(props?.tab)[0] === 'week') {
                                            return (
                                                <li key={index}
                                                    onClick={() => props.setWeek(ele)}
                                                    className={ele === props.week ? "t_selected" : ""}
                                                >
                                                    Week-{ele}
                                                </li>
                                            )
                                        } else if (Object.keys(props?.tab)[0] === 'year') {
                                            return (
                                                <li key={index}
                                                    className={ele === props.year ? "t_selected" : ""}
                                                    onClick={() => props.setYear(ele)}
                                                >
                                                    {ele}
                                                </li>
                                            )
                                        }
                                    })}
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-footer model-footer-fixed justify-content-sm-end pt-3">
                <button
                    type="button"
                    onClick={props.toggleDateModal}
                    className="btn cancel-btn"
                >
                    {t("CLOSE")}
                </button>
            </div>
        </>

    );
}

export default DataDate;