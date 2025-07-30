import React from 'react'
import Header from '@/components/reusable-header'
import FeaturedArticles from '@/components/featured-articles'

const KnowledgeBase = () => {
  const articles = [
    { title: 'Understanding React Hooks', author: 'Jane Doe', views: 120 },
    { title: 'Advanced TypeScript Tips', author: 'John Smith', views: 95 },
    { title: 'State Management with Redux', author: 'Alice Johnson', views: 80 },
  ];

  return (
    <div>
      <Header title='Knowledge Base' subtitle='Collaborative wiki and knowledge articles' buttonText='New Article' dropDownText='Recently Updated ' dropDownOptions={["Recently Updated", "Most Popular", "Alphabetical"]} searchPlaceholder='Search document...'/>
      <FeaturedArticles heading="Featured Articles" articles={articles} />
    </div>
  )
}

export default KnowledgeBase
