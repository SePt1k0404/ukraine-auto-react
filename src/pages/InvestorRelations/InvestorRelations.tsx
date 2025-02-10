import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import clsx from 'clsx';

export const InvestorRelations = () => {
  const { theme } = useSelector((state: RootState) => state.userProfileReducer);

  return (
    <div
      className={clsx(
        'py-12 px-4 sm:px-6 lg:px-8',
        theme ? 'bg-background-light' : 'bg-background-dark',
      )}
    >
      <div
        className={clsx(
          'max-w-5xl mx-auto shadow-lg rounded-lg p-8 space-y-6',
          theme ? 'bg-background-card-light' : 'bg-background-card-dark',
        )}
      >
        <h1
          className={clsx(
            'text-4xl font-extrabold text-center mb-8',
            theme ? 'text-secondary-text' : 'text-text-light',
          )}
        >
          Investor Relations
        </h1>

        <div
          className={clsx(
            'space-y-6',
            theme ? 'text-secondary-text' : 'text-text-light',
          )}
        >
          <section id='financial-reports' className='space-y-4'>
            <h2
              className={clsx(
                'text-3xl font-semibold',
                theme ? 'text-secondary-text' : 'text-text-light',
              )}
            >
              Financial Reports
            </h2>
            <p className='text-lg leading-relaxed'>
              We provide a range of financial reports, including annual reports,
              earnings releases, and quarterly updates.
            </p>
            <ul className='list-inside space-y-2'>
              <li>
                <a
                  href='#'
                  className='text-blue-600 hover:text-blue-800 transition duration-300'
                >
                  2024 Annual Report (PDF)
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-blue-600 hover:text-blue-800 transition duration-300'
                >
                  Q4 2024 Earnings Release (PDF)
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-blue-600 hover:text-blue-800 transition duration-300'
                >
                  Q3 2024 Earnings Release (PDF)
                </a>
              </li>
            </ul>
          </section>

          <section id='stock-info' className='space-y-4'>
            <h2
              className={clsx(
                'text-3xl font-semibold',
                theme ? 'text-secondary-text' : 'text-text-light',
              )}
            >
              Stock Information
            </h2>
            <p className='text-lg leading-relaxed'>
              Find the latest stock prices and performance trends of our
              company.
            </p>
            <div className='space-y-2'>
              <p>Current Stock Price: $125.50</p>
              <p>Market Cap: $10.5B</p>
              <p>Dividend Yield: 2.5%</p>
            </div>
          </section>

          <section id='upcoming-events' className='space-y-4'>
            <h2
              className={clsx(
                'text-3xl font-semibold',
                theme ? 'text-secondary-text' : 'text-text-light',
              )}
            >
              Upcoming Events
            </h2>
            <p className='text-lg leading-relaxed'>
              Stay updated on our upcoming earnings calls, investor conferences,
              and annual meetings.
            </p>
            <ul className='list-inside space-y-2'>
              <li>
                <strong>Q1 2025 Earnings Call:</strong> March 10, 2025
              </li>
              <li>
                <strong>Annual Shareholder Meeting:</strong> May 15, 2025
              </li>
            </ul>
          </section>

          <section id='presentations' className='space-y-4'>
            <h2
              className={clsx(
                'text-3xl font-semibold',
                theme ? 'text-secondary-text' : 'text-text-light',
              )}
            >
              Investor Presentations
            </h2>
            <p className='text-lg leading-relaxed'>
              Explore our latest investor presentations to understand our
              strategic vision.
            </p>
            <ul className='list-inside space-y-2'>
              <li>
                <a
                  href='#'
                  className='text-blue-600 hover:text-blue-800 transition duration-300'
                >
                  2024 Investor Day Presentation (PDF)
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-blue-600 hover:text-blue-800 transition duration-300'
                >
                  Q3 2024 Strategic Update (PDF)
                </a>
              </li>
            </ul>
          </section>

          <section id='contact-info' className='space-y-4'>
            <h2
              className={clsx(
                'text-3xl font-semibold',
                theme ? 'text-secondary-text' : 'text-text-light',
              )}
            >
              Contact Investor Relations
            </h2>
            <p className='text-lg leading-relaxed'>
              For more information, please reach out to our Investor Relations
              team:
            </p>
            <p>
              Email:{' '}
              <a href='mailto:investor@company.com' className='text-blue-600'>
                investor@company.com
              </a>
            </p>
            <p>Phone: +1 (800) 123-4567</p>
          </section>

          <section id='security' className='space-y-4'>
            <h2
              className={clsx(
                'text-3xl font-semibold',
                theme ? 'text-secondary-text' : 'text-text-light',
              )}
            >
              Security Measures
            </h2>
            <p className='text-lg leading-relaxed'>
              We take the security of your information seriously. All financial
              data is protected using encryption protocols.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
