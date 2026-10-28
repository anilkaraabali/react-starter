import { Button } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
import { EyeClosedIcon, EyeIcon } from 'lucide-react';
import { useState } from 'react';

import { FormInput, type FormInputProps } from './form-input';

type FormPasswordInputProps = Omit<
  FormInputProps,
  'classNames' | 'suffix' | 'type'
>;

export function FormPasswordInput(props: FormPasswordInputProps) {
  const { t } = useLingui();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <FormInput
      {...props}
      classNames={{ suffix: 'pr-0.5' }}
      suffix={
        <Button
          aria-label={isVisible ? t`Hide password` : t`Show password`}
          isIconOnly
          onPress={() => setIsVisible((visible) => !visible)}
          size='sm'
          type='button'
          variant='ghost'
        >
          {isVisible ? <EyeClosedIcon /> : <EyeIcon />}
        </Button>
      }
      type={isVisible ? 'text' : 'password'}
    />
  );
}
