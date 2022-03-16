import apiClient, { setHeader } from "../../utility/apiClient";

const PromocodeServices = {
    getPromocodeList: () => {
        return apiClient.post("get_coupons",{'user_type':'Business Provider'},setHeader());
    },
    savePromocode: (payload, headers) => {
        return apiClient.post("add_coupon", payload, setHeader(headers));
    },
    getPromocodeDetails: (payload) => {
        return apiClient.post("get_promocode_detail",payload,setHeader());
    },
    updatePromocode: (payload, headers) => {
        return apiClient.post(
            "update_coupon",
            payload,
            setHeader(headers)
        );
    },
    changePromocodeStatus: (payload, headers) => {
        return apiClient.post(
            "enable_disable_coupon",
            payload,
            setHeader(headers)
        );
    },
    deletePromocode: (payload) => {
        return apiClient.post("delete_coupon",payload,setHeader());
    }
};

export default PromocodeServices;
