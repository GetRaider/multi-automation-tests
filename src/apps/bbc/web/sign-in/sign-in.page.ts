import { ElementFinderHelper } from "@helpers/element-finder/element-finder.helper";
import {
  InputElement,
  ButtonElement,
  LabelElement,
} from "@shared-web/elements/index.elements";
import { BasePage } from "@shared-web/pages/index.pages";

export class SignInPage extends BasePage {
  constructor(protected override ef: ElementFinderHelper) {
    super(ef);
  }

  emailInput = new InputElement(this.ef.testId("input"));
  passwordInput = new InputElement(this.ef.id("password-input"));

  revealPasswordButton = new ButtonElement(this.ef.id("toggle-password-type"));
  continueButton = new ButtonElement(this.ef.id("submit-button"));

  emailValidationMessageLabel = new LabelElement(
    this.ef.className("sb-field__message-container"),
  );
  nonExistingEmailValidationMessageLabel = new LabelElement(
    this.ef.className(
      "sb-form-message sb-form-message--error sb-form-message--general",
    ),
  );
  passwordValidationMessageLabel = new LabelElement(
    this.ef.className(
      "sb-form-message sb-form-message--error sb-form-message--password",
    ),
  );
  emptyPasswordValidationMessageLabel = new LabelElement(
    this.ef.id("form-message-password"),
  );
  generalValidationMessageLabel = new LabelElement(
    this.ef.id("form-message-general"),
  );

  staticElements = [this.emailInput];
}
