import { useEventListener } from 'usehooks-ts';

const NON_TEXT_INPUT_TYPES = new Set([
  'button',
  'checkbox',
  'radio',
  'range',
  'reset',
  'submit',
]);

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  if (
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement
  )
    return true;
  if (target instanceof HTMLInputElement)
    return !NON_TEXT_INPUT_TYPES.has(target.type);
  return target.getAttribute('role') === 'textbox';
}

export function useSidebarToggleShortcut(onToggle: () => void) {
  useEventListener('keydown', (e) => {
    if (e.defaultPrevented || e.repeat) return;
    if (!(e.metaKey || e.ctrlKey) || e.altKey || e.shiftKey) return;
    if (e.key !== '.') return;
    if (isTypingTarget(e.target)) return;

    e.preventDefault();
    onToggle();
  });
}
