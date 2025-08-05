import React from 'react';
import { Filter } from 'lucide-react';

interface NotificationFiltersProps {
  filter: string;
  onFilterChange: (filter: string) => void;
}

const NotificationFilters: React.FC<NotificationFiltersProps> = ({ filter, onFilterChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <Filter className="w-4 h-4 text-gray-400" />
      <select
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="all">All Notifications</option>
        <option value="unread">Unread Only</option>
        <option value="document">Documents</option>
        <option value="discussion">Discussions</option>
        <option value="training">Training</option>
        <option value="system">System</option>
      </select>
    </div>
  );
};

export default NotificationFilters;
