import { Notification } from '@/entities/notification';
import { NotificationRepository, notificationRepository } from '@/repositories/notificationRepository';
import { envService } from '@/usecases';
import { AuthService } from '@/usecases/authService';
import { EnvService } from '@/usecases/envService';

import { authService } from '.';

export interface NotificationService {
  getCount(token: string): Promise<{ count: number }>;
  getList(token: string): Promise<Notification[]>;
}

const getNotificationService = (args: {
  services: [AuthService, EnvService];
  repositories: [NotificationRepository];
}): NotificationService => {
  const baseUrl = args.services[1].getBaseUrl();
  const apikey = args.services[0].getApiKey();

  return {
    getCount: (token: string) => args.repositories[0].getCount({ baseUrl, apikey, token }),
    getList: (token: string) => args.repositories[0].getList({ baseUrl, apikey, token }),
  };
};

export const notificationService = getNotificationService({
  services: [authService, envService],
  repositories: [notificationRepository],
});
