import { Button, type ButtonProps, buttonVariants, cn } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
import { createLink, type LinkProps, useRouter } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';
import type { ComponentPropsWithRef, ReactNode } from 'react';

const BackButtonLink = createLink(function StyledBackButtonLink({
  children,
  className,
  ...props
}: ComponentPropsWithRef<'a'>) {
  return (
    <a
      {...props}
      className={cn(buttonVariants({ variant: 'ghost' }), className)}
    >
      <ArrowLeftIcon aria-hidden />
      {children}
    </a>
  );
});

export type BackButtonProps = Omit<ButtonProps, 'children' | 'className'> & {
  children?: ReactNode;
  className?: string;
  to?: LinkProps['to'];
};

export function BackButton({
  children,
  className,
  onPress,
  to,
  variant = 'ghost',
  ...buttonProps
}: BackButtonProps) {
  const { t } = useLingui();
  const router = useRouter();
  const label = children ?? t(msg`Back`);

  if (to) {
    return (
      <BackButtonLink className={className} to={to}>
        {label}
      </BackButtonLink>
    );
  }

  return (
    <Button
      className={className}
      onPress={(event) => {
        onPress?.(event);
        router.history.back();
      }}
      variant={variant}
      {...buttonProps}
    >
      <ArrowLeftIcon aria-hidden />
      {label}
    </Button>
  );
}
