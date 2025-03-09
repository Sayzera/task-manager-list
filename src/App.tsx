import { Outlet } from "react-router";

import { createTheme } from "@mui/material/styles";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import { Navigation, SignInPage } from "@toolpad/core";

import { navigationCustomizations } from "./theme/navigation";
import { getDesignTokens } from "./theme/themePrimitives";
import Logo from "./components/logo";
import "./index.css";
import Dashboard from "./components/icons/dashboard-icon";
import TaskManager from "./components/icons/taskmanger-icon";
import Calendar from "./components/icons/calendar-icon";
import Messages from "./components/icons/messages-icon";
import MegaMenu from "./components/icons/mega-menu-icon";
import { Checkbox } from "@mui/material";

export const NAVIGATION: Navigation = [
  {
    segment: "dashboard",
    title: "Anasayfa",
    icon: <Dashboard />,
  },
  {
    segment: "task-manager",
    title: "Görev Yöneticisi",
    icon: <TaskManager />,
  },

  {
    segment: "reports",
    title: "Takvim",
    icon: <Calendar />,
  },
  {
    segment: "messages",
    title: "Mesajlar",
    icon: <Messages />,
  },

  {
    segment: "mega-menu",
    title: "Diğer İşlemler",
    icon: <MegaMenu />,
  },
];

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: false, dark: false },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
  ...getDesignTokens("light"),
  components: {
    ...navigationCustomizations,
  },
});

interface DashboardLayoutBasicProps {
  window?: () => Window;
}

const BRANDING = {
  title: "",
  logo: <Logo />,
};

export default function DashboardLayoutBasic(props: DashboardLayoutBasicProps) {
  const demoWindow = props.window !== undefined ? props.window() : undefined;

  return (
    <ReactRouterAppProvider
      navigation={NAVIGATION}
      branding={BRANDING}
      theme={theme}
      window={demoWindow}
      localeText={{
        signInTitle: "Giriş Yap",
        signInSubtitle:
          "Hesabınıza giriş yapabilmek için lütfen bilgilerinizi giriniz.",
        email: "E-posta",
        password: "Şifre",
      }}
    >
      <Outlet />
    </ReactRouterAppProvider>
  );
}
