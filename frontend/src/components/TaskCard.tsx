import React from 'react';
import { FiEye, FiUpload } from 'react-icons/fi';
import { Button } from '@/components/ui/button';

export type TaskCardProps = {
  title: string;
  status?: string;
  priority?: string;
  priorityColor?: string;
  statusColor?: string;
  desc: string;
  due?: string;
  completed?: string;
  assignedAgo?: string;
  submitted?: string;
  assignedBy: string;
  actions: Array<{ label: string; variant?: 'outline' | 'solid'; color?: string }>;
  completedText?: string;
  completedTextColor?: string;
};

export const TaskCard: React.FC<TaskCardProps> = ({
  title,
  status,
  priority,
  priorityColor,
  statusColor,
  desc,
  due,
  completed,
  assignedAgo,
  submitted,
  assignedBy,
  actions,
  completedText,
  completedTextColor,
}) => {
  return (
    <div className={`rounded-2xl shadow-lg p-6 bg-white ${status === 'Overdue' ? 'border border-red-200' : ''}`}>
      <div className="flex items-center gap-3 mb-2">
        <span className="font-semibold text-lg">{title}</span>
        {status && (
          <span className={`px-3 py-1 rounded-lg text-xs font-medium mr-2 ${statusColor}`}>{status}</span>
        )}
        {priority && (
          <span className={`px-3 py-1 rounded-lg text-xs font-medium mr-2 ${priorityColor}`}>{priority}</span>
        )}
      </div>
      <div className="text-gray-500 mb-2 text-sm">{desc}</div>
      <div className="flex gap-6 text-xs text-gray-400 mb-2">
        {due && <span>Due: {due}</span>}
        {completed && <span>Completed: {completed}</span>}
        {assignedAgo && <span>Assigned: {assignedAgo}</span>}
        {submitted && <span>Submitted {submitted}</span>}
        <span>Assigned by: {assignedBy}</span>
      </div>
      <div className="flex gap-2 mt-2">
        {actions.map((action, i) => (
          <Button key={i} variant={action.variant === 'outline' ? 'outline' : undefined} className={`px-4 py-2 font-medium rounded-lg ${action.color}`}>{action.label}</Button>
        ))}
      </div>
      {completedText && (
        <div className="flex justify-end mt-2">
          <span className={`font-medium text-sm ${completedTextColor}`}>{completedText}</span>
        </div>
      )}
      <div className="flex justify-end gap-2 mt-2">
        <FiEye className="text-xl text-gray-400" />
        <FiUpload className="text-xl text-gray-400" />
      </div>
    </div>
  );
};

export default TaskCard;

