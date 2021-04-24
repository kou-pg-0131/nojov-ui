declare namespace NodeJS {
  interface ProcessEnv {
    readonly TZ: string;
    readonly STAGE: 'dev' | 'prod';

    readonly S3_BUCKET_FILES: string;
    readonly SLACK_ACCESS_TOKEN: string;
    readonly SLACK_CHANNEL: string;
  }
}
