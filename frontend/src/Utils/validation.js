/***
 * This object will use to validate email id field
 * ** */
export const email = [
  {
    type: "email",
    message: "The input is not valid E-mail!",
  },
  {
    required: true,
    message: "Please input your E-mail!",
  },
];

/***
 * This object will use to validate password filed
 * ** */
export const password = [
  {
    required: true,
    message: "Please input your password!",
  },
];

/***
 * This object will use to validate confirm password filed
 * ** */
export const confirmPassword = [
  {
    required: true,
    message: "Please confirm your password!",
  },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }

      return Promise.reject(
        new Error("The two passwords that you entered do not match!")
      );
    },
  }),
];

const checkPrice = (_, value) => {
  if (value.number > 0) {
    return Promise.resolve();
  }

  return Promise.reject(new Error("Price must be greater than zero!"));
};

export const price = [
  {
    validator: checkPrice,
  },
];

/***
 * This object will use to validate mobile number filed
 * ** */
export const mobileNumber = [
  {
    required: true,
    message: "Please enter your mobile number!",
  },
  ({ getFieldValue }) => ({
    validator(_, value) {
      debugger;
      var letters = /^[A-Za-z]+$/;
      let ss = String(Number(value));
      if (!value) {
        return Promise.resolve();
      }
      if (!ss.match(letters) && value.length <= 10) {
        return Promise.resolve();
      }

      return Promise.reject(new Error("Invalid mobile number!"));
    },
  }),
];
