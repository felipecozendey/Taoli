import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { ThemeProvider } from '@/components/ThemeProvider'

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
import ProfCalendar from './pages/professional/ProfCalendar'

// Client Pages
import ClientDashboard from './pages/client/ClientDashboard'
import ClientProductivity from './pages/client/ClientProductivity'
import ClientProgress from './pages/client/ClientProgress'
import ClientFinances from './pages/client/ClientFinances'

// Lazy Pages
const MasterLogs = lazy(() => import('./pages/master/MasterLogs'))

const ProfPatients = lazy(() => import('./pages/professional/ProfPatients'))
const ProfPatientRecord = lazy(() => import('./pages/professional/ProfPatientRecord'))

const ClientNutrition = lazy(() => import('./pages/client/ClientNutrition'))
const ClientTraining = lazy(() => import('./pages/client/ClientTraining'))
const ClientMind = lazy(() => import('./pages/client/ClientMind'))
const ClientStudy = lazy(() => import('./pages/client/ClientStudy'))
const ClientTeam = lazy(() => import('./pages/client/ClientTeam'))
const ClientSettings = lazy(() => import('./pages/client/ClientSettings'))

const ProfSettings = lazy(() => import('./pages/professional/ProfSettings'))
const ProfClinic = lazy(() => import('./pages/professional/ProfClinic'))

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
)

const App = () => (
  <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
    <AuthProvider>
      <ThemeProvider defaultTheme="system" storageKey="taoli-ui-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route element={<Layout />}>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />

              {/* Master Admin Routes */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/master" element={<MasterLayout />}>
                  <Route index element={<MasterDashboard />} />
                  <Route path="settings" element={<MasterSettings />} />
                  <Route path="users" element={<MasterUsers />} />
                  <Route
                    path="logs"
                    element={
                      <Suspense fallback={<LoadingFallback />}>
                        <MasterLogs />
                      </Suspense>
                    }
                  />
                </Route>
              </Route>

              {/* Professional Routes */}
              <Route element={<ProtectedRoute allowedRoles={['professional']} />}>
                <Route path="/professional" element={<ProfessionalLayout />}>
                  <Route index element={<ProfDashboard />} />
                  <Route
                    path="patients"
                    element={
                      <Suspense fallback={<LoadingFallback />}>
                        <ProfPatients />
                      </Suspense>
                    }
                  />
                  <Route
                    path="patient/:id"
                    element={
                      <Suspense fallback={<LoadingFallback />}>
                        <ProfPatientRecord />
                      </Suspense>
                    }
                  />
                  <Route path="calendar" element={<ProfCalendar />} />
                  <Route
                    path="settings"
                    element={
                      <Suspense fallback={<LoadingFallback />}>
                        <ProfSettings />
                      </Suspense>
                    }
                  />
                  <Route
                    path="clinic"
                    element={
                      <Suspense fallback={<LoadingFallback />}>
                        <ProfClinic />
                      </Suspense>
                    }
                  />
                </Route>
              </Route>

              {/* Client Routes */}
              <Route element={<ProtectedRoute allowedRoles={['client']} />}>
                <Route path="/client" element={<ClientLayout />}>
                  <Route index element={<ClientDashboard />} />

                  {/* Lazy Loaded Modular Pages */}
                  <Route
                    path="nutrition"
                    element={
                      <Suspense fallback={<LoadingFallback />}>
                        <ClientNutrition />
                      </Suspense>
                    }
                  />
                  <Route
                    path="training"
                    element={
                      <Suspense fallback={<LoadingFallback />}>
                        <ClientTraining />
                      </Suspense>
                    }
                  />
                  <Route
                    path="mind"
                    element={
                      <Suspense fallback={<LoadingFallback />}>
                        <ClientMind />
                      </Suspense>
                    }
                  />
                  <Route
                    path="study"
                    element={
                      <Suspense fallback={<LoadingFallback />}>
                        <ClientStudy />
                      </Suspense>
                    }
                  />
                  <Route
                    path="team"
                    element={
                      <Suspense fallback={<LoadingFallback />}>
                        <ClientTeam />
                      </Suspense>
                    }
                  />

                  <Route path="productivity" element={<ClientProductivity />} />
                  <Route path="progress" element={<ClientProgress />} />
                  <Route path="finances" element={<ClientFinances />} />
                  <Route
                    path="settings"
                    element={
                      <Suspense fallback={<LoadingFallback />}>
                        <ClientSettings />
                      </Suspense>
                    }
                  />
                </Route>
              </Route>
            </Route>

            {/* Catch All */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
)

export default App
