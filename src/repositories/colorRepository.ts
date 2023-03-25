import { ApiClient } from '@/clients/api';
import { Color } from '@/entities/color';

export interface ColorRepository {
  getColorPalette(): Promise<{ colors: Color[]; names: string[]; message: 'ok' }>;
}

type Deps = { clients: [ApiClient] };
export const getColorRepository = ({ clients: [apiClient] }: Deps): ColorRepository => {
  return {
    getColorPalette: async () =>
      (await apiClient.get<{ colors: Color[]; names: string[]; message: 'ok' }>(`/v1/colors/vivid_ios`)).data,
  };
};
