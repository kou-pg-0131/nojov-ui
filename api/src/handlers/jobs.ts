import { APIGatewayProxyHandlerV2, Context } from 'aws-lambda';
import { subMonths, addHours } from 'date-fns';
import { JobsControllerFactory } from '../interfaces/controllers';
import 'source-map-support/register';

export const crawl = async (_: unknown, context: Context): Promise<void> => {
  const controller = new JobsControllerFactory().create();
  await controller.crawl();

  context.done();
};

export const getWebsites: APIGatewayProxyHandlerV2 = async () => {
  const to = new Date();
  const from = subMonths(to, 6);

  const controller = new JobsControllerFactory().create();
  const items = await controller.getWebsitesBetween(from, to);

  return {
    statusCode: 200,
    headers: {
      'access-control-allow-origin': '*',
      'cache-control': 'max-age=3600',
      'expires': addHours(new Date(), 1).toUTCString(),
    },
    body: JSON.stringify(items),
  };
};
