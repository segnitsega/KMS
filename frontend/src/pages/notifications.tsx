import React, { useState } from 'react';
import NotificationFilters from '../components/notifications/NotificationFilters';
import NotificationList from '../components/notifications/NotificationList';
import NotificationPreferences from '../components/notifications/NotificationPreferences';

interface Notification {
  id: string;
  type: 'document' | 'discussion' | 'training' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

const Notifications: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'document',
      title: 'New Document Uploaded',
      message: 'Sarah Johnson uploaded "Q4 Security Guidelines"',
      timestamp: '2024-01-15T10:30:00Z',
      read: false
    },
    {
      id: '2',
      type: 'discussion',
      title: 'New Reply in Discussion',
      message: 'Michael Chen replied to "Best practices for team collaboration"',
      timestamp: '2024-01-15T09:15:00Z',
      read: false
    },
    {
      id: '3',
      type: 'training',
      title: 'Training Module Due',
      message: 'Complete "IT Security Fundamentals" by end of week',
      timestamp: '2024-01-15T08:00:00Z',
      read: true
    },
    {
      id: '4',
      type: 'system',
      title: 'System Maintenance',
      message: 'Scheduled maintenance tonight from 2-4 AM EST',
      timestamp: '2024-01-14T16:00:00Z',
      read: true
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  // Notification preferences state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [discussionUpdates, setDiscussionUpdates] = useState(true);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={markAllAsRead}
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            Mark all as read
          </button>
        </div>
      </div>

      {/* Filters */}
      <NotificationFilters filter={filter} onFilterChange={setFilter} />

      {/* Notifications List */}
      <NotificationList
        notifications={filteredNotifications}
        onMarkAsRead={markAsRead}
        onDelete={deleteNotification}
      />

      {/* Notification Preferences */}
      <NotificationPreferences
        emailNotifications={emailNotifications}
        pushNotifications={pushNotifications}
        discussionUpdates={discussionUpdates}
        onToggleEmail={() => setEmailNotifications(prev => !prev)}
        onTogglePush={() => setPushNotifications(prev => !prev)}
        onToggleDiscussion={() => setDiscussionUpdates(prev => !prev)}
      />
    </div>
  );
};

export default Notifications;
