import apiClient, { setHeader } from "../../utility/apiClient";

const WalletServices = {
    getWalletData: (payload) => {
        return apiClient.post("provider_balance",payload,setHeader());
    }
};

export default WalletServices;
