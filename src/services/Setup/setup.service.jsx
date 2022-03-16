import apiClient, { setHeader } from "../../utility/apiClient";

const SetupServices = {
    getSubscriptionPlan: () => {
        return apiClient.get("get_subscription_plan", setHeader());
    },
    setPlan: (payload) => {
        return apiClient.post(
            "select_subscription_plan",
            payload,
            setHeader()
        );
    },
    setTemplate: (payload, headers) => {
        return apiClient.post("add_template_logo", payload, setHeader(headers));
    },
    getTemplate: () => {
        return apiClient.get("get_template_logo", setHeader());
    },
    setPeriod: (payload, headers) => {
        return apiClient.post(
            "set_availability_period",
            payload,
            setHeader(headers)
        );
    },
    getPeriod: () => {
        return apiClient.get("get_availability_period", setHeader());
    },
    setCategory: (payload) => {
        return apiClient.post(
            "save_provider_service_category",
            payload,
            setHeader()
        );
    },
    getCategory: () => {
        return apiClient.get("service_category_list", setHeader());
    },
    saveService: (payload, headers) => {
        return apiClient.post(
            "save_provider_service",
            payload,
            setHeader(headers)
        );
    },
    getAvailabilityPeriod: () => {
        return apiClient.get("get_availability_period", setHeader());
    },
    getExpertiseList: () => {
        return apiClient.get("expertise_list", setHeader());
    },
    saveProfessional: (payload, headers) => {
        return apiClient.post("save_professional", payload, setHeader(headers));
    },
};

export default SetupServices;
