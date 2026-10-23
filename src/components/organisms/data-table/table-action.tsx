import { Button, type ButtonProps, Spinner, Tooltip } from '@heroui/react';
import { createLink, type LinkComponent } from '@tanstack/react-router';
import { forwardRef, type ReactNode } from 'react';

type BaseActionProps = Omit<ButtonProps, 'children'> & {
  children: ReactNode;
  label: string;
};

const ActionButton = forwardRef<HTMLButtonElement, BaseActionProps>(
  (
    {
      children,
      isDisabled,
      isPending,
      label,
      size = 'sm',
      variant = 'tertiary',
      ...props
    },
    ref
  ) => {
    return (
      <Tooltip delay={0}>
        <Button
          aria-label={label}
          isDisabled={isDisabled}
          isIconOnly
          isPending={isPending}
          ref={ref}
          size={size}
          variant={variant}
          {...props}
        >
          {({ isPending: isButtonPending }) =>
            isButtonPending ? <Spinner color='current' size='sm' /> : children
          }
        </Button>
        <Tooltip.Content showArrow>
          <Tooltip.Arrow />
          {label}
        </Tooltip.Content>
      </Tooltip>
    );
  }
);
ActionButton.displayName = 'ActionButton';

const CreatedTableActionLink = createLink(ActionButton);

const TableActionLink: LinkComponent<typeof ActionButton> =
  CreatedTableActionLink;

function TableActionButton(props: BaseActionProps) {
  return <ActionButton {...props} />;
}

type TableActionProps =
  | ({ as?: 'button' } & BaseActionProps)
  | ({ as: 'link' } & React.ComponentProps<typeof CreatedTableActionLink>);

export function TableAction(props: TableActionProps) {
  if (props.as === 'link') {
    const { as: _, ...linkProps } = props;
    return <TableActionLink {...linkProps} />;
  }

  const { as: _, ...buttonProps } = props;
  return <TableActionButton {...buttonProps} />;
}

TableAction.Button = TableActionButton;
TableAction.Link = TableActionLink;
