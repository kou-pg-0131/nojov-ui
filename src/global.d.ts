declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_APP_STAGE?: 'prod';
    readonly NEXT_PUBLIC_API_ORIGIN: string;
    readonly NEXT_PUBLIC_GA_ID: string;
  }
}
