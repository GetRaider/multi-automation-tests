import { ElementFinderHelper } from "@helpers/element-finder/element-finder.helper";
import { ButtonElement } from "@shared-web/elements/index.elements";

export class CookiePage {
  constructor(protected ef: ElementFinderHelper) {}

  private readonly frameLocator = "#sp_message_iframe_1091681";

  rejectCookieButton = new ButtonElement(
    this.ef.title("I do not agree", {
      frameLocator: this.frameLocator,
    }),
  );
  acceptCookieButton = new ButtonElement(
    this.ef.title("I agree", { frameLocator: this.frameLocator }),
  );
}
