import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className='transition-colors ease-in bg-footer-dark hover:bg-footer-light text-white text-center px-[20px] py-[15px] mt-5 w-full shadow-lg duration-300'>
      <div className='flex flex-col items-center content-center gap-5'>
        <div className='text-sm opacity-80 font-light'>
          <p>
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
        <div className='flex items-center content-center gap-4'>
          <a
            href='/terms-of-service'
            className='outline-none transition-colors ease text-white hover:text-main-color focus:text-main-color no-underline font-medium duration-300'
          >
            Terms of Service
          </a>
          <a
            href='/privacy-policy'
            className='outline-none transition-colors ease text-white hover:text-main-color focus:text-main-color no-underline font-medium duration-300'
          >
            Privacy Policy
          </a>
          <a
            href='/faq'
            className='outline-none transition-colors ease text-white hover:text-main-color focus:text-main-color no-underline font-medium duration-300'
          >
            FAQ
          </a>
        </div>
        <div className='flex items-center content-center gap-4'>
          <a
            href='https://facebook.com'
            className='outline-none transition-all ease text-white hover:text-main-color focus:text-main-color hover:-translate-y-1 focus:-translate-y-1 text-3xl no-underline duration-300'
            aria-label='Facebook'
          >
            <FaFacebook />
          </a>
          <a
            href='https://twitter.com'
            className='outline-none transition-all ease text-white hover:text-main-color focus:text-main-color hover:-translate-y-1 focus:-translate-y-1 text-3xl no-underline duration-300'
            aria-label='Twitter'
          >
            <FaTwitter />
          </a>
          <a
            href='https://linkedin.com'
            className='outline-none transition-all ease text-white hover:text-main-color focus:text-main-color hover:-translate-y-1 focus:-translate-y-1 text-3xl no-underline duration-300'
            aria-label='LinkedIn'
          >
            <FaLinkedin />
          </a>
        </div>
        <div className='text-base flex flex-col gap-4'>
          <p>
            Contact us:{' '}
            <a
              href='mailto:info@yourcompany.com'
              className='outline-none transition-colors ease text-white hover:text-main-color focus:text-main-color no-underline duration-300'
            >
              info@yourcompany.com
            </a>
          </p>
          <p>
            Phone:{' '}
            <a
              href='tel:+1234567890'
              className='outline-none transition-colors ease text-white hover:text-main-color focus:text-main-color no-underline duration-300'
            >
              +1 (234) 567-890
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
