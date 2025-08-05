import React from 'react';
import { 
  Check, 
  X, 
  Clock, 
  FileText, 
  MessageCircle, 
  Settings, 
  Bell 
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'document' | 'discussion' | 'training' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onMarkAsRead, onDelete }) => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'document': return <FileText className="w-5 h-5 text-blue-600" />;
      case 'discussion': return <MessageCircle className="w-5 h-5 text-purple-600" />;
      case 'training': return <Clock className="w-5 h-5 text-orange-600" />;
      case 'system': return <Settings className="w-5 h-5 text-gray-600" />;
      default: return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return diffInHours + 'h ago';
    return Math.floor(diffInHours / 24) + 'd ago';
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border p-4 transition-all ${!notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50' : ''}`}
    >
      <div className="flex items-start space-x-4">
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
          {getNotificationIcon(notification.type)}
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                {notification.title}
              </h3>
              <p className="text-gray-600 mt-1">{notification.message}</p>
              <p className="text-sm text-gray-500 mt-2">
                {formatTimeAgo(notification.timestamp)}
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              {!notification.read && (
                <button
                  onClick={() => onMarkAsRead(notification.id)}
                  className="p-1 text-blue-600 hover:text-blue-700 transition-colors"
                  title="Mark as read"
                >
                  <Check className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => onDelete(notification.id)}
                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                title="Delete notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
