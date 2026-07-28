export enum USER_ROLES {
  ADMIN = 'ADMIN',
  OWNER = 'OWNER',
  TRAINER = 'TRAINER',
  ASSISTANT_TRAINER = 'ASSISTANT_TRAINER',
  SYNDICATE_MANAGER = 'SYNDICATE_MANAGER',
  SYNDICATE_MEMBER = 'SYNDICATE_MEMBER',
}

export const USER_ROLE_URL_SEGMENT: Record<USER_ROLES, string> = {
  [USER_ROLES.ADMIN]: 'admin',
  [USER_ROLES.OWNER]: 'owner',
  [USER_ROLES.TRAINER]: 'trainer',
  [USER_ROLES.ASSISTANT_TRAINER]: 'assistant-trainer',
  [USER_ROLES.SYNDICATE_MANAGER]: 'syndicate-manager',
  [USER_ROLES.SYNDICATE_MEMBER]: 'syndicate-member',
};

export function isPathAllowedForRole(pathname: string, role: USER_ROLES): boolean {
  const segment = USER_ROLE_URL_SEGMENT[role];
  const prefix = `/${segment}`;
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}


