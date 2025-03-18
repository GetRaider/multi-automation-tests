import { testHelper } from "@helpers/test/test.helper";
import { expect } from "@fixtures/common.fixture";
import { signInValidationMessageCases } from "@constants/test.constants";
import { envHelper } from "@helpers/env/env.helper";
import { magicStrings } from "@constants/magic-strings.constants";

testHelper.runSuite({
  name: "Sign-In, Negative validations",
  type: "web",
  beforeEach: async ({ web }) => {
    await web.browser.openUrl(
      magicStrings.url.apps.bbc.web[envHelper.getEnv()].signIn,
    );
  },
  tests: [
    {
      name: `Submitting with an empty 'email' field`,
      test: async ({ web }) => {
        await web.app.bbc.signIn.submit();
        expect(
          await web.app.bbc.signIn.isEmailValidationMessageAppeared(),
        ).toBe(true);
        expect(await web.app.bbc.signIn.getEmailValidationMessage()).toEqual(
          signInValidationMessageCases.emptyField,
        );
      },
    },
    {
      name: `Submitting with filled by invalid email text`,
      test: async ({ web }) => {
        await web.app.bbc.signIn.enterEmail("a");
        await web.app.bbc.signIn.submit();
        expect(
          await web.app.bbc.signIn.isEmailValidationMessageAppeared(),
        ).toBe(true);
        expect(await web.app.bbc.signIn.getEmailValidationMessage()).toEqual(
          signInValidationMessageCases.emailInput.invalidText,
        );
      },
    },
    // {
    //   name: `Submitting with filled by invalid email text`,
    //   test: async ({ web }) => {
    //     await web.browser.pause();
    //     await web.signIn.enterEmail("a");
    //     await web.signIn.submit();
    //     expect(await web.signIn.isEmailValidationMessageAppeared()).toBe(true);
    //     expect(await web.signIn.getEmailValidationMessage()).toEqual(
    //       signInValidationMessageCases.emailInput.invalidText,
    //     );
    //   },
    // },
    // {
    //   name: `Submitting with existing email and empty password`,
    //   test: async ({ ui }) => {
    //     await ui.signIn.enterEmail(
    //       primitiveHelper.getRandomFrom<string>(existingEmails),
    //     );
    //     await ui.signIn.submit();
    //     await ui.signIn.submit();
    //     expect(await ui.signIn.isPasswordValidationMessageAppeared()).toBe(
    //       true,
    //     );
    //     expect(await ui.signIn.getPasswordValidationMessage()).toEqual(
    //       signInValidationMessageCases.emptyField,
    //     );
    //     expect(await ui.signIn.isGeneralValidationMessageAppeared()).toBe(true);
    //     expect(await ui.signIn.getGeneralValidationMessage()).toEqual(
    //       signInValidationMessageCases.passwordInput.incorrectDetails,
    //     );
    //   },
    // },
    // {
    //   name: `Submitting with existing email and too short password`,
    //   test: async ({ ui }) => {
    //     await ui.signIn.enterEmail(
    //       primitiveHelper.getRandomFrom<string>(existingEmails),
    //     );
    //     await ui.signIn.submit();
    //     await ui.signIn.enterPassword("a");
    //     await ui.signIn.submit();
    //     expect(await ui.signIn.isPasswordValidationMessageAppeared()).toBe(
    //       true,
    //     );
    //     expect(await ui.signIn.getPasswordValidationMessage()).toEqual(
    //       signInValidationMessageCases.passwordInput.tooShort,
    //     );
    //   },
    // },
    // {
    //   name: `Submitting with existing email and correct by length with only letter`,
    //   test: async ({ ui }) => {
    //     await ui.signIn.enterEmail(
    //       primitiveHelper.getRandomFrom<string>(existingEmails),
    //     );
    //     await ui.signIn.submit();
    //     await ui.signIn.enterPassword("qwertyui");
    //     await ui.signIn.submit();
    //     expect(await ui.signIn.isPasswordValidationMessageAppeared()).toBe(
    //       true,
    //     );
    //     expect(await ui.signIn.getPasswordValidationMessage()).toEqual(
    //       signInValidationMessageCases.passwordInput
    //         .correctLengthWithOnlyLetters,
    //     );
    //   },
    // },
    // {
    //   name: `Submitting with existing email and correct by length with only numbers`,
    //   test: async ({ ui }) => {
    //     await ui.signIn.enterEmail(
    //       primitiveHelper.getRandomFrom<string>(existingEmails),
    //     );
    //     await ui.signIn.submit();
    //     await ui.signIn.enterPassword("12345678");
    //     await ui.signIn.submit();
    //     expect(await ui.signIn.isPasswordValidationMessageAppeared()).toBe(
    //       true,
    //     );
    //     expect(await ui.signIn.getPasswordValidationMessage()).toEqual(
    //       signInValidationMessageCases.passwordInput
    //         .correctLengthWithOnlyNumbers,
    //     );
    //   },
    // },
    // {
    //   name: `Submitting with existing email and correct by length with non-match password`,
    //   test: async ({ ui }) => {
    //     await ui.signIn.enterEmail(
    //       primitiveHelper.getRandomFrom<string>(existingEmails),
    //     );
    //     await ui.signIn.submit();
    //     await ui.signIn.enterPassword("1234567a");
    //     await ui.signIn.submit();
    //     expect(await ui.signIn.isGeneralValidationMessageAppeared()).toBe(true);
    //     expect(await ui.signIn.getGeneralValidationMessage()).toEqual(
    //       signInValidationMessageCases.passwordInput.incorrectPassword,
    //     );
    //   },
    // },
  ],
});
