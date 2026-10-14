import { z } from 'zod';

/** Better Auth redirects here with `?token=` on success or `?error=` on a bad/expired link. */
export const ResetPasswordSearchSchema = z.object({
  error: z.string().optional().catch(undefined),
  token: z.string().optional().catch(undefined),
});
