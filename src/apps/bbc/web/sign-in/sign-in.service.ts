import { SignInPage } from "./sign-in.page";
import { ISignInServiceArgs } from "./sign-in.types";
import { BaseService } from "@shared-web/services/base/base.service";
import { ClassLog } from "../../../../decorators/logger.decorator";

@ClassLog
export class SignInService extends BaseService {
  public override page: SignInPage = null;

  constructor(args: ISignInServiceArgs) {
    const { page } = args;
    super(args);
    this.page = page;
  }

  async getEmailValidationMessage(): Promise<string> {
    return this.page.emailValidationMessageLabel.getText();
  }

  async getNonExistingEmailValidationMessage(): Promise<string> {
    return this.page.nonExistingEmailValidationMessageLabel.getText();
  }

  async getPasswordValidationMessage(): Promise<string> {
    return this.page.emptyPasswordValidationMessageLabel.getText();
  }

  async getGeneralValidationMessage(): Promise<string> {
    return this.page.generalValidationMessageLabel.getText();
  }

  async enterEmail(text: string): Promise<void> {
    return this.page.emailInput.fill(text);
  }

  async enterPassword(text: string): Promise<void> {
    return this.page.passwordInput.fill(text);
  }

  async submit(): Promise<void> {
    return this.page.continueButton.click();
  }

  async isEmailValidationMessageAppeared(): Promise<boolean> {
    return this.page.emailValidationMessageLabel.isDisplayed();
  }

  async isNonExistingEmailValidationMessageAppeared(): Promise<boolean> {
    return this.page.nonExistingEmailValidationMessageLabel.isDisplayed();
  }

  async isPasswordValidationMessageAppeared(): Promise<boolean> {
    return this.page.emptyPasswordValidationMessageLabel.isDisplayed();
  }

  async isGeneralValidationMessageAppeared(): Promise<boolean> {
    return this.page.generalValidationMessageLabel.isDisplayed();
  }
}
