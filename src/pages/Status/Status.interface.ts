export interface IStatusProps {
  status: 'Operational' | 'Maintenance' | 'Outage';
  message: string;
  timestamp: string;
}
