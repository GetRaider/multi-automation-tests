import { ElementFinderHelper } from "@helpers/element-finder/element-finder.helper";
import {
  LabelElement,
  ElementsList,
  ButtonElement,
} from "@shared-web/elements/index.elements";
import { BasePage } from "@shared-web/pages/base/base.page";

export class SportPage extends BasePage {
  constructor(protected override elementFinder: ElementFinderHelper) {
    super(elementFinder);
  }

  header = new LabelElement(this.elementFinder.testId("masthead"));
  matchButtons = new ElementsList(
    ButtonElement,
    this.elementFinder.class("ssrcss-53e6q1-StyledHeadToHead e64wp3e0"),
  );

  staticElements = [this.header];
}
