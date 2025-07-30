import React from 'react'
import Header from '@/components/reusable-header'

const Discussions = () => {
  return (
    <div>
      <Header title='Discussions' subtitle='Collaborate and share ideas with your team' buttonText='New Discussions' dropDownText='All Categories' dropDownOptions={["All Categories", "General", "Technical","HR","Training","Announcements"]} searchPlaceholder='Search document...'/>
    </div>
  )
}

export default Discussions