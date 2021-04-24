import { ErrorContext } from '../entities';
import { Context } from 'aws-lambda';
import { NotificationsControllerFactory } from '../adapters/controllers';
import 'source-map-support/register';

export const notifySuccess = async (_: unknown, context: Context): Promise<void> => {
  const controller = await new NotificationsControllerFactory().create();
  await controller.notifySuccess();
  context.done();
};

export const notifyError = async (event: { Cause: string }, context: Context): Promise<void> => {
  const error: ErrorContext = JSON.parse(event.Cause);

  const controller = await new NotificationsControllerFactory().create();
  await controller.notifyError(error);
  context.done();
};
