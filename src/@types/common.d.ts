declare type Item = {
  label: string;
  value: string;
};

declare type Toast = {
  duration?: number;
  id?: number;
  message: string;
  type: 'danger' | 'info' | 'success' | 'warning';
};
