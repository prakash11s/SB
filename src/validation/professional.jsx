import * as Yup from 'yup';
import { REGEX } from '../utility/constants';

export const schema = Yup.object().shape({
    name: Yup.string().required('FULL_NAME_REQ'),
    cpf_no: Yup.string().required('CPF_REQ').matches(REGEX.CPF_1, 'CPF_VALID'),
    email: Yup.string().required('EMAIL_REQ').email('EMAIL_VALID'),
    mobile_number: Yup.string().required('MOBILE_REQ').matches(REGEX.MOBILE, 'MOBILE_VALID'),
    professional_price: Yup.string().required('PRICE_REQ').matches(REGEX.SERVICE_VALUE, 'PRICE_VALID'),
    avg_experience: Yup.string().required('AVG_EXP_REQ').matches(REGEX.SERVICE_VALUE, 'AVG_EXP_VALID'),
    gain: Yup.string().required('GAIN_REQ').matches(REGEX.SERVICE_VALUE, 'GAIN_VALID'),
    description: Yup.string().required('DESCRIPTION_REQ'),
    expertise_id:Yup.array().min(1,'EXPERTISE_REQ'),
    profile_photo: Yup.string().required('PROFILE_IMAGE_REQ')
});