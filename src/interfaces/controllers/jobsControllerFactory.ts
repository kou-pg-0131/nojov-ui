import config from '../../config';
import { JobsUsecase } from '../../usecases/jobsUsecase';
import { JobsRepository } from '../gateways/jobsRepository';
import { IJobsController, JobsController } from './jobsController';
import { NojovAPIClient } from '../../infrastructures/nojovAPIClient';
import { HttpClient } from '../../infrastructures/httpClient';
import { URIBuilder } from '../../infrastructures/uriBuilder';

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
