import * as Yup from 'yup';
import { REGEX, PROVIDER_TYPE, MAX_CHAR_LIMIT } from '../utility/constants';

export const schema = Yup.object().shape({
    name: Yup.string().required('FULL_NAME_REQ').max(MAX_CHAR_LIMIT,'MAX_CHAR_LIMIT_50').matches(/^[^\s][a-zA-Z ]+[^\s]$/, "Enter characters only"),
    provider_type:Yup.string(),
    cpf_no: Yup.string()
    .when('provider_type', {
        is: PROVIDER_TYPE.CPF,
        then: Yup.string().required('CPF_REQ').matches(REGEX.CPF_1, 'CPF_VALID'),
        otherwise: Yup.string().required('CNPJ_REQ').matches(REGEX.CNPJ_1, 'CNPJ_VALID')
      }),    
    fantasy_name: Yup.string().required('FANTASY_NAME_REQ').max(MAX_CHAR_LIMIT,'MAX_CHAR_LIMIT_50'),
    email: Yup.string().required('EMAIL_REQ').email('EMAIL_VALID'),
    mobile_number: Yup.string().required('MOBILE_REQ').matches(REGEX.MOBILE, 'MOBILE_VALID'),
    address: Yup.string().required('ADDRESS_REQ'),
    service_location:Yup.array().min(1,'SERVICE_TYPE_REQ'),
});