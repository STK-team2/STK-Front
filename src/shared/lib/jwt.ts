const decodePayload = (token: string): Record<string, unknown> => {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/'))) as Record<string, unknown>;
  } catch {
    return {};
  }
};

export const extractRoleFromToken = (token: string): 'ADMIN' | 'EMPLOYEE' | null => {
  const payload = decodePayload(token);
  if (payload.role === 'ADMIN') return 'ADMIN';
  if (payload.role === 'EMPLOYEE') return 'EMPLOYEE';
  return null;
};
