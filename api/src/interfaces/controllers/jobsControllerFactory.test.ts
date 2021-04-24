import { JobsControllerFactory, JobsController } from '.';

describe('JobsControllerFactory', () => {
  describe('create()', () => {
    it('should return JobsController.', () => {
      const controller = new JobsControllerFactory().create();
      expect(controller).toBeInstanceOf(JobsController);
    });
  });
});
