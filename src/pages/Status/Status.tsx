import { useState, useEffect } from 'react';
import { IStatusProps } from './Status.interface';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import clsx from 'clsx';

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
  const { theme } = useSelector((state: RootState) => state.userProfileReducer);

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
    <div className={clsx('min-h-screen')}>
      <div
        className={clsx(
          'max-w-2xl mx-auto p-6 shadow-md rounded-lg',
          theme ? 'bg-background-card-light' : 'bg-background-card-dark',
        )}
      >
        <h2
          className={clsx(
            'text-2xl font-bold mb-4',
            theme ? 'text-secondary-text' : 'text-text-light',
          )}
        >
          System Status
        </h2>

        <div
          className={clsx(
            'p-4 border-l-4 rounded-md mb-6',
            theme ? 'bg-gray-100' : 'bg-gray-700',
          )}
        >
          <h3
            className={clsx(
              'text-lg font-semibold',
              STATUS_COLORS[currentStatus.status],
              theme ? 'text-secondary-text' : 'text-text-light',
            )}
          >
            {currentStatus.message}
          </h3>
          <p
            className={clsx(
              'text-gray-500 text-sm',
              theme ? 'text-text-dark' : 'text-text-light',
            )}
          >
            Updated: {new Date(currentStatus.timestamp).toLocaleTimeString()}
          </p>
        </div>

        <h3
          className={clsx(
            'text-lg font-semibold mb-3',
            theme ? 'text-secondary-text' : 'text-text-light',
          )}
        >
          Incident History
        </h3>

        <ul className='space-y-3'>
          {history.map((incident, index) => (
            <li
              key={index}
              className={clsx(
                'p-3 border rounded-md',
                theme ? 'bg-background-card-light' : 'bg-background-card-dark',
              )}
            >
              <p
                className={clsx(
                  'font-medium',
                  STATUS_COLORS[incident.status],
                  theme ? 'text-secondary-text' : 'text-text-light',
                )}
              >
                {incident.message}
              </p>
              <p
                className={clsx(
                  'text-gray-500 text-sm',
                  theme ? 'text-text-dark' : 'text-text-light',
                )}
              >
                {new Date(incident.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
