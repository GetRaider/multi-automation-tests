export const existingEmails = [
  "e@gmail.com",
  "t@gmail.com",
  "j@gmail.com",
  "l@gmail.com",
  "q@gmail.com",
  "w@gmail.com",
  "u@gmail.com",
];

export const signInValidationMessageCases = {
  emptyField: "Enter your email",
  emailInput: {
    invalidText:
      "Sorry, that email doesn’t look right. Please check it's a proper email.",
    nonExistingEmail: "We don't recognise that email",
  },
  passwordInput: {
    tooShort:
      "Sorry, that password is too short. It needs to be eight characters or more.",
    incorrectDetails:
      "Sorry, those details don't match. Check you've typed them correctly.",
    correctLengthWithOnlyLetters:
      "Sorry, that password isn't valid. Please include something that isn't a letter.",
    correctLengthWithOnlyNumbers:
      "Sorry, that password isn't valid. Please include a letter.",
    incorrectPassword:
      "That password isn’t right. You can try again or create a new password",
  },
};
