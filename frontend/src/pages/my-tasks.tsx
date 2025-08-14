
import React from 'react';
import { TaskCard } from '@/components/TaskCard';
import type { TaskCardProps } from '@/components/TaskCard';

const tasks: TaskCardProps[] = [
  {
    title: 'Complete API Documentation Review',
    status: 'In Progress',
    priority: 'High Priority',
    priorityColor: 'bg-red-100 text-red-700',
    statusColor: 'bg-yellow-100 text-yellow-700',
    desc: 'Review the new API documentation for version 2.1 and provide feedback on completeness, accuracy, and clarity. Focus on endpoint descriptions and example implementations.',
    due: 'Jan 25, 2024',
    assignedAgo: '3 days ago',
    assignedBy: 'Admin Team',
    actions: [
      { label: 'Submit Solution', variant: 'solid', color: 'bg-blue-600 text-white' },
      { label: 'View Details', variant: 'outline', color: 'border border-[#e3eafc] text-[#1976ed] bg-white' }
    ]
  },
  {
    title: 'Update Employee Onboarding Guide',
    status: 'Pending',
    priority: 'Medium Priority',
    priorityColor: 'bg-yellow-100 text-yellow-700',
    statusColor: 'bg-blue-100 text-blue-700',
    desc: 'Update the employee onboarding guide with new remote work policies and digital tool setup instructions. Include screenshots and step-by-step procedures.',
    due: 'Jan 28, 2024',
    assignedAgo: '1 day ago',
    assignedBy: 'HR Team',
    actions: [
      { label: 'Start Task', variant: 'solid', color: 'bg-blue-600 text-white' },
      { label: 'View Details', variant: 'outline', color: 'border border-[#e3eafc] text-[#1976ed] bg-white' }
    ]
  },
  {
    title: 'Security Training Module Completion',
    status: 'Completed',
    priority: 'Low Priority',
    priorityColor: 'bg-green-100 text-green-700',
    statusColor: 'bg-green-100 text-green-700',
    desc: 'Complete the mandatory security training module covering password policies, phishing awareness, and data protection procedures.',
    completed: 'Jan 20, 2024',
    submitted: 'on time',
    assignedBy: 'Security Team',
    actions: [
      { label: 'View Submission', variant: 'solid', color: 'bg-green-600 text-white' },
      { label: 'View Details', variant: 'outline', color: 'border border-[#e3eafc] text-[#1976ed] bg-white' }
    ],
    completedText: 'Task Completed',
    completedTextColor: 'text-green-600'
  },
  {
    title: 'Resolve Production Outage',
    status: 'Urgent',
    priority: 'Urgent',
    priorityColor: 'bg-red-600 text-white',
    statusColor: 'bg-red-100 text-red-700',
    desc: 'Immediate action required: Production system is down. Investigate and restore service as soon as possible.',
    due: 'Today',
    assignedAgo: 'Just now',
    assignedBy: 'System Admin',
    actions: [
      { label: 'Resolve Now', variant: 'solid', color: 'bg-red-600 text-white' },
      { label: 'View Details', variant: 'outline', color: 'border border-[#e3eafc] text-[#1976ed] bg-white' }
    ]
  }
];

const MyTasks: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
  <h1 className="text-2xl font-bold  gap-3">My Tasks</h1>
  <p className="text-gray-500 ">View and manage your assigned tasks, priorities, and deadlines.</p>
      <div className="flex flex-col gap-6">
        {tasks.map((task, idx) => (
          <TaskCard key={idx} {...task} />
        ))}
      </div>
    </div>
  );
};

export default MyTasks;
