import * as cheerio from 'cheerio';
import JobListing from '../../util/jobListing';

export default class Greenhouse {
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

  getDescription(): string {
    return this.$('div.job__description').text().trim();
  }

  getTitle(): string {
    return this.$('div.job__title').text().trim();
  }

  getLocation(): string {
    return this.$('div.job__location').text().trim();
  }

  getCompanyJobBoard(): URL | undefined {
    const companyBoard = this.$('a:icontains("back to jobs")').attr('href');

    if (companyBoard) return new URL(companyBoard);
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
