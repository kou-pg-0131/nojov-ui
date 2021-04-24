import { NotifierOnSlack } from '.';
import { WebClient } from '@slack/web-api';

/* eslint-disable @typescript-eslint/no-explicit-any */

describe('NotifierOnSlack', () => {
  describe('success()', () => {
    describe('when succeeded', () => {
      it('call postMessage with correct args', async () => {
        const webClient = new WebClient('token');
        (webClient.chat as any).postMessage = jest.fn().mockResolvedValue({ ok: true });

        const notifier = new NotifierOnSlack('CHANNEL', webClient);
        await notifier.success('TEXT');

        expect(webClient.chat.postMessage).toHaveBeenCalledWith({
          channel: 'CHANNEL',
          text: '',
          attachments: [
            { title: '[Success]', text: 'TEXT', color: 'good' },
          ],
        });
      });
    });
    describe('when failed', () => {
      it('throw error', async () => {
        const webClient = new WebClient('token');
        (webClient.chat as any).postMessage = jest.fn().mockResolvedValue({ ok: false, error: 'ERROR' });

        const notifier = new NotifierOnSlack('CHANNEL', webClient);
        await expect(notifier.success('TEXT')).rejects.toThrowError('ERROR');
      });
    });
  });

  describe('error()', () => {
    describe('when succeeded', () => {
      it('call postMessage with correct args', async () => {
        const webClient = new WebClient('token');
        (webClient.chat as any).postMessage = jest.fn().mockResolvedValue({ ok: true });

        const notifier = new NotifierOnSlack('CHANNEL', webClient);
        await notifier.error('TEXT');

        expect(webClient.chat.postMessage).toHaveBeenCalledWith({
          channel: 'CHANNEL',
          text: '',
          attachments: [
            { title: '[Error]', text: 'TEXT', color: 'danger' },
          ],
        });
      });
    });
    describe('when failed', () => {
      it('throw error', async () => {
        const webClient = new WebClient('token');
        (webClient.chat as any).postMessage = jest.fn().mockResolvedValue({ ok: false, error: 'ERROR' });

        const notifier = new NotifierOnSlack('CHANNEL', webClient);
        await expect(notifier.error('TEXT')).rejects.toThrowError('ERROR');
      });
    });
  });
});
