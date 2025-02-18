import * as cheerio from 'cheerio';
import JobListing from '../../util/jobListing';

export default interface ATSInterface {
  readonly $: cheerio.CheerioAPI;

  parseApplication(): JobListing | undefined;

  getDescription(): string;

  getTitle(): string;

  getLocation(): void;

  getCompanyJobBoard(): string | undefined;
}
