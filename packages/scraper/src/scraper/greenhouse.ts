import * as cheerio from 'cheerio';

export default class Greenhouse {

  readonly $: cheerio.CheerioAPI;
  readonly updateMap: Map<string, string>;

  constructor(response: any) {
    this.$ = cheerio.load(response);
    this.updateMap = new Map<string, string>;
  }

  parseResponse(): Map<string, string> {
    this.getDescription();
    this.getTitle();
    this.getLocation();

    return this.updateMap;
  }

  getDescription(): void {
    const jobDescription = this.$('div.job__description').text().trim();
    if (jobDescription.length === 0) return;
    console.log(jobDescription);
    this.updateMap.set('applicationText', jobDescription);
  }

  getTitle(): void {
    const jobTitle = this.$('div.job__title').text().trim();
    if (jobTitle.length === 0) return;
    console.log(jobTitle);
    this.updateMap.set('title', jobTitle);
  }

  getLocation(): void {
    const jobLocation = this.$('div.job__location').text().trim();
    if (jobLocation.length === 0) return;
    this.updateMap.set('location', jobLocation);
  }

}
