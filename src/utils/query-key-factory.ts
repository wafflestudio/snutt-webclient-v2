export const queryKey = (endpoint: string, args?: { token?: string | null }) => [endpoint, args?.token];
