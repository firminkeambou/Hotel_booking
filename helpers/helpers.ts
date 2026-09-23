import { ANDROID_IOS_FACTOR } from '@/constants';
import { FieldValues, Validate } from 'react-hook-form';
import { Platform } from 'react-native';
//the reference os focused on is ios
export const normaliseUnit = <T>(unit: T) => {
  if (typeof unit !== 'number' || !Number.isInteger(unit)) {
    const finalUnit = unit;
    return finalUnit;
  }

  return Platform.OS === 'android' ? unit * ANDROID_IOS_FACTOR : unit;
};
//date formatter
export const formatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'full', // options: 'short', 'medium', 'long', 'full'
  timeStyle: 'short',
});

// validate email format
export const validEmailFormat = (email: string) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) ||
  'Please enter a valid email address';

/* export const isPassWordMatched = (
  passwordToConfirm: string,
  password: string,
) => passwordToConfirm === password || 'The passwords do not match';
 */
export const PasswordMatchValidator = <TFieldValues extends FieldValues>(
  errorMessage: string = 'The passwords do not match at all',
): Validate<string, TFieldValues> => {
  return (value, formValues) => {
    // Access 'password' safely using index signature or casting if needed
    const password = (formValues as Record<string, any>).password;
    return value === password || errorMessage;
  };
};

export const validatePasswordStrength = <
  TFieldValues extends FieldValues,
>(): Validate<string, TFieldValues> => {
  return (value: string) => {
    if (!value) return true;

    // Enforces: 6+ total length, 1 lower, 1 upper, 1 digit, and 1 character from [!@#$]
    const strictPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$]).{8,}$/;

    return (
      strictPasswordRegex.test(value) ||
      'Password must be 8+ characters with at least one uppercase letter, one lowercase letter, one number, and one special character (!, @, #, $)'
    );
  };
};

//lookup key right formated
export const lookupKey = (stringToFormat: string) =>
  stringToFormat?.toLowerCase()?.trim() ?? ''; //nullish coalescing operator (??)


export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};