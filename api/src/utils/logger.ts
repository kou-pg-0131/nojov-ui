export class Logger {
  constructor(
    private name: string,
    private log: (...args: string[]) => void = console.log,
  ) {}

  public info(...logs: string[]): void {
    this.log(`[${this.name}]`, logs.join('\n'));
  }
}
