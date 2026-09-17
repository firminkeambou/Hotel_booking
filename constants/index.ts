export const PRIMARY_COLOR = '#012f1f';
export const ANDROID_IOS_FACTOR = 0.8;
export const USER_ROLES = [
  { label: 'Customer', value: 'customer' },
  { label: 'Admin', value: 'admin' },
  { label: 'Owner', value: 'owner' },
];

export const REGISTRATION_ERRORS = [
  {
    keyword: 'Internet connection',
    message: 'Sorry!! Check your Internet connection',
  },
  { keyword: 'duplicate key', message: 'Sorry!! Email already exists' },
];

export const LOGIN_ERRORS = [
  { keyword: 'wrong password', message: 'Invalid email or password' },
  { keyword: 'user not found', message: 'This account does not exist' },
];
