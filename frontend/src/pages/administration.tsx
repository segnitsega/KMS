import ContentManagement from '../components/ContentManagement'
import AssignTaskManagement from '../components/AssignTaskManagement'
import React, { useState } from 'react'
import Header from '@/components/reusable-header'
import UserManagement from '@/components/UserManagement'
import { Button } from '@/components/ui/button'
import { FiFileText, FiBookOpen, FiMessageSquare } from 'react-icons/fi'

const Administration: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Content')

  return (
    <div>
      {/* Header */}
      <Header
        title="Administration"
        subtitle="Manage users, documents, and tasks from one place."
        buttonText={activeTab === 'Users' ? 'Add User' : ''}
        dropDownText=""
        dropDownOptions={['content', 'users', 'assign tasks']}
        searchPlaceholder="search content, users, tasks"
        onButtonClick={() => {}}
      />

      {/* Tabs */}
      <div className="flex gap-0 mt-6 mb-8 bg-[#f6fafd] rounded-full overflow-hidden shadow">
        {['Content', 'Users', 'Assign Tasks'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 font-medium text-base transition-colors ${
              activeTab === tab
                ? 'bg-gradient-to-r from-[#1976ed] to-[#1976ed] text-white rounded-full'
                : 'bg-none text-black'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content based on activeTab */}
  {activeTab === 'Content' && <ContentManagement />}
  {activeTab === 'Users' && <UserManagement />}
  {activeTab === 'Assign Tasks' && <AssignTaskManagement />}
      {/* You can add a component for Assign Tasks here if needed */}
    </div>
  );
}
export default Administration;
