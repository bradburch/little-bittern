import * as cheerio from 'cheerio';

export default class Lever {
  readonly $: cheerio.CheerioAPI;
  readonly updateMap: Map<string, string>;

  constructor(response: any) {
    this.$ = cheerio.load(response);
    this.updateMap = new Map<string, string>();
  }

  parseApplication(): Map<string, string> {
    this.getDescription();
    this.getTitle();
    this.getLocation();

    return this.updateMap;
  }

  getDescription(): void {
    const jobDescription = this.$('div[data-qa="job-description"]')
      .text()
      .trim();
    if (jobDescription.length === 0) return;
    this.updateMap.set('applicationText', jobDescription);
  }

  getTitle(): void {
    const jobTitle = this.$('div.posting-headline').text().trim();
    if (jobTitle.length === 0) return;
    this.updateMap.set('title', jobTitle);
  }

  getLocation(): void {
    const jobLocation = this.$('div.location').text().trim();

    if (jobLocation.length === 0) return;
    this.updateMap.set('location', jobLocation);
  }

  getCompanyJobBoard(): URL | undefined {
    const companyBoard = this.$('a.main-header-logo').attr('href');

    if (companyBoard) return new URL(companyBoard);
  }
}
