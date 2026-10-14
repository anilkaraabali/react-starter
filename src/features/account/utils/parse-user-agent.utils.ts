import type {
  ParsedUserAgent,
  SessionDeviceType,
} from '@/features/account/types/session.types';

export function parseUserAgent(userAgent?: null | string): ParsedUserAgent {
  if (!userAgent) {
    return { browser: 'Unknown', device: 'Desktop' };
  }

  const ua = userAgent.toLowerCase();

  let device: SessionDeviceType = 'Desktop';
  if (/ipad|tablet|playbook|silk/i.test(userAgent)) {
    device = 'Tablet';
  } else if (
    /mobile|iphone|ipod|android.*mobile|windows phone/i.test(userAgent)
  ) {
    device = 'Mobile';
  }

  let browser = 'Unknown';
  if (ua.includes('edg/')) {
    browser = 'Edge';
  } else if (ua.includes('chrome/') && !ua.includes('edg/')) {
    browser = 'Chrome';
  } else if (ua.includes('firefox/')) {
    browser = 'Firefox';
  } else if (ua.includes('opr/') || ua.includes('opera/')) {
    browser = 'Opera';
  } else if (ua.includes('safari/') && !ua.includes('chrome/')) {
    browser = 'Safari';
  }

  return { browser, device };
}
