import { cn } from '@heroui/react';
import { Logo } from '@/components/atoms/logo';

type SidebarLogoLinkProps = {
  href?: string;
  isExpanded: boolean;
  onPress?: () => void;
};

export function SidebarLogoLink({
  href = '/',
  isExpanded,
  onPress,
}: SidebarLogoLinkProps) {
  return (
    <a
      className={cn('flex items-center', {
        'gap-1 pl-2': isExpanded,
        'justify-center pl-0': !isExpanded,
      })}
      href={href}
      onClick={(e) => {
        if (onPress) {
          e.preventDefault();
          onPress();
        }
      }}
    >
      <Logo
        className={cn('text-accent', {
          'max-w-40': isExpanded,
        })}
        showWordmark={isExpanded}
      />
    </a>
  );
}
