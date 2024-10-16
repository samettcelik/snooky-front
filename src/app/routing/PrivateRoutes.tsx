import { FC, lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
import TopBarProgress from "react-topbar-progress-indicator";
import { DashboardWrapper } from "../pages/dashboard/DashboardWrapper";
import { CampaignsWrapper } from "../pages/campaigns/CampaignsWrapper";
import { MenuTestPage } from "../pages/MenuTestPage";
import { getCSSVariableValue } from "../../_metronic/assets/ts/_utils";
import { WithChildren } from "../../_metronic/helpers";
import SettingsPageWrapper from "../pages/layout-builder/SettingsPageWrapper";
import AnalyticsPage from "../pages/analytics/AnalyticsPageWrapper";
import { PricingScreen } from "../pages/pricing/PricingScreen";
import NotificationPageWrapper from "../pages/notifications/NotificationsPageWrapper";
import Preview from "../pages/preview/Preview";
import EmptyPage from '../modules/auth/components/EmptyPage'; // Boş sayfa bileşenini içe aktarın
import { useAuthStore } from '../../store/userStore/userStore';

// Lazy loaded components
const ProfilePage = lazy(() => import("../modules/profile/ProfilePage"));
const WizardsPage = lazy(() => import("../modules/wizards/WizardsPage"));
const OnboardingPage = lazy(() => import("../modules/onboarding/OnboardingPage"));
const AccountPage = lazy(() => import("../modules/accounts/AccountPage"));
const WidgetsPage = lazy(() => import("../modules/widgets/WidgetsPage"));
const ChatPage = lazy(() => import("../modules/apps/chat/ChatPage"));
const UsersPage = lazy(() => import("../modules/apps/user-management/UsersPage"));

const PrivateRoutes: FC = () => {
  const user = useAuthStore((state) => state.user); // Oturum bilgisi kontrolü

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Kullanıcı oturum açmamışsa, "auth" sayfasına yönlendirilir */}
        {user ? (
          <>
            {/* Başarılı login sonrası yönlendirme */}
            <Route path="auth/*" element={<Navigate to="/dashboard" />} />
            {/* Sayfalar */}
            <Route path="dashboard" element={<DashboardWrapper />} />
            <Route path="campaigns" element={<CampaignsWrapper />} />
            {/* <Route path="pricing" element={<PricingScreen />} /> */}
            <Route path="notifications" element={<NotificationPageWrapper />} />
            {/* Boş Sayfa Yolu */}
            <Route path="empty" element={<EmptyPage />} />

            <Route
              path="settings"
              element={
                <SuspensedView>
                  <SettingsPageWrapper />
                </SuspensedView>
              }
            />
            <Route path="menu-test" element={<MenuTestPage />} />
            {/* Lazy Modules */}
            <Route
              path="crafted/pages/profile/*"
              element={
                <SuspensedView>
                  <ProfilePage />
                </SuspensedView>
              }
            />
            <Route
              path="crafted/pages/wizards/*"
              element={
                <SuspensedView>
                  <WizardsPage />
                </SuspensedView>
              }
            />
            <Route
              path="crafted/widgets/*"
              element={
                <SuspensedView>
                  <WidgetsPage />
                </SuspensedView>
              }
            />
            <Route
              path="crafted/account/*"
              element={
                <SuspensedView>
                  <AccountPage />
                </SuspensedView>
              }
            />
            <Route
              path="apps/chat/*"
              element={
                <SuspensedView>
                  <ChatPage />
                </SuspensedView>
              }
            />
            <Route
              path="apps/user-management/*"
              element={
                <SuspensedView>
                  <UsersPage />
                </SuspensedView>
              }
            />
            <Route
              path="analytics"
              element={
                <SuspensedView>
                  <AnalyticsPage />
                </SuspensedView>
              }
            />
            <Route
              path="analytics/:id"
              element={
                <SuspensedView>
                  <AnalyticsPage />
                </SuspensedView>
              }
            />
            {/* Sayfa Bulunamadı */}
            <Route path="*" element={<Navigate to="/error/404" />} />
          </>
        ) : (
          // Kullanıcı oturum açmamışsa "auth" sayfasına yönlendirin
          <Navigate to="/auth" />
        )}
      </Route>
    </Routes>
  );
};

// Suspense Wrapper
const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue("--bs-primary");
  TopBarProgress.config({
    barColors: {
      "0": baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
