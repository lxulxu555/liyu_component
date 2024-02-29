import classNames from 'classnames';
import { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { nanoid } from 'nanoid';
import { IMessage, MessageItem, MessageQueueItem } from './type';
import { Icon } from '../Icon/icon';

const MESSAGE_QUEUE: Array<MessageQueueItem> = [];
let containerRoot: any;

function addMessage(params: MessageItem) {
  const id = nanoid();
  MESSAGE_QUEUE.push({ ...params, id });
  renderMessage([...MESSAGE_QUEUE]);
}

function removeMessage(id: string) {
  const position = MESSAGE_QUEUE.findIndex((item) => item.id === id);
  MESSAGE_QUEUE.splice(position, 1);
  renderMessage([...MESSAGE_QUEUE]);
}

function createContainer() {
  const container = document.createElement('div');
  container.classList.add('message__container');
  document.body.appendChild(container);
  return container;
}

function renderMessage(messageQueue: Array<any>) {
  if (!containerRoot) {
    const container = createContainer();
    containerRoot = createRoot(container);
  }

  const MessageComponents = messageQueue.map((props) => {
    return <BaseMessage {...props} key={props.id} />;
  });

  containerRoot.render(MessageComponents);
}

const BaseMessage = ({ message, type = 'info', id }: MessageQueueItem) => {
  const refMessage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    refMessage.current?.classList.add('visible');

    setTimeout(() => {
      handleHidden();
    }, 3000);
  }, []);

  const clear = () => removeMessage(id);

  const handleHidden = () => {
    if (refMessage.current) {
      refMessage.current.addEventListener('animationend', clear, {
        once: true,
      });
    }
    refMessage.current?.classList.add('hidden');
  };

  const messageClass = classNames('message', {
    [`${type}`]: type,
  });

  const renderIcon = () => {
    switch (type) {
      case 'info':
        return <Icon name="badge-info" size={20} />;
      case 'warning':
        return <Icon name="badge-alert" size={20} />;
      case 'error':
        return <Icon name="badge-x" size={20} />;
      case 'success':
        return <Icon name="badge-check" size={20} />;
      default:
        return null;
    }
  };

  return (
    <div className={messageClass} ref={refMessage}>
      {renderIcon()}
      <span>{message}</span>
    </div>
  );
};

const Message: IMessage = {
  info: (message: string) => addMessage({ type: 'info', message }),
  warn: (message: string) => addMessage({ type: 'warning', message }),
  error: (message: string) => addMessage({ type: 'error', message }),
  success: (message: string) => addMessage({ type: 'success', message }),
};

export { Message };
