import { SportPage } from "./sport.page";
import { BaseService } from "@shared-web/services/base/base.service";
import { ISportServiceArgs } from "./sport.types";

export class SportService extends BaseService {
  protected override page: SportPage = null;

  constructor(args: ISportServiceArgs) {
    const { page } = args;
    super(args);
    this.page = page;
  }

  async getAllCurrentMatches(): Promise<string[]> {
    const matchButtons = await this.page.matchButtons.getAll();
    const normalizedMatchInfo: string[] = [];
    for (const matchButton of matchButtons) {
      const matchRawInfo = await matchButton.getText();
      const matchWithRemovedUnusedInfo = this.removeUnusedInfo(matchRawInfo);
      normalizedMatchInfo.push(
        this.normalizeMatchInfo(matchWithRemovedUnusedInfo),
      );
    }
    return normalizedMatchInfo;
  }

  async isHeaderDisplayed(): Promise<boolean> {
    return this.page.header.isDisplayed();
  }

  private normalizeMatchInfo(matchInfoString: string): string {
    return matchInfoString.includes("versus")
      ? matchInfoString.replace("versus", "|")
      : matchInfoString.replace(",", "|");
  }

  private removeUnusedInfo(matchInfoString: string): string {
    const plannedMatchPattern = /(.*kick off \d{2}:\d{2}).*/i;
    const startedMatchPattern = /^(.*?\d{1,2}\D*?\d{1,2}).*/;
    return matchInfoString.includes("versus")
      ? matchInfoString.replace(plannedMatchPattern, "$1")
      : matchInfoString.replace(startedMatchPattern, "$1");
  }
}
