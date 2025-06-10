import { BrowserRouterProvider } from './Router/BrowserRouterProvider';
import RoutesProvider from './Router/RoutesProvider';
import { ThemeProvider } from './theme/ThemeProvider';

export const AppProviders = () => {
  return (
    <ThemeProvider>
      <BrowserRouterProvider>
        <RoutesProvider />
      </BrowserRouterProvider>
    </ThemeProvider>
  );
};
