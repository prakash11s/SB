import apiClient, { setHeader } from "../../utility/apiClient";

const WithdrawalServices = {
    getWithdrawalData: () => {
        return apiClient.get("provider_withdrawal_request", setHeader());
    },

    getPaymentOptionList: () => {
        return apiClient.get("payment_option_list", setHeader());
    }

    ,
    updateWithdrawalRequest: (payload) => {
        return apiClient.post("update_provider_withdrawal_request",payload, setHeader());
    },

    saveWithdrawalRequest: (payload) => {
        return apiClient.post("save_provider_withdrawal_request",payload, setHeader());
    },

    cancelWithdrawalRequest: (payload) => {
        return apiClient.post("cancel_provider_withdrawal_request",payload, setHeader());
    }
};

export default WithdrawalServices;
