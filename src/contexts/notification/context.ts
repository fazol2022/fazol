import { createContext } from 'react';
import NotificationContextModel from 'minimal-components-react/dist/components/Notification/notificationContextModel';

const NotificationContext = createContext<NotificationContextModel>({
  setError: (_error?: boolean) => {},
  setText: (_text?: string) => {},
  setChildren: (_children?) => {},
  setTimer: (_timer?: number) => {},
});
export default NotificationContext;
