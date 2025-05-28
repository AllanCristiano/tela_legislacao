/**
 * Format date from ISO format to Brazilian format
 */
export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

/**
 * Get current year
 */
export const getCurrentYear = (): number => {
  return new Date().getFullYear();
};

/**
 * Get an array of the last N years (including current)
 */
export const getYearRange = (count: number): number[] => {
  const currentYear = getCurrentYear();
  return Array.from({ length: count }, (_, i) => currentYear - i);
};