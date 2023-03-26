import type { ApiClient } from '@/clients/api';

export interface FeedbackRepository {
  post(body: { email: string; message: string }): Promise<{ message: 'ok' }>;
}

type Deps = { clients: [ApiClient] };
export const getFeedbackRepository = ({ clients: [apiClient] }: Deps): FeedbackRepository => {
  return {
    post: async (body) => (await apiClient.post<{ message: 'ok' }>(`/v1/feedback`, body)).data,
  };
};
