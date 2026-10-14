import { cn, Typography } from '@heroui/react';
import { UserAvatar } from '@/components/atoms/user-avatar';

type SidebarUserLinkProps = {
  compact: boolean;
  href?: string;
  onPress?: () => void;
  roleLabel?: null | string;
  userName: string;
};

export function SidebarUserLink({
  compact,
  href = '#',
  onPress,
  roleLabel,
  userName,
}: SidebarUserLinkProps) {
  return (
    <a
      className={cn('flex min-w-0 flex-1 items-center gap-2 hover:opacity-80', {
        'justify-center': compact,
      })}
      href={href}
      onClick={(e) => {
        if (onPress) {
          e.preventDefault();
          onPress();
        }
      }}
    >
      <UserAvatar name={userName} />
      {!compact && (
        <div className='min-w-0'>
          <Typography.Paragraph size='sm' truncate>
            {userName}
          </Typography.Paragraph>
          {roleLabel ? (
            <Typography.Paragraph color='muted' size='xs'>
              {roleLabel}
            </Typography.Paragraph>
          ) : null}
        </div>
      )}
    </a>
  );
}
