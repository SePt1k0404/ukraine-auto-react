import { useSelector } from 'react-redux';
import { Logo } from '../../components/Logo/Logo';
import { RootState } from '../../app/store';
import clsx from 'clsx';

export const About = () => {
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
          'max-w-7xl mx-auto shadow-lg rounded-lg p-8',
          theme ? 'bg-background-card-light' : 'bg-background-card-dark',
        )}
      >
        <h1
          className={clsx(
            'text-4xl font-semibold text-center mb-8',
            theme ? 'text-secondary-text' : 'text-text-light',
          )}
        >
          About Us
        </h1>

        <div
          className={clsx(
            'text-lg',
            theme ? 'text-secondary-text' : 'text-text-light',
          )}
        >
          <section className='mb-8'>
            <h2
              className={clsx(
                'text-2xl font-semibold',
                theme ? 'text-secondary-text' : 'text-text-light',
              )}
            >
              Our Mission
            </h2>
            <p>
              Our mission is to provide high-quality products and services that
              improve the lives of our customers. We are committed to
              innovation, customer satisfaction, and sustainability.
            </p>
          </section>

          <section className='mb-8'>
            <h2
              className={clsx(
                'text-2xl font-semibold',
                theme ? 'text-secondary-text' : 'text-text-light',
              )}
            >
              Our History
            </h2>
            <p>
              Founded in 2010, we started with a simple goal: to create products
              that make life easier. Over the years, we have expanded our
              operations and established a strong reputation for delivering
              exceptional value.
            </p>
          </section>

          <section className='mb-8'>
            <h2
              className={clsx(
                'text-2xl font-semibold',
                theme ? 'text-secondary-text' : 'text-text-light',
              )}
            >
              Our Team
            </h2>
            <p>
              Our team consists of dedicated professionals who are passionate
              about creating innovative solutions. We believe in collaboration,
              creativity, and continuous improvement.
            </p>
          </section>

          <section className='mb-8'>
            <h2
              className={clsx(
                'text-2xl font-semibold',
                theme ? 'text-secondary-text' : 'text-text-light',
              )}
            >
              Our Achievements
            </h2>
            <ul className='list-disc pl-6'>
              <li>Recognized as the top innovator in our industry in 2020.</li>
              <li>
                Expanded to over 5 countries, serving thousands of customers.
              </li>
              <li>
                Received numerous awards for customer satisfaction and product
                design.
              </li>
            </ul>
          </section>

          <section>
            <h2
              className={clsx(
                'text-2xl font-semibold',
                theme ? 'text-secondary-text' : 'text-text-light',
              )}
            >
              Our Values
            </h2>
            <p>
              We believe in integrity, transparency, and commitment to
              excellence. We strive to create lasting relationships with our
              customers, partners, and employees.
            </p>
          </section>
        </div>

        <div className='mt-8'>
          <h2
            className={clsx(
              'text-2xl font-semibold text-center',
              theme ? 'text-secondary-text' : 'text-text-light',
            )}
          >
            Our Team in Action
          </h2>
          <div className='flex justify-center mt-4'>
            <Logo />
          </div>
        </div>
      </div>
    </div>
  );
};
