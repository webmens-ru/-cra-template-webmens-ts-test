export interface IBadgeProps {
  type?: IBadgeTypes;
  count?: number | string;
}

export type IBadgeTypes = 'primary' | 'success' | 'warning' | 'danger' | 'info';
