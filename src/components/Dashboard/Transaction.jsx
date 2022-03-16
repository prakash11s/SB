import React, { useState, useEffect } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import 'rsuite-table/lib/less/index.less';
import '../../style/css/table.css';
import {
  CUSTOM_SELECT_STYLE,
  TRANSACTION_COLUMNS, TRANSACTION_TYPE, DEFAULT_PAGE_NUMBER, RECORD_PAGE_LIMIT
} from "../../utility/constants";
import Loader from "../../components/Common/Loader";
import PaginationTable from "../Common/PaginationTable";
import DashboardServices from "../../services/Dashboard/Dashboard.service";

const Transaction = () => {
  const { t } = useTranslation();
  const [transactionList, setTransactionList] = useState([]);
  const [page, setPage] = useState(DEFAULT_PAGE_NUMBER);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    let payload = {
      page: page
    };

    if (startDate && endDate) {
      payload["from_date"] = moment(startDate).format("YYYY-MM-DD");
      payload["to_date"] = moment(endDate).format("YYYY-MM-DD");
      payload["page"] = page;
    } else if (status) {
      payload["status"] = status.value;
      payload["page"] = page;
    } else {
      payload["page"] = page;
    };

    DashboardServices.getTransaction(payload).then((response) => {
      setIsLoading(false);
      if (response.data.status) {
        let transactionData = response.data.data.transactions.map(reg => ({
          ...reg, created_at: reg?.created_at ? moment(reg?.created_at).month(reg?.created_at).format("DD MMM YYYY") : "-", amount: "R$ " + reg?.amount,
          get_custom_user_name:
            reg?.get_user_name === null && reg?.get_custom_user_name === null ? "-" : reg?.get_user_name !== null ? reg?.get_user_name?.name : reg?.get_custom_user_name !== null ?
              reg?.get_custom_user_name.customer_name : "-"

        }));
        
        setTransactionList(transactionData);
        setTotal(response?.data?.data?.total_count);
      }
    });

    if (transactionList?.length > 0) {
      pageChange();
    }
  }, [page, startDate, endDate, status]);

  const pageChange = () => {
    const data = transactionList?.filter((v, i) => {
      const start = RECORD_PAGE_LIMIT * (page - 1);
      const end = start + RECORD_PAGE_LIMIT;
      return i >= start && i < end;
    });
    setTransactionList(data);
  }

  return (
    <>
      <div className="app-content pt-3 p-md-3 p-lg-4">
        <div className="container-xl px-3 p-lg-0">
          <h1 className="app-page-title">{t("TRANSACTION")}</h1>

          <div className="row g-4 mb-4">
            <div className="col-xl-2 col-lg-3 col-sm-4">
              <div className="trasaction-field">
                <input type="search" className="form-control ds-input " id="search-input" placeholder={t("SEARCH")} aria-label="Search for..." />
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-sm-4">
              <div className="trasaction-field">
                <Select
                  className="form-label"

                  onChange={(option) => {
                    setStatus(option);
                  }}
                  value={status}
                  styles={CUSTOM_SELECT_STYLE}
                  options={TRANSACTION_TYPE}

                />
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-sm-4">
              <div className="trasaction-field">
                <DatePicker
                  className="date-picker-field  custom-form-control form-control-lg"
                  selectsRange
                  dateFormat="dd MMM yyyy"
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText={t("SELECT_DATE_RANGE")}
                  onChange={(update) => {
                    setDateRange(update);
                  }}
                  withPortal
                />
              </div>
            </div>
          </div>
          <div className="transaction-table">
            {isLoading ? <Loader type="dots" /> : <PaginationTable records={transactionList} total={total} page={page} setPage={setPage} columns={TRANSACTION_COLUMNS} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Transaction;
