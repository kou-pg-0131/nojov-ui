export class GoogleAnalytics {
  constructor(
    private measurementId: string = process.env.REACT_APP_GA_ID,
    private debug: boolean = process.env.REACT_APP_STAGE !== 'prod',
  ) {}

  public pageView(pathname: string): void {
    // window.gtag('config', this.measurementId, { page_path: pathname, debug_mode: this.debug });
  }
}
