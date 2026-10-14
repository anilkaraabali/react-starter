import type { LucideIcon } from 'lucide-react';
import { LaptopIcon, SmartphoneIcon, TabletIcon } from 'lucide-react';

import type { SessionDeviceType } from '@/features/account/types/session.types';

const deviceIcons: Record<SessionDeviceType, LucideIcon> = {
  Desktop: LaptopIcon,
  Mobile: SmartphoneIcon,
  Tablet: TabletIcon,
};

type SessionDeviceIconProps = {
  device: SessionDeviceType;
};

export function SessionDeviceIcon({ device }: SessionDeviceIconProps) {
  const Icon = deviceIcons[device];

  return (
    <div className='flex size-10 shrink-0 items-center justify-center rounded-lg border bg-background text-muted'>
      <Icon size={20} />
    </div>
  );
}
