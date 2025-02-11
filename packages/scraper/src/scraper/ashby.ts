import * as cheerio from 'cheerio';

export default class Ashby {
  readonly $: cheerio.CheerioAPI;
  readonly updateMap: Map<string, string>;

  constructor(response: any) {
    this.$ = cheerio.load(response);
    this.updateMap = new Map<string, string>();
  }

  parseApplication(): Map<string, string> {
    this.getDescription();
    this.getTitle();
    // this.getLocation();

    return this.updateMap;
  }

  getDescription(): void {
    const jobDescription = this.$('meta[name="description"]').attr('content');
    if (jobDescription) this.updateMap.set('applicationText', jobDescription);
  }

  getTitle(): void {
    const jobTitle = this.$('title').text().trim();
    if (jobTitle.length === 0) return;
    this.updateMap.set('title', jobTitle);
  }

  getLocation(): void {}

  getCompanyJobBoard(): URL | undefined {
    const ogURL = this.$('meta[property="og:url"]').attr('content');
    if (ogURL) {
      const lastSlash = ogURL.lastIndexOf('/');
      const companyBoard = ogURL?.substring(0, lastSlash);

      return new URL(companyBoard);
    }
  }
}
