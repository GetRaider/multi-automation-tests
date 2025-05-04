import { BasePage } from "@shared-web/pages/index.pages";
import {
  ButtonElement,
  ElementsList,
} from "@shared-web/elements/index.elements";
import { ElementFinderHelper } from "@helpers/element-finder/element-finder.helper";

export class MainPage extends BasePage {
  constructor(protected override elementFinder: ElementFinderHelper) {
    super(elementFinder);
  }

  navigationButtons = new ElementsList(
    ButtonElement,
    this.elementFinder.testId("mainNavigationLink"),
  );
  searchButton = new ButtonElement(
    this.elementFinder.class("ssrcss-1xu0338-GlobalNavigationItem eki2hvo25"),
  );
  signInButton = new ButtonElement(
    this.elementFinder.class("ssrcss-76eozk-AccountOptionsList eki2hvo0"),
  );

  staticElements = [this.searchButton];
}
