import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { HelmetProvider } from 'react-helmet-async';
import { setAuthFailedCallback } from '@/http';
import ScrollToTop from '../ScrollToTop';
import { useLogoutQuery } from '@/hooks/query/useUsersQuery';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
    },
  },
})

function AuthFailedHandler() {
  const { mutate: logout } = useLogoutQuery()

  setAuthFailedCallback(() => {
    logout()
  })

  return null
}

export default function AppProvider({ children }) {
  return (
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID'}>
            <AuthFailedHandler />
            <HelmetProvider>
              <ScrollToTop />
              {children}
            </HelmetProvider>
          </GoogleOAuthProvider>
        </QueryClientProvider>
    </BrowserRouter>
  )
}
