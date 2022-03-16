import moment from "moment";

import apiClient, { setHeader } from "../../utility/apiClient";

const DashboardServices = {
    
    getChartData: (payload) => {
        return apiClient.post("provider_report",payload,setHeader());
    },
    updateProfile: (payload) => {
        return apiClient.post(
            "update_profile",
            {
                ...payload,
                fantacy_name: payload.fantasy_name,
                service_location: payload.service_location
                    ? payload.service_location.map((obj) => obj.value).join(",")
                    : "",
                date_of_birth:
                    payload.date_of_birth &&
                    moment(payload.date_of_birth).format("yyyy-MM-DD"),
            },
            setHeader()
        );
    },
    updateProfilePhoto: (payload, headers) => {
        return apiClient.post("update_profile_photo", payload, setHeader(headers));
    },
    getTransaction: (payload) => {
        return apiClient.post("transaction_report",payload,setHeader());
    },
    getBooking: (payload) => {
        return apiClient.post("get-booking",payload,setHeader());
    },
    getProviderBookingDetails: (id) => {
        return apiClient.post("get-provider-booking-details",id,setHeader());
    },
    getSendProviderReportEmail: (payload) => {
        return apiClient.post("send_provider_report_email",payload,setHeader());
    },
    getAcceptRejectBooking: (payload) => {
        return apiClient.post("accept-reject-booking",payload,setHeader());
    },
    getCompleteBooking: (payload, headers) => {
        return apiClient.post("complete-booking",payload,setHeader(headers));
    },
};

export default DashboardServices;
