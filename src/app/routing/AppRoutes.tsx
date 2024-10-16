import { FC, useEffect } from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { PrivateRoutes } from './PrivateRoutes'
import { ErrorsPage } from '../modules/errors/ErrorsPage'
import OnboardingPage from '../modules/onboarding/OnboardingPage'
import { Logout, AuthPage, useAuth } from '../modules/auth'
import { App } from '../App'
import CreateCampaign from '../pages/create-campaign/CreateCampaign'
import PricingIframe from '../pages/iframes/PricingIframe'
import Preview from '../pages/preview/Preview'
import { PricingScreen } from '../pages/pricing/PricingScreen'
import { useAtom } from 'jotai'
import { userAtom } from '../../store/jotai/UserAtom'
import { useAuthStore } from '../../store/userStore/userStore';
import EmptyPage from '../modules/auth/components/EmptyPage' // Boş sayfa bileşenini içe aktarın

const { PUBLIC_URL } = process.env

const AppRoutes: FC = () => {
  // const [user, setUser] = useAtom(userAtom)
  // NEW AUTH
  // const { currentUser } = useAuth()

  const user = useAuthStore((state) => state.user);

  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path='pricing' element={<PricingScreen />} />
          <Route path='error/*' element={<ErrorsPage />} />
          <Route path='logout' element={<Logout />} />
          <Route path="preview" element={<Preview />} />

          {/* `user?.name` kontrolü yerine `user?.api_token` kullanıldı */}
          {(user?.api_token) ? (
            <>
              <Route path='/*' element={<PrivateRoutes />} />
              <Route path='create-campaign/*' element={<CreateCampaign />} />
              <Route index element={<Navigate to='/dashboard' />} />
              <Route path='onboarding/*' element={<OnboardingPage />} />
              <Route path='empty' element={<EmptyPage />} /> {/* Boş sayfa yönlendirmesi eklendi */}
            </>
          ) : (
            <>
              <Route path='auth/*' element={<AuthPage />} />
              {/* <Route path='/*' element={<AuthPage />} /> */}
              <Route path='*' element={<Navigate to='/auth' />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export { AppRoutes }
