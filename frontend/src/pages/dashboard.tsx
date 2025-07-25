import React from 'react'

const Dashboard = () => {
  const userName = 'Tadesse Gemechu';
  return (
    <div>
      <div className='px-4 py-6 flex flex-col gap-4 bg-blue-500 rounded-md text-white'>
        <h1 className='font-bold text-xl'>Good morning, {userName}!</h1>
        <span className='text-lg'>Ready to share knowledge and collaborate with your team?</span>
      </div>
    </div>
  )
}

export default Dashboard