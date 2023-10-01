export const validationRule = [
  {
    required: true,
    message: "required",
  }
];
export const textValidationRule = [
  {
    required: true,
    message: 'Please enter your name!',
    whitespace: true,
  },
];
export const emailValidationRule = [
  {
    type: 'email',
    message: 'Not a valid E-mail!',
  },
  {
    required: true,
    message: 'Please enter your E-mail!',
  },
];

export const passwordValidationRule = [
  {
    required: true,
    message: 'Please enter your password!',
  },
  {
    pattern: new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"),
    message: "Password must be eight characters long, and include at least one uppercase letter, one lowercase letter, and one number",
  },
];

export const confirmPasswordValidationRule = [
  {
    required: true,
    message: 'Please confirm your password!',
  },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('Password that you entered do not match!'));
    },
  }),
];
