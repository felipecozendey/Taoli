import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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

// Lazy load Layouts
const MasterLayout = lazy(() => import('./layouts/MasterLayout'))
const ProfessionalLayout = lazy(() => import('./layouts/ProfessionalLayout'))
const ClientLayout = lazy(() => import('./layouts/ClientLayout'))

// Lazy load Master Pages
const MasterDashboard = lazy(() => import('./pages/master/MasterDashboard'))
const MasterSettings = lazy(() => import('./pages/master/MasterSettings'))
const MasterUsers = lazy(() => import('./pages/master/MasterUsers'))

// Lazy load Professional Pages
const ProfDashboard = lazy(() => import('./pages/professional/ProfDashboard'))
const ProfPatients = lazy(() => import('./pages/professional/ProfPatients'))
const ProfCalendar = lazy(() => import('./pages/professional/ProfCalendar'))
const ProfPrescriptions = lazy(() => import('./pages/professional/ProfPrescriptions'))

// Lazy load Client Pages
const ClientDashboard = lazy(() => import('./pages/client/ClientDashboard'))
const ClientDiary = lazy(() => import('./pages/client/ClientDiary'))
const ClientProductivity = lazy(() => import('./pages/client/ClientProductivity'))
const ClientProgress = lazy(() => import('./pages/client/ClientProgress'))

// Loading Fallback
const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-background">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent opacity-50" />
  </div>
)

const App = () => (
  <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
      </TooltipProvider>
    </AuthProvider>
  </BrowserRouter>
)

export default App
