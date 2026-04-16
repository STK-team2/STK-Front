import styled from '@emotion/styled';
import { useToastStore } from '../../lib/toast';

const ToastViewport = styled.div`
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ToastCard = styled.div<{ variant: 'error' | 'success' | 'info' }>`
  min-width: 280px;
  max-width: 360px;
  padding: 14px 16px;
  border-radius: 12px;
  color: #fff;
  font-size: 14px;
  line-height: 1.5;
  box-shadow: 0 12px 28px rgba(16, 24, 40, 0.2);
  background: ${({ variant }) => {
    if (variant === 'error') return '#d92d20';
    if (variant === 'success') return '#067647';
    return '#175cd3';
  }};
`;

const Toast = () => {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <ToastViewport>
      {toasts.map((toast) => (
        <ToastCard key={toast.id} variant={toast.variant}>
          {toast.message}
        </ToastCard>
      ))}
    </ToastViewport>
  );
};

export default Toast;
