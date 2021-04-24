import { sleep } from '.';

describe('sleep', () => {
  it('setTimeout() should be called', async () => {
    const setTimeoutMock = jest.fn();
    sleep(1000, setTimeoutMock);

    expect(setTimeoutMock).toHaveBeenCalledTimes(1);
    expect(setTimeoutMock).toHaveBeenCalledWith(expect.any(Function), 1000);
  });
});
