import { useState, useEffect } from 'react';
import { IStatusProps } from './Status.interface';

const STATUS_COLORS = {
  Operational: 'text-green-500',
  Maintenance: 'text-yellow-500',
  Outage: 'text-red-500',
};

export const Status = () => {
  const [currentStatus, setCurrentStatus] = useState<IStatusProps>({
    status: 'Operational',
    message: 'All systems are running smoothly.',
    timestamp: new Date().toISOString(),
  });

  const [history, setHistory] = useState<IStatusProps[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const statuses: IStatusProps[] = [
        {
          status: 'Operational',
          message: 'All systems are running smoothly.',
          timestamp: new Date().toISOString(),
        },
        {
          status: 'Maintenance',
          message: 'Scheduled maintenance in progress.',
          timestamp: new Date().toISOString(),
        },
        {
          status: 'Outage',
          message: 'System outage detected.',
          timestamp: new Date().toISOString(),
        },
      ];

      const randomStatus =
        statuses[Math.floor(Math.random() * statuses.length)];

      setCurrentStatus(randomStatus);
      setHistory((prev) => [randomStatus, ...prev.slice(0, 4)]);
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='min-h-screen'>
      <div className='max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg'>
        <h2 className='text-2xl font-bold mb-4'>System Status</h2>
        <div className='p-4 border-l-4 rounded-md bg-gray-100 mb-6'>
          <h3
            className={`text-lg font-semibold ${STATUS_COLORS[currentStatus.status]}`}
          >
            {currentStatus.message}
          </h3>
          <p className='text-gray-500 text-sm'>
            Updated: {new Date(currentStatus.timestamp).toLocaleTimeString()}
          </p>
        </div>
        <h3 className='text-lg font-semibold mb-3'>Incident History</h3>
        <ul className='space-y-3'>
          {history.map((incident, index) => (
            <li key={index} className='p-3 border rounded-md'>
              <p className={`font-medium ${STATUS_COLORS[incident.status]}`}>
                {incident.message}
              </p>
              <p className='text-gray-500 text-sm'>
                {new Date(incident.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
