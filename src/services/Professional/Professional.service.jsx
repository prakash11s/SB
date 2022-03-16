import apiClient, { setHeader } from "../../utility/apiClient";

const ProfessionalsServices = {
    getProfessionalsList: () => {
        return apiClient.post("professional_list",{},setHeader());
    },
    saveProfessional: (payload, headers) => {
        return apiClient.post("save_professional", payload, setHeader(headers));
    },
    getProfessionalDetails: (payload) => {
        return apiClient.post("get_professional_detail",payload,setHeader());
    },
    updateProfessional: (payload, headers) => {
        return apiClient.post(
            "update_professional_profile",
            payload,
            setHeader(headers)
        );
    },
    changeProfessionalStatus: (payload, headers) => {
        return apiClient.post(
            "enable_disable_professional",
            payload,
            setHeader(headers)
        );
    },
    deleteProfessional: (payload) => {
        return apiClient.post("delete_professional",payload,setHeader());
    }
};

export default ProfessionalsServices;
