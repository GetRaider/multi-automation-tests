import { ElementFinderHelper } from "@helpers/element-finder/element-finder.helper";
import {
  LabelElement,
  ElementsList,
  ButtonElement,
} from "@shared-web/elements/index.elements";
import { BasePage } from "@shared-web/pages/base/base.page";

export class SportPage extends BasePage {
  constructor(protected override ef: ElementFinderHelper) {
    super(ef);
  }

  header = new LabelElement(this.ef.testId("masthead"));
  matchButtons = new ElementsList(
    ButtonElement,
    this.ef.all.className("ssrcss-53e6q1-StyledHeadToHead e64wp3e0"),
  );

  staticElements = [this.header];
}
