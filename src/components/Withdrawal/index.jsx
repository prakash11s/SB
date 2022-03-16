import React, { useState, useEffect } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';
import WithdrawalServices from "../../services/Withdrawal/Withdrawal.service";
import WithdrawalRequestForm from "../Withdrawal/WithdrawalRequestForm";
import PaginationTable from "../Common/PaginationTable";
import ModalHOC from './../Common/Modal';
import Loader from "../Common/Loader";
import {
  DEFAULT_PAGE_NUMBER, RECORD_PAGE_LIMIT
} from "../../utility/constants";
const Withdrawal = () => {
  const { t } = useTranslation();
  const [withdrawalTransactionList, setWithdrawalTransactionList] = useState([]);
  const [withdrawalBalance, setWithdrawalBalance] = useState("");
  const [page, setPage] = useState(DEFAULT_PAGE_NUMBER);
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [withdrawalType, setWithdrawalType] = useState("");
  const [paymentID, setPaymentID] = useState("");
  const [withdrawalId, setWithdrawalId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const withdrawalBalanceListColumn = [
    {
      name: "Amount",
      key: "amount",
      size: 230
    },
    {
      name: "Withdrawal type",
      key: "type",
      size: 230
    },
    {
      name: "Status",
      key: "status",
      size: 230
    },
    {
      name: "Request Date",
      key: "created_at",
      size: 230
    },
    {
      name: "Action",
      key: "action",
      size: 230,
      align: "right",
      isRender: true,
      render: (data) => renderWithdrawalAction(data),
    },
  ];

  const renderWithdrawalAction = (data) => {
    return (
      <>
        <div className="d-flex">
          {data.status === "Pending" && <>
            <span>
              <a onClick={() => onClickEdit(data)}>{t("EDIT")}</a>
            </span>
            <p>&nbsp; | &nbsp; </p>
            <span>
              <a onClick={() => onClickCancel(data)}>
                {isLoading ? <Loader type="dots" /> : t("CANCEL")}
              </a>
            </span></>
          }
        </div>
      </>
    );
  };

  useEffect(() => {
    setIsLoading(true);
    let payload = {
      page: page
    };

    WithdrawalServices.getWithdrawalData().then((response) => {
      if (response?.data?.status) {
        setIsLoading(false);
        let withdrawalData = response?.data?.data?.provider_withdrawal_amount?.map(reg => ({ ...reg, created_at: reg.created_at ? moment(reg.created_at).month(reg.created_at).format("DD MMM YYYY") : "-", amount: reg.amount ? "R$ " + reg.amount : "-" }))
        setWithdrawalTransactionList(withdrawalData);
        setWithdrawalBalance(response?.data?.data?.total_withdrawal_amount);
        //setTotal(response?.data?.data?.total_count);
      }
    });
    if (withdrawalTransactionList?.length > 0) {
      pageChange();
    }
  }, [page, paymentID]);

  const onClickEdit = (data) => {
    if (true) {
      setIsOpen(true);
      setWithdrawalId(data.id);
      setAmount(data.amount);
      setWithdrawalType(data.type);
      setPaymentID(data.payment_option_id);
    }
  }

  const onClickCancel = (data) => {
    setIsLoading(true);
    if (data.status === "Pending") {
      let payload = {
        withdrawal_request_id: data.id,
        status: "Cancelled"
      };
      WithdrawalServices.cancelWithdrawalRequest(payload).then((response) => {
        setIsLoading(false);
        let message = response.data.msg;
        if (response?.data?.status) {
          toast.success(message);
        } else {
          toast.error(message);
        }
      });
    }
  }

  const toggleDateModal = () => {
    setIsOpen(!isOpen);
  };
  const pageChange = () => {
    const data = withdrawalTransactionList?.filter((v, i) => {
      const start = RECORD_PAGE_LIMIT * (page - 1);
      const end = start + RECORD_PAGE_LIMIT;
      return i >= start && i < end;
    });
    setWithdrawalTransactionList(data);
  }

  const addWithdrawalData = () => {
    setPaymentID("");
    setWithdrawalType("");
    setAmount("");
    setWithdrawalId("");
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="app-content pt-3 p-md-3 p-lg-4">
        <div className="container-xl px-3 p-lg-0">
          <h1 className="app-page-title">{t("WITHDRAWAL_BALANCE")}</h1>
          <div className="row g-4 mb-4">
            <div className="col-12 col-lg-12">
              <div className="app-card app-card-stat ">
                <div className="app-card-body px-3 p-lg-0 text-start">
                  <h4 className="stats-type mb-1">{t("BALANCE")}</h4>
                  {isLoading ? <Loader type="dots" /> : <div className="stats-figure">R$ {withdrawalBalance}</div>}
                </div>
              </div>
            </div>

            <div className="col-xl-2 col-lg-3 col-sm-4">
              <div className="wallet-field">
                <button
                  type="button"
                  onClick={() => { addWithdrawalData() }}
                  className="btn save-btn"
                >
                  {t("ADD_WITHDRAWAL")}
                </button>
              </div>
            </div>

          </div>
          <div className="wallet-table">
            {isLoading ? <Loader type="dots" /> : <PaginationTable records={withdrawalTransactionList} page={page} setPage={setPage} columns={withdrawalBalanceListColumn} />}
          </div>
        </div>
      </div>
      {isOpen && <ModalHOC isModalOpen={isOpen} toggleModal={toggleDateModal} children={<WithdrawalRequestForm toggleDateModal={toggleDateModal}
        withdrawalId={withdrawalId} amount={amount} withdrawalType={withdrawalType} paymentID={paymentID} setAmount={setAmount} setPaymentID={setPaymentID} setWithdrawalId={setWithdrawalId}
        setWithdrawalType={setWithdrawalType} withdrawalBalance={withdrawalBalance}
      />} />}
    </>
  );
};

export default Withdrawal;
