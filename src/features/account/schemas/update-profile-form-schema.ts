import { z } from 'zod';
import type { UpdateProfileInput } from '@/api/models/account/update-profile-input';
import {
  emailFieldSchema,
  stringFieldSchema,
} from '@/lib/zod/schemas/field.schemas';

export const updateProfileFormSchema = z.object({
  email: emailFieldSchema,
  image: z.string().nullable().optional(),
  name: stringFieldSchema,
});

export type UpdateProfileFormValues = z.infer<typeof updateProfileFormSchema>;

export const updateProfileFormDefaultValues: UpdateProfileFormValues = {
  email: '',
  name: '',
};

export function mapUpdateProfileFormToInput(
  values: UpdateProfileFormValues,
  baseline: Pick<UpdateProfileFormValues, 'email' | 'name'>
): UpdateProfileInput {
  const payload: UpdateProfileInput = {};

  if (values.name !== baseline.name) {
    payload.name = values.name;
  }
  if (values.email !== baseline.email) {
    payload.email = values.email;
  }

  return payload;
}
