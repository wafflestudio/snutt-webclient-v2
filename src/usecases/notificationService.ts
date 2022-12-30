import { Notification } from '@/entities/notification';
import { EnvRepository, envRepository } from '@/repositories/envRepository';
import { NotificationRepository, notificationRepository } from '@/repositories/notificationRepository';

import { AuthService, authService } from './authService';

export interface NotificationService {
  getCount(token: string): Promise<{ count: number }>;
  getList(token: string): Promise<Notification[]>;
}

const getNotificationService = (args: {
  services: [AuthService];
  repositories: [NotificationRepository, EnvRepository];
}): NotificationService => {
  const baseUrl = args.repositories[1].getBaseUrl();
  const apikey = args.services[0].getApiKey();

  return {
    getCount: (token: string) => args.repositories[0].getCount({ baseUrl, apikey, token }),
    getList: (token: string) => args.repositories[0].getList({ baseUrl, apikey, token }),
  };
};

export const notificationService = getNotificationService({
  services: [authService],
  repositories: [notificationRepository, envRepository],
});
