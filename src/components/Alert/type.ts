export interface AlertProps {
  title: string;
  description?: string;
  type?: 'success' | 'default' | 'danger' | 'warning';
  onClose?: () => void;
  closable?: boolean;
  className?: string;
}
