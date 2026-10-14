import { adminClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

import { env } from '@/config/env';
import { ac, roles } from '@/lib/auth-permissions';

export const authClient = createAuthClient({
  baseURL: env.API_URL, // points to NestJS backend
  fetchOptions: {
    credentials: 'include',
  },
  plugins: [
    adminClient({
      ac,
      roles,
    }),
  ],
});

export const { signIn, signOut, signUp, useSession } = authClient;
