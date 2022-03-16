import apiClient, { setHeader } from "../../utility/apiClient";

const StripeServices = {
    getCustomer: (payload) => {
        return apiClient.post("stripe_customers", payload, setHeader());
    },
    getCustomerCard: (payload) => {
        return apiClient.post("stripe_card_listing", payload, setHeader());
    },
    setCustomerCard: (payload) => {
        return apiClient.post("stripe_create_card", payload, setHeader());
    },
    setDefaultCard: (payload) => {
        return apiClient.post("stripe_set_default_card", payload, setHeader());
    },
    removeCustomerCard: (payload) => {
        return apiClient.post("stripe_remove_card", payload, setHeader());
    },
    setSubscription: (payload) => {
        return apiClient.post("stripe_add_subscription", payload, setHeader());
    }
};

export default StripeServices;
