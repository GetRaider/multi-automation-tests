import { SearchPage } from "./search.page";
import { BaseService } from "@shared-web/services/index.services";
import { ISearchServiceArgs } from "./search.types";
import { ClassLog } from "../../../../decorators/logger.decorators";

@ClassLog
export class SearchService extends BaseService {
  protected override page: SearchPage = null;

  constructor(args: ISearchServiceArgs) {
    const { page } = args;
    super(args);
    this.page = page;
  }

  async searchByText(text: string): Promise<void> {
    await this.page.searchInput.enterText(text);
    await this.page.searchButton.click();
  }

  async getAllShownTitles(): Promise<string[]> {
    const buttons = await this.page.searchResultTitles.getAllElements();
    const titles = [];
    for (const button of buttons) {
      const rawTitle = await button.getText();
      // removing other parts of title from UI due to missing correct data-testid
      const title = rawTitle.split(".")[0];
      titles.push(title);
    }
    return titles;
  }
}
