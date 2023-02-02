export const queryKey = (endpoint: string, args?: { token?: string | null }) =>
  args ? [endpoint, args?.token] : [endpoint];
