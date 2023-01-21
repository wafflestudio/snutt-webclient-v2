import { Color } from '@/entities/color';

export interface ColorRepository {
  getColorPalette(args: {
    baseUrl: string;
    apikey: string;
  }): Promise<{ colors: Color[]; names: string[]; message: 'ok' }>;
}

const getColorRepository = (): ColorRepository => {
  return {
    getColorPalette: async ({ baseUrl, apikey }) => {
      const response = await fetch(`${baseUrl}/v1/colors/vivid_ios`, {
        headers: { 'x-access-apikey': apikey },
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw data;
      return data as { colors: Color[]; names: string[]; message: 'ok' };
    },
  };
};

export const colorRepository = getColorRepository();
