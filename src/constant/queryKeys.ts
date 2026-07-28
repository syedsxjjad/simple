export const QUERY_KEYS = {
  profile: ['profile'] as const,
  users: {
    detail: (id: string) => ['users', id] as const,
  },
} as const;

export const queryKeys = {
  PROFILE: 'profile',
};
