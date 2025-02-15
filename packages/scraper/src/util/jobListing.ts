export default class JobListing {
  readonly companyId: string | undefined;
  readonly title: string | undefined;
  readonly location: string | undefined;
  readonly url: string | undefined;
  readonly applicationText: string | undefined;

  constructor(
    title?: string,
    companyId?: string,
    location?: string,
    url?: string,
    applicationText?: string,
  ) {
    this.title = title;
    this.companyId = companyId;
    this.location = location;
    this.url = url;
    this.applicationText = applicationText;
  }
}
