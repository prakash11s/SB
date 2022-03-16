import apiClient, {setHeader} from '../../utility/apiClient';

const HomeServices = {
  category: () => {
    return apiClient.post('get_service_category',{ page: 1 });
  },
  statistics: () => {
    return apiClient.get('get_statistics');
  },
  testimonial: () => {
    return apiClient.get('get_testimonial');
  },
  offers: () => {
    return apiClient.get('get_offers');
  },  
  generalSettings: () => {
    return apiClient.get('get_general_settings');
  },
  pages: (payload) => {
      const data = {
        params:{
            page_title : payload
          }
      }
    return apiClient.get('get_general_pages',data);
  },
  expertRatings: () => {
    return apiClient.get('get_expert_ratings');
  },
  saveContactForm: (data) => {
    return apiClient.post('save_contactus',data);
  },
}

export default HomeServices;