import { ElementFinderHelper } from "@helpers/element-finder/element-finder.helper";
import { BasePage } from "@shared-web/pages/index.pages";
import {
  ButtonElement,
  ElementsList,
} from "@shared-web/elements/index.elements";

export class MainPage extends BasePage {
  constructor(protected override ef: ElementFinderHelper) {
    super(ef);
  }

  navigationButtons = new ElementsList(
    ButtonElement,
    this.ef.all.testId("mainNavigationLink"),
  );
  searchButton = new ButtonElement(
    this.ef.className("ssrcss-1xu0338-GlobalNavigationItem eki2hvo25"),
  );
  signInButton = new ButtonElement(
    this.ef.className("ssrcss-76eozk-AccountOptionsList eki2hvo0"),
  );

  staticElements = [this.searchButton];
}
