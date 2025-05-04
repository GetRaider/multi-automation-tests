import { ElementFinderHelper } from "@helpers/element-finder/element-finder.helper";
import { BasePage } from "@shared-web/pages/index.pages";
import {
  ButtonElement,
  ElementsList,
  InputElement,
} from "@shared-web/elements/index.elements";

export class SearchPage extends BasePage {
  constructor(protected override elementFinder: ElementFinderHelper) {
    super(elementFinder);
  }

  searchResultTitles = new ElementsList(
    ButtonElement,
    this.elementFinder.class("ssrcss-1nzemmm-PromoHeadline exn3ah96"),
  );
  searchInput = new InputElement(this.elementFinder.id("searchInput"));
  searchButton = new ButtonElement(this.elementFinder.id("searchButton"));

  staticElements = [this.searchButton];
}
