import { type FeedbackRepository, feedbackRepository } from '@/repositories/feedbackRepository';
import { envService } from '@/usecases';
import type { EnvService } from '@/usecases/envService';

export interface FeedbackService {
  post(body: { email: string; message: string }): Promise<{ message: 'ok' }>;
}

const getFeedbackService = (args: { services: [EnvService]; repositories: [FeedbackRepository] }): FeedbackService => {
  const baseUrl = args.services[0].getBaseUrl();
  const apikey = args.services[0].getApiKey();

  return {
    post: (body) => args.repositories[0].post({ baseUrl, apikey }, body),
  };
};

export const feedbackService = getFeedbackService({
  services: [envService],
  repositories: [feedbackRepository],
});
