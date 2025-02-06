export const PrivacyPolicy = () => {
  return (
    <div className='bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8 space-y-6'>
        <h1 className='text-4xl font-extrabold text-gray-800 mb-8 text-center'>
          Privacy Policy
        </h1>

        <div className='text-gray-700 space-y-6'>
          <p className='text-lg leading-relaxed'>
            At Ukraine Auto, we value your privacy. This Privacy Policy outlines
            how we collect, use, and share your personal information. By using
            our service, you agree to the terms outlined in this policy.
          </p>

          <nav className='space-y-4'>
            <h2 className='text-2xl font-semibold text-gray-800'>
              Table of Contents
            </h2>
            <ul className='list-inside space-y-2'>
              <li>
                <a
                  href='#information-collection'
                  className='text-blue-600 hover:text-blue-800 transition duration-300'
                >
                  Information Collection
                </a>
              </li>
              <li>
                <a
                  href='#data-usage'
                  className='text-blue-600 hover:text-blue-800 transition duration-300'
                >
                  Data Usage
                </a>
              </li>
              <li>
                <a
                  href='#third-party-sharing'
                  className='text-blue-600 hover:text-blue-800 transition duration-300'
                >
                  Third-Party Sharing
                </a>
              </li>
              <li>
                <a
                  href='#data-security'
                  className='text-blue-600 hover:text-blue-800 transition duration-300'
                >
                  Data Security
                </a>
              </li>
              <li>
                <a
                  href='#your-rights'
                  className='text-blue-600 hover:text-blue-800 transition duration-300'
                >
                  Your Rights
                </a>
              </li>
              <li>
                <a
                  href='#compliance'
                  className='text-blue-600 hover:text-blue-800 transition duration-300'
                >
                  Compliance
                </a>
              </li>
            </ul>
          </nav>

          <section id='information-collection' className='space-y-4'>
            <h2 className='text-3xl font-semibold text-gray-800'>
              1. Information Collection
            </h2>
            <p className='text-lg leading-relaxed'>
              We collect the following types of information:
              <ul className='list-disc pl-6 space-y-2'>
                <li>
                  <strong>Personal Information:</strong> Includes details such
                  as your name, email address, and payment information.
                </li>
                <li>
                  <strong>Usage Data:</strong> Information about how you
                  interact with our service, such as browsing activity, device
                  type, and location.
                </li>
                <li>
                  <strong>Cookies:</strong> We use cookies to enhance your
                  experience and track activity on our website.
                </li>
              </ul>
            </p>
          </section>

          <section id='data-usage' className='space-y-4'>
            <h2 className='text-3xl font-semibold text-gray-800'>
              2. Data Usage
            </h2>
            <p className='text-lg leading-relaxed'>
              We use your data for the following purposes:
              <ul className='list-disc pl-6 space-y-2'>
                <li>Providing and maintaining our service.</li>
                <li>
                  Personalizing your experience and responding to customer
                  support requests.
                </li>
                <li>
                  Processing transactions and sending transactional emails
                  (e.g., order confirmations).
                </li>
                <li>Improving our service by analyzing usage patterns.</li>
              </ul>
            </p>
          </section>

          <section id='third-party-sharing' className='space-y-4'>
            <h2 className='text-3xl font-semibold text-gray-800'>
              3. Third-Party Sharing
            </h2>
            <p className='text-lg leading-relaxed'>
              We may share your data with third parties under the following
              circumstances:
              <ul className='list-disc pl-6 space-y-2'>
                <li>
                  <strong>Service Providers:</strong> We may share information
                  with trusted third-party companies that help us provide our
                  service.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> We may disclose
                  information if required by law or to protect our rights.
                </li>
                <li>
                  <strong>Business Transfers:</strong> In the event of a merger
                  or acquisition, your data may be transferred to the new owner.
                </li>
              </ul>
            </p>
          </section>

          <section id='data-security' className='space-y-4'>
            <h2 className='text-3xl font-semibold text-gray-800'>
              4. Data Security
            </h2>
            <p className='text-lg leading-relaxed'>
              We take appropriate security measures to protect your data from
              unauthorized access, alteration, disclosure, or destruction.
              However, no method of transmission over the internet is 100%
              secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section id='your-rights' className='space-y-4'>
            <h2 className='text-3xl font-semibold text-gray-800'>
              5. Your Rights
            </h2>
            <p className='text-lg leading-relaxed'>
              Depending on your location, you may have the following rights
              regarding your personal data:
              <ul className='list-disc pl-6 space-y-2'>
                <li>The right to access your personal data.</li>
                <li>The right to correct or update your personal data.</li>
                <li>The right to delete your personal data.</li>
                <li>The right to object to the processing of your data.</li>
              </ul>
            </p>
          </section>

          <section id='compliance' className='space-y-4'>
            <h2 className='text-3xl font-semibold text-gray-800'>
              6. Compliance
            </h2>
            <p className='text-lg leading-relaxed'>
              Our privacy practices comply with data protection laws such as the
              General Data Protection Regulation (GDPR) and California Consumer
              Privacy Act (CCPA). If you are located in the EU or California,
              you have additional rights under these laws.
            </p>
          </section>

          <section className='mt-8'>
            <p className='text-lg leading-relaxed'>
              If you have any questions or concerns about this Privacy Policy,
              please contact us at [Contact Information].
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
