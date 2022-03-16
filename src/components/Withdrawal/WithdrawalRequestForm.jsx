import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { toast } from "react-toastify";
import WithdrawalServices from "../../services/Withdrawal/Withdrawal.service";
import Loader from "../Common/Loader";
import {
    WITHDRAWAL_TYPE
} from "../../utility/constants";

const WithdrawalRequestForm = ({ withdrawalId, paymentID, withdrawalType, amount, setWithdrawalId, setPaymentID, setWithdrawalType, setAmount, toggleDateModal, withdrawalBalance }) => {
    const { t } = useTranslation();
    const [paymentList, setPaymentList] = useState([]);
    const [isWithdrawal, setIsWithdrawal] = useState(true);
    const [isWithdrawalAmountExceed, setIsWithdrawalAmountExceed] = useState(false);
    const [isWithdrawalType, setIsWithdrawalType] = useState(true);
    const [isPaymentID, setIsPaymentID] = useState(true);
    const [amountWithdrawal, setAmountWithdrawal] = useState(0);
    const [paymentDetails, setPaymentDetails] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const customStyles = {
        option: (styles, state) => ({
            ...styles,
            cursor: "pointer",
            backgroundColor: state.isSelected ? "#E0B154" : styles.backgroundColor,
            color: "#3F3F3F",
            "&:hover": {
                backgroundColor: "#F6F6F6",
            },
        })
    };

    useEffect(() => {
        setPaymentDetails({});
        WithdrawalServices.getPaymentOptionList().then((response) => {
            if (response?.data?.status) {
                let paymentList = [];
                paymentList.push({
                    label: response.data.data[0].type,
                    value: response.data.data[0].id
                });

                setPaymentList(paymentList);

                if (paymentID.value) {
                    let paymentDetails = response.data.data?.find(element => element?.id === paymentID.value);
                    setPaymentDetails(paymentDetails);
                } else if (paymentID) {
                    let paymentDetails = response.data.data?.find(element => element?.id === paymentID);
                    setPaymentDetails(paymentDetails);
                }
            }
        });
    }, [paymentID]);

    const onSubmitForm = () => {
        if ((withdrawalBalance >= parseFloat(amountWithdrawal)) || (withdrawalBalance >= parseFloat(amount))) {
            if (withdrawalId > 0 && (paymentID.value || paymentID) > 0 && (withdrawalType || withdrawalType.value)) {
                setIsLoading(true);
                let payload = {
                    withdrawal_request_id: withdrawalId,
                    payment_option_id: paymentID.value ? paymentID.value : paymentID,
                    amount: amount?.slice(3) || amountWithdrawal,
                    type: withdrawalType.value ? withdrawalType?.value : withdrawalType
                };

                WithdrawalServices.updateWithdrawalRequest(payload).then((response) => {
                    setIsWithdrawal(false);
                    setIsLoading(false);
                    let message = response.data.msg;
                    if (response?.data?.status) {
                        toggleDateModal();
                        setWithdrawalId("");
                        setPaymentID("");
                        setAmount(0);
                        setAmountWithdrawal(0);
                        setWithdrawalType("");
                        toast.success(message);
                    } else {
                        toast.error(message);
                    }
                });

            } else {
                if ((amountWithdrawal || amount) > 0 && (paymentID.value || paymentID) > 0 && (withdrawalType.value || withdrawalType)) {
                    setIsLoading(true);
                    let payload = {
                        payment_option_id: paymentID.value ? paymentID.value : paymentID,
                        amount: amount?.slice(3) || amountWithdrawal,
                        type: withdrawalType.value ? withdrawalType?.value : withdrawalType
                    };

                    WithdrawalServices.saveWithdrawalRequest(payload).then((response) => {
                        setIsWithdrawal(false);
                        setIsLoading(false);
                        let message = response.data.msg;
                        if (response?.data?.status) {
                            toggleDateModal();
                            setPaymentID("");
                            setAmount(0);
                            setAmountWithdrawal(0);
                            setWithdrawalType("");
                            toast.success(message);
                        } else {
                            toast.error(message);
                        }
                    });
                }
            }
        } else {
            setIsWithdrawalAmountExceed(true);
        }
    };

    const toggleWithdrawalTypeData = () => {
        setIsWithdrawalType(false);
    };

    const togglePaymentIDData = () => {
        setIsPaymentID(false);
    };

    const onChangeAmount = (event) => {
        if ((withdrawalBalance <= parseFloat(event.target.value))) {
            setIsWithdrawalAmountExceed(true);
        } else {
            setIsWithdrawalAmountExceed(false);
        }
        setIsWithdrawal(false);
        setAmountWithdrawal(event.target.value);
    };

    return (
        <>
            <div className="modal-body p-0 px-3">
                <form>
                    <div className="row d-flex">
                        <div className="col-xl-5 col-lg-5 col-sm-4">
                            <label htmlFor="exampleFormControlInput1">Amount</label>
                            <input type="number" className="form-control" id="exampleFormControlInput1"
                                value={isWithdrawal ? parseFloat(amount?.slice(3)) || '' : amountWithdrawal}
                                onChange={onChangeAmount}
                                placeholder="Amount" />
                            {isWithdrawalAmountExceed && <p className="text-danger">Withdrawal amount shouldn't be greater then withdrawal balance</p>}
                        </div>
                        <div className="col-xl-5 col-lg-5 col-sm-4 mx-4">
                            <div className="wallet-field">
                                <label htmlFor="exampleFormControlSelect1">Withdrawal type</label>
                                <Select
                                    className="form-label"
                                    defaultValue={withdrawalType}
                                    onChange={(option) => {
                                        setWithdrawalType(option);
                                        toggleWithdrawalTypeData();
                                    }}
                                    value={isWithdrawalType ? {
                                        label: withdrawalType,
                                        value: withdrawalType
                                    } : withdrawalType}
                                    styles={customStyles}
                                    options={WITHDRAWAL_TYPE}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row d-flex">
                        <div className="col-xl-5 col-lg-5 col-sm-4">
                            <div className="wallet-field">
                                <label htmlFor="exampleFormControlSelect2">Payment</label>
                                <Select
                                    className="form-label"

                                    onChange={(option) => {
                                        setPaymentID(option);
                                        togglePaymentIDData();
                                    }}
                                    value={isPaymentID ? {
                                        label: paymentList?.find(element => element?.value === paymentID)?.label,
                                        value: paymentList?.find(element => element?.value === paymentID)?.label
                                    } : paymentID}
                                    styles={customStyles}
                                    options={paymentList}

                                />
                            </div>
                        </div>
                        {(paymentID > 0 || paymentID.value > 0) && <div className="col-xl-5 col-lg-5 col-sm-4 mt-4">
                            <h5>Payment Details</h5>
                            {/* <div className="d-flex">
                                <p className="fs-6">Bank Account Number :</p>
                                <p className="fs-6">{paymentDetails?.bank_account_number || ""}</p>
                            </div>
                            <div className="d-flex">
                                <p className="fs-6">Bank Identifier Code: </p>
                                <p className="fs-6">{paymentDetails?.bank_identifier_code || ""}</p>
                            </div> */}
                            {/* <div className="d-flex">
                                <p className="fs-6">Bank Name: </p>
                                <p className="fs-6">{paymentDetails?.bank_name || ""}</p>
                            </div>
                            <div className="d-flex">
                                <p className="fs-6">Pix Number: </p>
                                <p className="fs-6">{paymentDetails?.pix_number || ""}</p>
                            </div> */}

                            <div className="d-flex">
                                <p className="fs-6">Stripe Account Number: </p>
                                <p className="fs-6">{paymentDetails?.stripe_account_number || ""}</p>
                            </div>
                            {/* <div className="d-flex">
                                <p className="fs-6">Payment Type :</p>
                                <p className="fs-6">{paymentDetails?.type || ""}</p>
                            </div> */}
                        </div>}
                    </div>
                </form>
            </div>
            <div className="modal-footer justify-content-sm-end pt-3">
                <button
                    type="button"
                    onClick={() => {
                        onSubmitForm();
                    }}
                    className="btn save-btn"
                >
                    {isLoading ? <Loader type="dots" /> : t("SUBMIT")}
                </button>
            </div>
        </>

    );
}

export default WithdrawalRequestForm;