import { WebClient } from '@slack/web-api';
import { INotifier } from '../adapters/gateways';

export class NotifierOnSlack implements INotifier {
  constructor (
    private channel: string,
    private slackClient: WebClient,
  ) {}

  public async success(text: string): Promise<void> {
    await this.post('Success', text, 'good');
  }

  public async error(text: string): Promise<void> {
    await this.post('Error', text, 'danger');
  }

  private async post(title: string, text: string, color: string): Promise<void> {
    const resp = await this.slackClient.chat.postMessage({
      channel: this.channel,
      text: '',
      attachments: [
        {
          title: `[${title}]`,
          text,
          color
        },
      ],
    });

    if (!resp.ok) throw new Error(resp.error);
  }
}
