/** Inner scroll container of the admin shell; used for scroll restoration and scroll-to-top. */
export const ADMIN_SCROLL_CONTAINER_ID = 'admin-content';

export const MAIN_CONTENT_ID = 'main-content';

export const CONTENT_PADDING = {
  account: 'px-4 pt-3 pb-24 sm:px-6 md:px-8 md:pt-10 lg:px-12 xl:px-16',
  default: 'p-4 sm:p-6',
  none: '',
} as const;

export type ContentPadding = keyof typeof CONTENT_PADDING;
