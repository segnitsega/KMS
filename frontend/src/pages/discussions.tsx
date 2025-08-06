import React, { useState } from 'react'
import Header from '@/components/reusable-header'
import DiscussionPost from '@/components/DiscussionPost'
import NewDiscussionModal from '@/components/NewDiscussionModal'

const Discussions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const samplePost = {
    title: 'Best practices for team collaboration',
    description: 'What are your favorite tools and techniques for team collaboration?',
    author: 'Michael Chen',
    tags: ['collaboration', 'tools', 'productivity'],
    timestamp: '562d ago',
    replies: [
      {
        author: 'Sarah Johnson',
        text: 'I recommend using Slack for quick communication and Notion for documentation.',
        timestamp: '562d ago',
      },
      {
        author: 'Emily Rodriguez',
        text: 'Regular stand-ups and retrospectives have been game-changers for our team.',
        timestamp: '562d ago',
      },
    ],
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div>
      <Header
        title="Discussions"
        subtitle="Collaborate and share ideas with your team"
        buttonText="New Discussions"
        dropDownText="All Categories"
        dropDownOptions={[
          'All Categories',
          'General',
          'Technical',
          'HR',
          'Training',
          'Announcements',
        ]}
        searchPlaceholder="Search document..."
        onButtonClick={openModal}
      />
      <div className="mt-6">
        <DiscussionPost {...samplePost} />
      </div>
      {isModalOpen && <NewDiscussionModal onClose={closeModal} />}
    </div>
  )
}

export default Discussions
