import { INotificationsController, NotificationsController } from '.';
import { INotifier } from '../gateways';
import { NotifierOnSlack } from '../../infrastructure';
import { WebClient } from '@slack/web-api';

export class NotificationsControllerFactory {
  public create(): INotificationsController {
    return new NotificationsController(this.createNotifier());
  }

  private createNotifier(): INotifier {
    return new NotifierOnSlack(process.env.SLACK_CHANNEL, new WebClient(process.env.SLACK_ACCESS_TOKEN));
  }
}
