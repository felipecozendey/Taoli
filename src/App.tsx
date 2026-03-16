import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute } from './components/auth/ProtectedRoute'

// Global Layout
import Layout from './components/Layout'

// Public Pages
import Index from './pages/Index'
import Login from './pages/auth/Login'
import NotFound from './pages/NotFound'

// Layouts
import MasterLayout from './layouts/MasterLayout'
import ProfessionalLayout from './layouts/ProfessionalLayout'
import ClientLayout from './layouts/ClientLayout'

// Master Pages
import MasterDashboard from './pages/master/MasterDashboard'
import MasterSettings from './pages/master/MasterSettings'
import MasterUsers from './pages/master/MasterUsers'

// Professional Pages
import ProfDashboard from './pages/professional/ProfDashboard'
import ProfPatients from './pages/professional/ProfPatients'
import ProfCalendar from './pages/professional/ProfCalendar'
import ProfPrescriptions from './pages/professional/ProfPrescriptions'

// Client Pages
import ClientDashboard from './pages/client/ClientDashboard'
import ClientDiary from './pages/client/ClientDiary'
import ClientProductivity from './pages/client/ClientProductivity'
import ClientProgress from './pages/client/ClientProgress'

const App = () => (
  <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route element={<Layout />}>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />

            {/* Master Admin Routes (Role: ADMIN) */}
            <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
              <Route path="/master" element={<MasterLayout />}>
                <Route index element={<MasterDashboard />} />
                <Route path="settings" element={<MasterSettings />} />
                <Route path="users" element={<MasterUsers />} />
              </Route>
            </Route>

            {/* Professional Routes (Role: PROFESSIONAL) */}
            <Route element={<ProtectedRoute allowedRoles={['PROFESSIONAL']} />}>
              <Route path="/professional" element={<ProfessionalLayout />}>
                <Route index element={<ProfDashboard />} />
                <Route path="patients" element={<ProfPatients />} />
                <Route path="calendar" element={<ProfCalendar />} />
                <Route path="prescriptions" element={<ProfPrescriptions />} />
              </Route>
            </Route>

            {/* Client Routes (Role: CLIENT) */}
            <Route element={<ProtectedRoute allowedRoles={['CLIENT']} />}>
              <Route path="/client" element={<ClientLayout />}>
                <Route index element={<ClientDashboard />} />
                <Route path="diary" element={<ClientDiary />} />
                <Route path="productivity" element={<ClientProductivity />} />
                <Route path="progress" element={<ClientProgress />} />
              </Route>
            </Route>
          </Route>

          {/* Catch All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </AuthProvider>
  </BrowserRouter>
)

export default App
