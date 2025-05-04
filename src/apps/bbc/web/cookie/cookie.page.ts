import { ElementFinderHelper } from "@helpers/element-finder/element-finder.helper";
import { ElementAttribute } from "@helpers/element-finder/element-finder.helpet.types";
import { ButtonElement } from "@shared-web/elements/index.elements";

export class CookiePage {
  constructor(protected elementFinder: ElementFinderHelper) {}

  iframe = this.elementFinder.custom({
    attributeName: ElementAttribute.className,
    attributeValue: "#sp_message_iframe_1091681",
  });

  rejectCookieButton = new ButtonElement(
    this.iframe.locator(this.elementFinder.title("I do not agree")),
  );
  acceptCookieButton = new ButtonElement(
    this.iframe.locator(this.elementFinder.title("I agree")),
  );
}
