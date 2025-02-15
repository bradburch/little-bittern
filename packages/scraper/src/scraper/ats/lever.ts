import * as cheerio from 'cheerio';
import JobListing from '../../util/jobListing';

export default class Lever {
  readonly $: cheerio.CheerioAPI;

  constructor(response: any) {
    this.$ = cheerio.load(response);
  }

  parseApplication(): JobListing | undefined {
    const description = this.getDescription();
    const title = this.getTitle();
    const location = this.getLocation();

    if (!description && !title && !location) return undefined;

    return new JobListing(title, undefined, location, undefined, description);
  }

  getTitle(): string {
    return this.$('div.posting-headline').text().trim();
  }

  getDescription(): string {
    return this.$('div[data-qa="job-description"]').text().trim();
  }

  getLocation(): string {
    return this.$('div.location').text().trim();
  }

  getCompanyJobBoard(): URL | undefined {
    const companyBoard = this.$('a.main-header-logo').attr('href');

    if (companyBoard) return new URL(companyBoard);
  }
}
