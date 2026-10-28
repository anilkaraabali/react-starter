import { NumberField } from '@heroui/react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import type { ReactNode } from 'react';

type NumberFieldGroupProps = {
  placeholder?: string;
  prefix?: ReactNode;
};

export function NumberFieldGroup({
  placeholder,
  prefix,
}: NumberFieldGroupProps) {
  return (
    <NumberField.Group className='flex'>
      {prefix ? (
        <div className='text-field-placeholder flex h-full items-center gap-2 rounded-l-xl px-3'>
          {prefix}
        </div>
      ) : null}
      <NumberField.Input className='flex-1' placeholder={placeholder} />
      <div className='border-field-placeholder/15 flex h-full flex-col border-l'>
        <NumberField.IncrementButton className='flex h-1/2 w-6 items-center justify-center rounded-none border-0 pt-0.5 text-sm'>
          <ChevronUpIcon aria-hidden size={11} />
        </NumberField.IncrementButton>
        <NumberField.DecrementButton className='flex h-1/2 w-6 items-center justify-center rounded-none border-0 pb-0.5 text-sm'>
          <ChevronDownIcon aria-hidden size={11} />
        </NumberField.DecrementButton>
      </div>
    </NumberField.Group>
  );
}
