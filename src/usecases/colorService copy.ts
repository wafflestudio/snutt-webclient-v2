import { Color } from '@/entities/color';
import { ColorRepository, colorRepository } from '@/repositories/colorRepository';
import { EnvRepository, envRepository } from '@/repositories/envRepository';

import { AuthService, authService } from './authService';

export interface ColorService {
  getColorList(): Promise<Color[]>;
}

const getColorService = (args: {
  services: [AuthService];
  repositories: [ColorRepository, EnvRepository];
}): ColorService => {
  const apikey = args.services[0].getApiKey();
  const baseUrl = args.repositories[1].getBaseUrl();

  return {
    getColorList: () => args.repositories[0].getColorPalette({ baseUrl, apikey }).then((res) => res.colors),
  };
};

export const colorService = getColorService({
  services: [authService],
  repositories: [colorRepository, envRepository],
});
