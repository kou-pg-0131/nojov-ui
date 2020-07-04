import config from '../../config';
import { JobsUsecase } from '../../usecases';
import { JobsRepository } from '../gateways';
import { IJobsController, JobsController } from '.';
import { NojovAPIClient, HttpClient, URIBuilder } from '../../infrastructures';

export class JobsControllerFactory {
  public create(): IJobsController {
    const httpClient = new HttpClient()
    const uriBuilder = new URIBuilder();
    const apiClient = new NojovAPIClient(config.apiOrigin, httpClient, uriBuilder);
    const repository = new JobsRepository(apiClient);
    const usecase = new JobsUsecase(repository);

    return new JobsController(usecase);
  }
}
