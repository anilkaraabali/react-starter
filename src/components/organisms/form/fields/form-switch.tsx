import { Description, Switch, type SwitchProps } from '@heroui/react';
import type { ReactNode } from 'react';

import { useFieldContext } from '../form-context';

type FormSwitchProps = Omit<SwitchProps, 'isSelected' | 'onValueChange'> & {
  description?: ReactNode;
  label: string;
};

export function FormSwitch({ description, label, ...props }: FormSwitchProps) {
  const field = useFieldContext<boolean | string>();
  const isSelected = Boolean(field.state.value);

  return (
    <Switch
      isSelected={isSelected}
      name={field.name}
      onChange={(value) => field.handleChange(value)}
      {...props}
    >
      <Switch.Content>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        {label}
      </Switch.Content>
      {description && <Description>{description}</Description>}
    </Switch>
  );
}
