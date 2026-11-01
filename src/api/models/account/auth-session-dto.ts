export type SessionDeviceTypeDto = 'Desktop' | 'Mobile' | 'Tablet';

export type ParsedUserAgentDto = {
  browser: string;
  device: SessionDeviceTypeDto;
};

export type AuthSessionDto = {
  createdAt: Date | string;
  expiresAt: Date | string;
  id: string;
  ipAddress?: null | string;
  token: string;
  updatedAt: Date | string;
  userAgent?: null | string;
  userId: string;
};
