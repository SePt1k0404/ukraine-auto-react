import styles from './Footer.module.css';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.copyright}>
          <p>
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
        <div className={styles.links}>
          <a href='/terms-of-service' className={styles.link}>
            Terms of Service
          </a>
          <a href='/privacy-policy' className={styles.link}>
            Privacy Policy
          </a>
          <a href='/faq' className={styles.link}>
            FAQ
          </a>
        </div>
        <div className={styles.socialMedia}>
          <a
            href='https://facebook.com'
            className={styles.socialLink}
            aria-label='Facebook'
          >
            <FaFacebook />
          </a>
          <a
            href='https://twitter.com'
            className={styles.socialLink}
            aria-label='Twitter'
          >
            <FaTwitter />
          </a>
          <a
            href='https://linkedin.com'
            className={styles.socialLink}
            aria-label='LinkedIn'
          >
            <FaLinkedin />
          </a>
        </div>
        <div className={styles.contact}>
          <p>
            Contact us:{' '}
            <a
              href='mailto:info@yourcompany.com'
              className={styles.contactLink}
            >
              info@yourcompany.com
            </a>
          </p>
          <p>
            Phone:{' '}
            <a href='tel:+1234567890' className={styles.contactLink}>
              +1 (234) 567-890
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
