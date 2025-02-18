import * as cheerio from 'cheerio';
import JobListing from '../../util/jobListing.js';
import ATSInterface from './atsInterface.js';

export default class Ashby implements ATSInterface {
  readonly $: cheerio.CheerioAPI;

  constructor(response: any) {
    this.$ = cheerio.load(response);
  }

  parseApplication(): JobListing | undefined {
    const description = this.getDescription();
    const title = this.getTitle();
    const location = this.getLocation();

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

  getCompanyJobBoard(): string | undefined {
    const ogURL = this.$('meta[property="og:url"]').attr('content');
    if (ogURL) {
      const lastSlash = ogURL.lastIndexOf('/');
      const companyBoard = ogURL?.substring(0, lastSlash);

      if (companyBoard)
        return JSON.stringify({ url: companyBoard.replace('"', '') });
    }
  }

  getAvailableJobs(companyId: string): JobListing[] {
    const jobs: JobListing[] = [];

    this.$('td.cell')
      .children('a')
      .each((index, element) => {
        const applicationUrl = this.$(element).attr('href');
        const title = this.$(element).contents().first().text().trim();
        const location = this.$(element).contents().last().text().trim();
        console.log(applicationUrl, title, location);

        jobs.push(new JobListing(title, companyId, location, applicationUrl));
      });

    return jobs;
  }
}
