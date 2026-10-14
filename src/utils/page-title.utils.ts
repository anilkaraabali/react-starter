import type { I18n } from '@lingui/core';

import { msg } from '@lingui/core/macro';

export function getPageTitleTemplate(i18n: I18n) {
  return `%s • ${i18n._(msg`Admin Starter`)}`;
}
