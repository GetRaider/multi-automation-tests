import { testHelper } from "@helpers/test/test.helper";
import { expect } from "@fixtures/common.fixture";
import {
  existingEmail,
  signInValidationMessageCases,
} from "@constants/test.constants";
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
    {
      name: `Submitting with existing email and empty password`,
      test: async ({ web }) => {
        await web.app.bbc.signIn.enterEmail(existingEmail);
        await web.app.bbc.signIn.submit();
        await web.app.bbc.signIn.submit();
        expect(
          await web.app.bbc.signIn.isPasswordValidationMessageAppeared(),
        ).toBe(true);
        expect(await web.app.bbc.signIn.getPasswordValidationMessage()).toEqual(
          signInValidationMessageCases.emptyField,
        );
        expect(
          await web.app.bbc.signIn.isGeneralValidationMessageAppeared(),
        ).toBe(true);
        expect(await web.app.bbc.signIn.getGeneralValidationMessage()).toEqual(
          signInValidationMessageCases.passwordInput.incorrectDetails,
        );
      },
    },
    {
      name: `Submitting with existing email and too short password`,
      test: async ({ web }) => {
        await web.app.bbc.signIn.enterEmail(existingEmail);
        await web.app.bbc.signIn.submit();
        await web.app.bbc.signIn.enterPassword("a");
        await web.app.bbc.signIn.submit();
        expect(
          await web.app.bbc.signIn.isPasswordValidationMessageAppeared(),
        ).toBe(true);
        expect(await web.app.bbc.signIn.getPasswordValidationMessage()).toEqual(
          signInValidationMessageCases.passwordInput.tooShort,
        );
      },
    },
    {
      name: `Submitting with existing email and correct by length with only letter`,
      test: async ({ web }) => {
        await web.app.bbc.signIn.enterEmail(existingEmail);
        await web.app.bbc.signIn.submit();
        await web.app.bbc.signIn.enterPassword("qwertyui");
        await web.app.bbc.signIn.submit();
        expect(
          await web.app.bbc.signIn.isPasswordValidationMessageAppeared(),
        ).toBe(true);
        expect(await web.app.bbc.signIn.getPasswordValidationMessage()).toEqual(
          signInValidationMessageCases.passwordInput
            .correctLengthWithOnlyLetters,
        );
      },
    },
    {
      name: `Submitting with existing email and correct by length with only numbers`,
      test: async ({ web }) => {
        await web.app.bbc.signIn.enterEmail(existingEmail);
        await web.app.bbc.signIn.submit();
        await web.app.bbc.signIn.enterPassword("12345678");
        await web.app.bbc.signIn.submit();
        expect(
          await web.app.bbc.signIn.isPasswordValidationMessageAppeared(),
        ).toBe(true);
        expect(await web.app.bbc.signIn.getPasswordValidationMessage()).toEqual(
          signInValidationMessageCases.passwordInput
            .correctLengthWithOnlyNumbers,
        );
      },
    },
    {
      name: `Submitting with existing email and correct by length with non-match password`,
      test: async ({ web }) => {
        await web.app.bbc.signIn.enterEmail(existingEmail);
        await web.app.bbc.signIn.submit();
        await web.app.bbc.signIn.enterPassword("1234567a");
        await web.app.bbc.signIn.submit();
        expect(
          await web.app.bbc.signIn.isGeneralValidationMessageAppeared(),
        ).toBe(true);
        expect(await web.app.bbc.signIn.getGeneralValidationMessage()).toEqual(
          signInValidationMessageCases.passwordInput.incorrectPassword,
        );
      },
    },
  ],
});
