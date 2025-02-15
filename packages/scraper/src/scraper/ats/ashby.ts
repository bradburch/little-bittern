import * as cheerio from 'cheerio';
import JobListing from '../../util/jobListing';

export default class Ashby {
  readonly $: cheerio.CheerioAPI;

  constructor(response: any) {
    console.log(response);
    this.$ = cheerio.load(response);
  }

  parseApplication(): JobListing | undefined {
    const description = this.getDescription();
    const title = this.getTitle();
    // this.getLocation();

    if (!description && !title) return undefined;

    return new JobListing(title, undefined, undefined, undefined, description);
  }

  getDescription(): string {
    return this.$('meta[name="description"]').attr('content')!;
  }

  getTitle(): string {
    return this.$('title').text().trim();
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
