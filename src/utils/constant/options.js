export const ADMIN_TYPES = {
  SUPER_ADMIN: 'SuperAdmin',
  ADMIN: 'Admin',
  USER_ADMIN: 'UserAdmin',
};

export const MAIL_OPTIONS = {
  MAIL_TRAP: 'mailTrap',
  SEND_PULSE: 'sendPulse',
};

export const ALIAS = {
  ALIAS_WELCOME: 'welcome',
  ALIAS_HELLO: 'hello',
};

export const NOTIFICATION_CHANNELS = {
  EMAIL: 'Email',
  SMS: 'Sms',
  WHATSAPP: 'WhatsApp',
  TELEGRAM: 'Telegram',
  SLACK: 'Slack',
  TWITTER: 'Twitter',
};

export const NOTIFICATION_TYPES = {
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
  SUCCESSFUL_PASSWORD_RESET: 'SUCCESSFUL_PASSWORD_RESET',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  SEND_EMAIL: 'SEND_EMAIL',
  PUSH: 'Push',
  VERIFICATION: 'VERIFICATION',
  SIGNUP_MAIL: 'SIGNUP_MAIL',
  EMAIL_VERIFICATION: 'EMAIL_VERIFICATION',
  PHONE_VERIFICATION: 'PHONE_VERIFICATION',
  BUSINESS_EMAIL_VERIFICATION: 'BUSINESS_EMAIL_VERIFICATION',
  BUSINESS_PHONE_VERIFICATION: 'BUSINESS_PHONE_VERIFICATION',
  TWO_FACTOR_AUTHENTICATION: 'TW0_FACTOR_AUTHENTICATION',
  MOBILE_FORGOT_PASSWORD: 'MOBILE_FORGOT_PASSWORD',
};

export const USER_STATUS = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  SUSPENDED: 'Suspended',
  DEACTIVATED: 'Deactivated',
  DELETED: 'Deleted',
};

export const CATEGORY_OR_SUBCATEGORY_STATUS = {
  ACTIVE: 'Active',
  DRAFT: 'Draft',
  DELETED: 'Deleted',
};

export const BUSINESS_VERIFICATION_STATUS = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  DISABLED: 'Disabled',
  DELETED: 'Deleted',
  BLOCKED: 'Blocked',
};

export const STATUS = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  DELETED: 'Deleted',
};

export const BUSINESS_THEME_COLOR = {
  LIGHT_MODE: 'Light Mode',
  DARK_MODE: 'Dark Mode',
  BLUE_MODE: 'Blue Mode',
};

export const USER_TYPE = {
  USER: 'User',
  BUSINESS: 'Business',
};

export const VERIFICATION_TYPE = {
  EMAIL_VERIFICATION: 'EMAIL_VERIFICATION',
  PHONE_VERIFICATION: 'PHONE_VERIFICATION',
  TWO_FACTOR_AUTHENTICATION: 'TW0_FACTOR_AUTHENTICATION',
  MOBILE: 'MOBILE',
};

export const MONGODB_POPULATION_OPTIONS = {
  IMAGE: 'image',
};

export const BUSINESS_SEARCHABLE_FIELDS = [
  'businessName',
  'businessEmail',
  'businessPhoneNumber',
  'city',
  'country',
  'state',
  'businessCategory',
  'businessSubCategory',
];

export const MODE_OF_OPERATION = {
  ONLINE_OR_DIGITAL: 'Online or Digital',
  ON_PREMISE: 'On Premise',
  HYBRID: 'Hybrid',
  EMPTY: '',
};

export const INVITATION_STATUS = {
  PENDING: 'Pending',
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected',
};

export const OFFER_STATUS = {
  ACTIVE: 'Active',
  PAUSE: 'Pause',
  INACTIVE: 'Inactive',
  DELETED: 'Deleted',
};

export const BUSINESS_TYPE = {
  INDIVIDUAL: 'Individual',
  CORPORATE: 'Corporate',
};

export const BUSINESS_REGISTRATION_STATUS = {
  REGISTERED: 'Registered',
  NOT_REGISTERED: 'Not Registered',
};

export const BUSINESS_DOCUMENT_TYPE = {
  UTILITY_BILL: 'Utility Bill',
};

export const errorResponseMessage = 'Oops! Something went wrong';
