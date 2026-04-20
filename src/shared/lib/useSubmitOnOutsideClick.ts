import { useEffect } from 'react';

interface UseSubmitOnOutsideClickParams {
  container: HTMLElement | null;
  enabled: boolean;
  onOutsideClick: () => void;
}

export const useSubmitOnOutsideClick = ({
  container,
  enabled,
  onOutsideClick,
}: UseSubmitOnOutsideClickParams) => {
  useEffect(() => {
    if (!enabled || !container) {
      return undefined;
    }

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target || container.contains(target)) {
        return;
      }

      onOutsideClick();
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [container, enabled, onOutsideClick]);
};
