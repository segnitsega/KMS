import Header from '@/components/reusable-header'
import ExpertDirectoryCard from '@/cards/expert-directory/expert-directory-card'

const ExpertDirectory = () => {
  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Expert Directory"
        subtitle="Find colleagues with specific skills and expertise"
        dropDownText="All Departments"
        dropDownOptions={["All Departments", "Engineering", "Marketing"]}
        searchPlaceholder="Search by name, skill..."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
         <ExpertDirectoryCard
          name="Sarah Johnson" role="admin" department="IT"
          date="1/15/2020" skill1="System Adminstration" skill2="Security" 
          skill3="Project Management"/>
         
         <ExpertDirectoryCard 
          name="Micheal Chen" role="expert" department="Engineering"
          date="3/10/2019" skill1="React" skill2="Node.js" 
          skill3="cloud Architecture" skill4="DevOps"/>

          <ExpertDirectoryCard
          name="Emily Rodriguez" role="employee" department="Marketing"
          date="6/10/2021" skill1="Content Strategy" skill2="seo" 
          skill3="Social Media"/>

         <ExpertDirectoryCard
          name="David Kim" role="new hire" department="Sales"
          date="1/8/2024" skill1="Communication" skill2="CRM" 
          />
      
      </div>
    </div>
  )
}

export default ExpertDirectory