import { Color } from '@/entities/color';
import { ColorRepository, colorRepository } from '@/repositories/colorRepository';
import { AuthService } from '@/usecases/authService';
import { EnvService, envService } from '@/usecases/envService';

import { authService } from '.';

export interface ColorService {
  getColorList(): Promise<Color[]>;
}

const getColorService = (args: {
  services: [AuthService, EnvService];
  repositories: [ColorRepository];
}): ColorService => {
  const apikey = args.services[0].getApiKey();
  const baseUrl = args.services[1].getBaseUrl();

  return {
    getColorList: () => args.repositories[0].getColorPalette({ baseUrl, apikey }).then((res) => res.colors),
  };
};

export const colorService = getColorService({
  services: [authService, envService],
  repositories: [colorRepository],
});
