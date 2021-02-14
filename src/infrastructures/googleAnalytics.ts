export class GoogleAnalytics {
  constructor(
    private measurementId: string = process.env.NEXT_PUBLIC_GA_ID,
    private debug: boolean = process.env.NEXT_PUBLIC_APP_STAGE !== 'prod',
  ) {}

  public pageView(_pathname: string): void {
    // window.gtag('config', this.measurementId, { page_path: pathname, debug_mode: this.debug });
  }
}
