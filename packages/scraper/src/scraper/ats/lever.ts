import * as cheerio from 'cheerio';
import JobListing from '../../util/jobListing';
import ATSInterface from './atsInterface.js';

export default class Lever implements ATSInterface {
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

  getCompanyJobBoard(): string | undefined {
    const companyBoard = this.$('a.main-header-logo').attr('href')?.trim();

    if (companyBoard)
      return JSON.stringify({ url: companyBoard.replace('"', '') });
  }

  getAvailableJobs(companyId: string): JobListing[] {
    const jobs: JobListing[] = [];

    this.$('div.posting')
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
