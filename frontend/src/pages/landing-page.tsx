import { Link } from "react-router-dom"

const LandingPage = () => {
  return (
    <div>
        {/* Don't forget to make navigation to path: "/kms" */}
        <div className="flex justify-center items-center h-screen">
            <Link to="/kms" className="bg-blue-500 broder p-4 text-white rounded-md hover:bg-blue-400">Got to dashboard</Link>
        </div>
        
    </div>
  )
}

export default LandingPage