import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './layout'
import Dashboard from './pages/dashboard'
import Documents from './pages/documents'   
import KnowledgeBase from './pages/knowledge-base'
import Discussions from './pages/discussions'
import ExpertDirectory from './pages/expert-directory'
import Training from './pages/training'
import Notifications from './pages/notifications'
import Analytics from './pages/analytics'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="documents" element={<Documents />} />
          <Route path="knowledge-base" element={<KnowledgeBase />} />
          <Route path="discussions" element={<Discussions />} />
          <Route path="expert-directory" element={<ExpertDirectory />} />
          <Route path="training" element={<Training />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App