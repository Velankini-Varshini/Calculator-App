export const formatNumber = (value: string) => {
  if (!value) return '0';

  const parts = value.split('.');
  parts[0] = Number(parts[0]).toLocaleString();

  return parts.join('.');
};