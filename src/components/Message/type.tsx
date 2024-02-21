export type MessageInput = (message: string) => void;

export interface MessageItem {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

export interface MessageQueueItem extends MessageItem {
  id: string;
}

export interface IMessage {
  info: MessageInput;
  warn: MessageInput;
  error: MessageInput;
  success: MessageInput;
}
