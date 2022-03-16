import * as Yup from 'yup';
import { REGEX } from '../utility/constants';

export const schema = Yup.object().shape({
    service_name: Yup.string().required('SERVICE_NAME_REQ'),
    service_value: Yup.string().required('SERVICE_VALUE_REQ').matches(REGEX.SERVICE_VALUE, 'SERVICE_VALUE_VALID'),
    description: Yup.string().required('DESCRIPTION_REQ'),
    service_type: Yup.array().min(1,'SERVICE_TYPE_REQ'),
    payment_type: Yup.array().min(2,'SERVICE_TYPE_REQ'),
    service_image_primary: Yup.string().required('SERVICE_IMAGE_REQ')
});