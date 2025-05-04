import { ElementFinderHelper } from "@helpers/element-finder/element-finder.helper";
import {
  InputElement,
  ButtonElement,
  LabelElement,
} from "@shared-web/elements/index.elements";
import { BasePage } from "@shared-web/pages/index.pages";

export class SignInPage extends BasePage {
  constructor(protected override elementFinder: ElementFinderHelper) {
    super(elementFinder);
  }

  emailInput = new InputElement(this.elementFinder.testId("input"));
  passwordInput = new InputElement(this.elementFinder.name("password"));

  revealPasswordButton = new ButtonElement(
    this.elementFinder.id("toggle-password-type"),
  );
  continueButton = new ButtonElement(this.elementFinder.id("submit-button"));

  emailValidationMessageLabel = new LabelElement(
    this.elementFinder.class("sb-field__message-container"),
  );
  nonExistingEmailValidationMessageLabel = new LabelElement(
    this.elementFinder.class(
      "sb-form-message sb-form-message--error sb-form-message--general",
    ),
  );
  passwordValidationMessageLabel = new LabelElement(
    this.elementFinder.class(
      "sb-form-message sb-form-message--error sb-form-message--password",
    ),
  );
  emptyPasswordValidationMessageLabel = new LabelElement(
    this.elementFinder.id("form-message-password"),
  );
  generalValidationMessageLabel = new LabelElement(
    this.elementFinder.id("form-message-general"),
  );

  staticElements = [this.emailInput];
}
