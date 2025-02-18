import * as cheerio from 'cheerio';
import JobListing from '../../util/jobListing';
import ATSInterface from './atsInterface.js';

export default class Greenhouse implements ATSInterface {
  readonly $: cheerio.CheerioAPI;

  constructor(response: any) {
    console.log(response);
    this.$ = cheerio.load(response);
  }

  parseApplication(): JobListing | undefined {
    const description = this.getDescription();
    const title = this.getTitle();
    const location = this.getLocation();

    if (!description && !title && !location) return undefined;

    return new JobListing(title, undefined, location, undefined, description);
  }

  getDescription(): string {
    return this.$('div.job__description').text().trim();
  }

  getTitle(): string {
    return this.$('div.job__title').text().trim();
  }

  getLocation(): string {
    return this.$('div.job__location').text().trim();
  }

  getCompanyJobBoard(): string | undefined {
    const companyBoard = this.$('a:icontains("back to jobs")')
      .attr('href')
      ?.trim();

    if (companyBoard)
      return JSON.stringify({ url: companyBoard.replace('"', '') });
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
