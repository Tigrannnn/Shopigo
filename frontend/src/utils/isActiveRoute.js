import { useLocation } from 'react-router-dom';

/**
 * Returns a function that checks if the given route matches the current pathname.
 * Usage: const isActiveRoute = useIsActiveRoute();
 *        isActiveRoute('/some-path')
 */
export function useIsActiveRoute() {
  const location = useLocation();
  return (route) => location.pathname === route;
}
