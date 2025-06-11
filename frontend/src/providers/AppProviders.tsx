import { BrowserRouterProvider } from './router/BrowserRouterProvider';
import RoutesProvider from './router/RoutesProvider';
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
