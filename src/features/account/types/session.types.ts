export type SessionDeviceType = 'Desktop' | 'Mobile' | 'Tablet';

export type ParsedUserAgent = {
  browser: string;
  device: SessionDeviceType;
};

export type AuthSession = {
  createdAt: Date | string;
  expiresAt: Date | string;
  id: string;
  ipAddress?: null | string;
  token: string;
  updatedAt: Date | string;
  userAgent?: null | string;
  userId: string;
};
