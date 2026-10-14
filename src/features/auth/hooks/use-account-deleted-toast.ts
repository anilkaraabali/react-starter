import { toast } from '@heroui/react';
import { i18n } from '@lingui/core';
import { msg } from '@lingui/core/macro';
import { useEffect, useRef } from 'react';
import { useSessionStorage } from 'usehooks-ts';

import { KNOWN_SESSION_STORAGE_KEYS } from '@/config/known-session-storage-keys.constants';

/** Shows the one-time "Account deleted." toast flashed by the delete-account flow. */
export function useAccountDeletedToast() {
  const [accountDeleted, , removeAccountDeleted] = useSessionStorage(
    KNOWN_SESSION_STORAGE_KEYS.ACCOUNT_DELETED_FLASH,
    false
  );
  const didShowToast = useRef(false);

  useEffect(() => {
    if (!accountDeleted || didShowToast.current) {
      return;
    }

    didShowToast.current = true;
    removeAccountDeleted();
    toast.success(i18n._(msg`Account deleted.`));
  }, [accountDeleted, removeAccountDeleted]);
}
