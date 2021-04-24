import { Logger } from '.';

describe('Logger', () => {
  describe('info()', () => {
    it('should output log', () => {
      const logMock = jest.fn();
      const logger = new Logger('SomeClass', logMock);

      logger.info('hoge', 'piyo');

      expect(logMock).toHaveBeenCalledTimes(1);
      expect(logMock).toHaveBeenCalledWith('[SomeClass]', 'hoge\npiyo');
    });
  });
});
