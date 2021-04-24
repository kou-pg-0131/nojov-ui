import { ErrorContext } from '../domain';
import { Context } from 'aws-lambda';
import { NotificationsControllerFactory } from '../interfaces/controllers';
import 'source-map-support/register';

export const notifyJobs = async (_: unknown, context: Context): Promise<void> => {
  const controller = await new NotificationsControllerFactory().create();
  await controller.notifyJobs();
  context.done();
};

export const notifyError = async (event: { Cause: string }, context: Context): Promise<void> => {
  const error: ErrorContext = JSON.parse(event.Cause);

  const controller = await new NotificationsControllerFactory().create();
  await controller.notifyError(error);
  context.done();
};
