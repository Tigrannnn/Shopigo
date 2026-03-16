export function useResponsiveProductLimit({ rows = 3 } = {}) {
  // Basic responsive breakpoints matching typical product card widths.
  // You can tune these to your actual card min-width from CSS.
  const getPerRow = () => {
    if (typeof window === 'undefined') return 4
    const width = window.innerWidth
    if (width >= 1600) return 6
    if (width >= 1300) return 5
    if (width >= 1024) return 4
    if (width >= 768) return 3
    if (width >= 480) return 2
    return 2
  }

  const perRow = getPerRow()
  return perRow * rows
}

