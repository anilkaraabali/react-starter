import type { LucideIcon } from 'lucide-react';
import { LaptopIcon, SmartphoneIcon, TabletIcon } from 'lucide-react';

import type { SessionDeviceTypeDto } from '@/api/models/account/auth-session-dto';

const deviceIcons: Record<SessionDeviceTypeDto, LucideIcon> = {
  Desktop: LaptopIcon,
  Mobile: SmartphoneIcon,
  Tablet: TabletIcon,
};

type SessionDeviceIconProps = {
  device: SessionDeviceTypeDto;
};

export function SessionDeviceIcon({ device }: SessionDeviceIconProps) {
  const Icon = deviceIcons[device];

  return (
    <div className='bg-background text-muted flex size-10 shrink-0 items-center justify-center rounded-lg border'>
      <Icon size={20} />
    </div>
  );
}
