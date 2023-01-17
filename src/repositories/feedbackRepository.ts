export interface FeedbackRepository {
  post(args: { baseUrl: string; apikey: string }, body: { email: string; message: string }): Promise<{ message: 'ok' }>;
}

const getFeedbackRepository = (): FeedbackRepository => {
  return {
    post: async ({ baseUrl, apikey }, body) => {
      const response = await fetch(`${baseUrl}/feedback`, {
        headers: { 'x-access-apikey': apikey, 'content-type': 'application/json' },
        body: JSON.stringify(body),
        method: 'POST',
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw data;
      return data as { message: 'ok' };
    },
  };
};

export const feedbackRepository = getFeedbackRepository();
