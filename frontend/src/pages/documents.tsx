import Header from '@/components/reusable-header'
import React from 'react'

const Documents = () => {
  return (
    <div>
      <Header title='Documents' subtitle='Manage and share organizational documents' buttonText='Upload Document' dropDownText='All Catagories' dropDownOptions={["All Catagories", "Engineering", "Marketing"]} searchPlaceholder='Search document...'/>
    </div>
  )
}

export default Documents