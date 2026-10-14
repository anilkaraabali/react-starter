import { Avatar, cn } from '@heroui/react';
import { UserIcon } from 'lucide-react';

import { getUserInitials } from '@/utils/string.utils';

type UserAvatarProps = {
  className?: string;
  color?: 'accent' | 'default';
  name?: null | string;
  size?: 'md' | 'sm';
  variant?: 'soft';
};

export function UserAvatar({
  className,
  color = 'accent',
  name,
  size = 'sm',
  variant = 'soft',
}: UserAvatarProps) {
  const initials = getUserInitials(name);

  return (
    <Avatar
      className={cn(className)}
      color={color}
      size={size}
      variant={variant}
    >
      <Avatar.Fallback>{initials ?? <UserIcon />}</Avatar.Fallback>
    </Avatar>
  );
}
