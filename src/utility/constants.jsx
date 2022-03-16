export const CLIENT_API_URL = process.env.REACT_APP_CLIENT_API_URL;
export const GOOGLE_PLACES_API_KEY =
  process.env.REACT_APP_GOOGLE_PLACES_API_KEY;
export const SOCIAL_API_KEY = {
  GOOGLE: process.env.REACT_APP_GOOGLE_API_KEY,
  FACEBOOK: process.env.REACT_APP_FACEBOOK_API_KEY,
};

export const TRANSLATION_FILE_PATH =
  process.env.REACT_APP_TRANSLATION_FILE_PATH;

export const PUBLIC_URL = process.env.PUBLIC_URL;
export const USER_DEVICE_INFO = window.navigator.userAgent;

export const USR_NOT_VERIFIED_ERROR = 10006;
export const USR_DISABLE_ERROR = 10010;
export const USR_DISABLE_ERROR_MSG = "Unauthenticated";
export const USER_DISABLE_SHOW_ERROR_MSG = "Your session is expired";

export const DEVICE_TYPE = "WEB";
export const LOGIN_SOCIAL_TYPE = "social_type";
export const LOGIN_NORMAL_TYPE = "normal_type";
export const USER_TYPE = "Business Provider";
export const PAYMENT_UPON_DELIVERY = "Payment Upon Delivery";

export const DISCOUNT_FIX_PERCENTAGE = "Fix Percentage";
export const DISCOUNT_FIX_AMOUNT = "Fix Amount";
export const DURATION_DATE_RANGE = "Date Range";
export const DISCOUNT_APPLY_SERVICE = "Services";
export const DISCOUNT_APPLY_CART = "Cart Value";
export const DISCOUNT_APPLY_SERVICE_CART = "Services & Cart Value";
export const DISCOUNT_APPLY_SERVICE_VALUE = "Provider Service";
export const DISCOUNT_APPLY_CART_VALUE = "Cart Value";
export const DISCOUNT_APPLY_SERVICE_CART_VALUE =
  "Service Category & Provider Service & Cart Value";

export const OTP_RESEND_TIMER = 120;
export const MINIMUM_SERVICE_DURATION = 30;
export const FIXED_SERVICE_MINUTES_SPAN = 15;
export const MAX_CHAR_LIMIT = 50;
export const MAX_IMAGE = 10;

export const PROMOCODE_DURATION_FORMAT = "YYYY-MM-DD hh:mm A";
export const DATE_TIME_FORMAT = "DD MMM YYYY hh:mm A";

export const REGEX = {
  CPF_1: /^(\d{3}\.\d{3}\.\d{3}\-\d{2})$/,
  CNPJ_1: /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/,
  CPF_2: /^(0{11}|1{11}|2{11}|3{11}|4{11}|5{11}|6{11}|7{11}|8{11}|9{11}|)$/,
  CNPJ_2: /^(0{14}|1{14}|2{14}|3{14}|4{14}|5{14}|6{14}|7{14}|8{14}|9{14}|)$/,
  MOBILE: /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{5})$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{8,15}$/,
  SERVICE_VALUE: /^\d+(\.\d{1,2})?$/,
  URL: /^((http|https):\/\/)(www.)(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/,
  CHARACTER_ONLY: /^[a-z]+$/,
};

export const VERIFICATION_TYPE = {
  ACCOUNT: "account_verification",
  FORGOT_PASSWORD: "forgot_password",
};

export const VERIFY_VIA = {
  EMAIL: "Email",
  MOBILE: "Contact_number",
};

export const PROVIDER_TYPE = {
  CPF: "CPF",
  CNPJ: "CNPJ",
};

export const TRANSACTION_TYPE = [
  {
    label: "Paid",
    value: "Paid",
  },
  {
    label: "Fail",
    value: "Fail",
  },
];

export const WITHDRAWAL_TYPE = [
  {
    label: "Stripe",
    value: "Stripe",
  },
  // {
  //   label: "Bank",
  //   value: "Bank",
  // },
  // {
  //   label: "Manually",
  //   value: "Manually",
  // },
];

export const WALLET_TRANSACTION_TYPE = [
  {
    label: "Booking Paid",
    value: "Booking Paid",
  },
  {
    label: "Booking Refund",
    value: "Booking Refund",
  },
  {
    label: "Withdrawal",
    value: "Withdrawal",
  },
  {
    label: "Promocode",
    value: "Promocode",
  },
];

export const RECORD_PAGE_LIMIT = 25;
export const DEFAULT_PAGE_NUMBER = 1;
export const SERVICE_LOCATIONS = [
  {
    label: "At Home",
    value: "At Home",
  },
  {
    label: "Business Space",
    value: "At Establishment",
  },
  {
    label: "Online (Video Conference)",
    value: "Online",
  },
];
export const PAYMENT_TYPE = [
  {
    label: "Apple Pay",
    value: "Apple Pay",
    isFixed: true,
  },
  {
    label: "Stripe",
    value: "Stripe",
  },
  {
    label: "Payment Upon Delivery",
    value: "Payment Upon Delivery",
  },
];
export const PROMOCODE_DISCOUNT_TYPE = [
  {
    label: "Fix Percentage",
    value: "Fix Percentage",
  },
  {
    label: "Fix Amount",
    value: "Fix Amount",
  },
];

export const PROMOCODE_DURATION_TYPE = [
  {
    label: "Date Range",
    value: "Date Range",
  },
  {
    label: "Permanent",
    value: "Permanent",
  },
];

export const PROMOCODE_DISCOUNT_APPLIED_ON = [
  {
    label: "Services",
    value: "Provider Service",
  },
  {
    label: "Cart Value",
    value: "Cart Value",
  },
  {
    label: "Services & Cart Value",
    value: "Service Category & Provider Service & Cart Value",
  },
];

export const LANGUAGE_OPTIONS = [
  {
    label: "Portuguese",
    value: "pt",
  },
  {
    label: "English",
    value: "en",
  },
];

export const PRIMARY_COLORS_LIST = [
  {
    label: "Black",
    value: "Black",
    colorCode: "#000000",
  },
  {
    label: "Alice Blue",
    value: "Alice Blue",
    colorCode: "#F0F7FF",
  },
  {
    label: "Dark Fern",
    value: "Dark Fern",
    colorCode: "#052805",
  },
  {
    label: "Anzac",
    value: "Anzac",
    colorCode: "#E0B154",
  },
  {
    label: "Sepia Black",
    value: "Sepia Black",
    colorCode: "#2E0412",
  },
  {
    label: "Terracotta",
    value: "Terracotta",
    colorCode: "#E07A54",
  },
  {
    label: "Bone",
    value: "Bone",
    colorCode: "#E9D7C9",
  },
  {
    label: "Deep Cove",
    value: "Deep Cove",
    colorCode: "#050A38",
  },
  {
    label: "Purple Heart",
    value: "Purple Heart",
    colorCode: "#632ED6",
  },
  {
    label: "Bracken",
    value: "Bracken",
    colorCode: "#462103",
  },
  {
    label: "Dark Ebony",
    value: "Dark Ebony",
    colorCode: "#2F2003",
  },
  {
    label: "Linen",
    value: "Linen",
    colorCode: "#fcf7ee",
  },
];

export const SECONDARY_COLORS_LIST = [
  {
    label: "Yellow",
    value: "Yellow",
    colorCode: "#E0B154",
  },
  {
    label: "Blue",
    value: "Blue",
    colorCode: "#1A4B82",
  },
  {
    label: "De York",
    value: "De York",
    colorCode: "#8ACD8A",
  },
  {
    label: "Blue Zodiac",
    value: "Blue Zodiac",
    colorCode: "#133561",
  },
  {
    label: "Puce",
    value: "Puce",
    colorCode: "#CB869D",
  },
  {
    label: "Straw",
    value: "Straw",
    colorCode: "#D2BD89",
  },
  {
    label: "Bull Shot",
    value: "Bull Shot",
    colorCode: "#7C481F",
  },
  {
    label: "Black",
    value: "Black",
    colorCode: "#979CCC",
  },
  {
    label: "Blue Bell",
    value: "Blue Bell",
    colorCode: "#215177",
  },
  {
    label: "Tan",
    value: "Tan",
    colorCode: "#C9A181",
  },
  {
    label: "Chamois",
    value: "Chamois",
    colorCode: "#EAD4A9",
  },
  {
    label: "Black",
    value: "Black",
    colorCode: "#000000",
  },
];

export const TEMPLATE_LIST = [
  {
    template_id: 1,
    image: "assets/img/img_template_1.png",
    template_color: "#FFFFFF",
    isSelected: true,
  },
  {
    template_id: 2,
    image: "assets/img/img_template_2.png",
    template_color: "#95BEEC",
    isSelected: false,
  },
  {
    template_id: 3,
    image: "assets/img/img_template_3.png",
    template_color: "#ebefeb", //'#EFE0D4', //'#5F6E83',
    isSelected: false,
  },

  {
    template_id: 4,
    image: "assets/img/img_template_4.png",
    template_color: "#E2D3D8",
    isSelected: false,
  },
  {
    template_id: 5,
    image: "assets/img/img_template_5.png",
    template_color: "#F3F0E8",
    isSelected: false,
  },
  {
    template_id: 6,
    image: "assets/img/img_template_6.png",
    template_color: "#533721",
    isSelected: false,
  },
  {
    template_id: 7,
    image: "assets/img/img_template_7.png",
    template_color: "#525659",
    isSelected: false,
  },
  {
    template_id: 8,
    image: "assets/img/img_template_8.png",
    template_color: "#EFE0D4",
    isSelected: false,
  },
  {
    template_id: 9,
    image: "assets/img/img_template_9.png",
    template_color: "#5F6E83",
    isSelected: false,
  },
  {
    template_id: 10,
    image: "assets/img/img_template_10.png",
    template_color: "#E6E8FA",
    isSelected: false,
  },
];

export const CUSTOM_SELECT_STYLE = {
  option: (styles, state) => ({
    ...styles,
    cursor: "pointer",
    backgroundColor: state.isSelected ? "#E0B154" : styles.backgroundColor,
    color: "#3F3F3F",
    "&:hover": {
      backgroundColor: "#F6F6F6",
    },
  }),
};

export const COLORS = [
  "#4472C4",
  "#ED7D31",
  "#A5A5A5",
  "#FFC000",
  "#ED3131",
  "#5BD567",
  "#5B9BD5",
  "#D55BB3",
  "#D5CE5B",
  "#6B31ED",
  "#3145ED",
  "#31E1ED",
  "#DA68FF",
];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const TRANSACTION_COLUMNS = [
  {
    name: "User Name",
    key: "get_custom_user_name",
    size: 200
  },
  {
    name: "Transaction Id",
    key: "transaction_id",
    size: 450
  },
  {
    name: "Status",
    key: "status",
    size: 100
  },
  {
    name: "Amount",
    key: "amount",
    size: 150
  },
  {
    name: "Date",
    key: "created_at",
    size: 200
  }
];

export const WALLET_TRANSACTION_COLUMNS = [
  {
    name: "Date",
    key: "created_at",
    size:230
  },
  {
    name: "Credit",
    key: "credit",
    size:230
  },
  {
    name: "Debit",
    key: "debit",
    size:230
  },
  {
    name: "Balance",
    key: "balance",
    size:230
  },
  {
    name: "Type",
    key: "type",
    size:250
  }
];