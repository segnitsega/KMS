import ContentManagement from '../components/ContentManagement'
import AssignTaskManagement from '../components/AssignTaskManagement'
import React, { useState } from 'react'
import Header from '@/components/reusable-header'
import UserManagement from '@/components/UserManagement'

const Administration: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Content')

  return (
    <div>
      <Header
        title="Administration"
        subtitle="Manage users, documents, and tasks from one place."
        buttonText={'Add User'}
        dropDownText=""
        dropDownOptions={['content', 'users', 'assign tasks']}
        searchPlaceholder="search content, users, tasks"
        onButtonClick={() => {}}
      />
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
  {activeTab === 'Content' && <ContentManagement />}
  {activeTab === 'Users' && <UserManagement />}
  {activeTab === 'Assign Tasks' && <AssignTaskManagement />}
    </div>
  );
}
export default Administration;
