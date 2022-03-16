import apiClient, { setHeader } from "../../utility/apiClient";

const ServiceServices = {
    getServicesList: () => {
        return apiClient.post("provider_service_list",{},setHeader());
    },
    saveService: (payload, headers) => {
        return apiClient.post(
            "save_provider_service",
            payload,
            setHeader(headers)
        );
    },
    getServiceDetails: (payload) => {
        return apiClient.post("get_service_details",payload,setHeader());
    },
    updateService: (payload, headers) => {
        return apiClient.post(
            "update_provider_service",
            payload,
            setHeader(headers)
        );
    },
    changeServiceStatus: (payload, headers) => {
        return apiClient.post(
            "enable_disable_service",
            payload,
            setHeader(headers)
        );
    },
};

export default ServiceServices;
