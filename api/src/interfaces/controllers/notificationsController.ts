import { ErrorContext } from '../../domain';
import { INotifier } from '../gateways';

export interface INotificationsController {
  notifyJobs(): Promise<void>;
  notifyError(error: ErrorContext): Promise<void>;
}

export class NotificationsController implements INotificationsController {
  constructor(
    private notifier: INotifier,
  ) {}

  public async notifyJobs(): Promise<void> {
    await this.notifier.success('Done.');
  }

  public async notifyError(error: ErrorContext): Promise<void> {
    await this.notifier.error(this.errorToText(error));
  }

  private errorToText(error: ErrorContext): string {
    return [
      error.errorMessage,
      '```',
      JSON.stringify(error, null, 4),
      '```',
    ].join('\n');
  }
}
