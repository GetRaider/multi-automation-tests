import { ElementFinderHelper } from "@helpers/element-finder/element-finder.helper";
import { BasePage } from "@shared-web/pages/index.pages";
import {
  ButtonElement,
  ElementsList,
  InputElement,
} from "@shared-web/elements/index.elements";

export class SearchPage extends BasePage {
  constructor(protected override ef: ElementFinderHelper) {
    super(ef);
  }

  searchResultTitles = new ElementsList(
    ButtonElement,
    this.ef.all.className("ssrcss-1nzemmm-PromoHeadline exn3ah96"),
  );

  searchInput = new InputElement(this.ef.id("searchInput"));
  searchButton = new ButtonElement(this.ef.id("searchButton"));

  staticElements = [this.searchButton];
}
