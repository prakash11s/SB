import React, { useState, useEffect } from "react";
import moment from "moment";
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import DatePicker from "react-datepicker";
import WalletServices from "../../services/Wallet/Wallet.service";
import PaginationTable from "../Common/PaginationTable";
import Loader from "../../components/Common/Loader";
import {
  CUSTOM_SELECT_STYLE, WALLET_TRANSACTION_COLUMNS,
  DEFAULT_PAGE_NUMBER, RECORD_PAGE_LIMIT, WALLET_TRANSACTION_TYPE
} from "../../utility/constants";
const Wallet = () => {
  const { t } = useTranslation();
  const [walletTransactionList, setWalletTransactionList] = useState([]);
  const [walletBalance, setWalletBalance] = useState([]);
  const [page, setPage] = React.useState(DEFAULT_PAGE_NUMBER);
  const [total, setTotal] = React.useState(0);
  const [bookingType, setBookingType] = React.useState("");
  const [dateRange, setDateRange] = React.useState([null, null]);
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
    } else if (bookingType) {
      payload["type"] = bookingType.value;
      payload["page"] = page;
    } else {
      payload["page"] = page;
    };

    WalletServices.getWalletData(payload).then((response) => {
      if (response?.data?.status) {
        setIsLoading(false);
        let walletData = response?.data?.data?.wallet?.map(reg => ({ ...reg, created_at: reg.created_at ? moment(reg.created_at).month(reg.created_at).format("DD MMM YYYY") : "-", credit: reg.credit ? "R$ " + reg.credit : "-", debit: reg.debit ? "R$ " + reg.debit : "-", balance: "R$ " + reg.balance }))
        setWalletTransactionList(walletData);
        setWalletBalance(response?.data?.data?.balance);
        setTotal(response?.data?.data?.total_count);
      }
    });
    if (walletTransactionList?.length > 0) {
      pageChange();
    }
  }, [page, startDate, endDate, bookingType]);
  const pageChange = () => {
    const data = walletTransactionList?.filter((v, i) => {
      const start = RECORD_PAGE_LIMIT * (page - 1);
      const end = start + RECORD_PAGE_LIMIT;
      return i >= start && i < end;
    });
    setWalletTransactionList(data);
  }

  return (
    <>
      <div className="app-content pt-3 p-md-3 p-lg-4">
        <div className="container-xl px-3 p-lg-0">
          <h1 className="app-page-title">{t("WALLET")}</h1>
          <div className="row g-4 mb-4">
            <div className="col-12 col-lg-12">
              <div className="app-card app-card-stat ">
                <div className="app-card-body px-3 p-lg-0 text-start">
                  <h4 className="stats-type mb-1">{t("BALANCE")}</h4>
                  {isLoading ? <Loader type="dots" /> :
                    <div className="stats-figure">R$ {walletBalance}</div>}
                </div>
              </div>
            </div>

            <div className="col-xl-2 col-lg-3 col-sm-4">
              <div className="wallet-field">
                <Select
                  className="form-label"

                  onChange={(option) => {
                    setBookingType(option);
                  }}
                  value={bookingType}
                  styles={CUSTOM_SELECT_STYLE}
                  options={WALLET_TRANSACTION_TYPE}

                />
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-sm-4">
              <div className="wallet-field">
                <DatePicker
                  className="date-picker-field custom-form-control form-control-lg"
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
          <div className="wallet-table">
            {isLoading ? <Loader type="dots" /> : <PaginationTable records={walletTransactionList} total={total} page={page} setPage={setPage} columns={WALLET_TRANSACTION_COLUMNS} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Wallet;
