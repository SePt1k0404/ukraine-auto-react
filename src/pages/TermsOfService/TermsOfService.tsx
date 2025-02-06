export const TermsOfService = () => {
  return (
    <div className='bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8 space-y-6'>
        <div className='max-w-4xl mx-auto px-4 py-8'>
          <h1 className='text-4xl text-center font-semibold text-gray-800 mb-6'>
            Terms of Service
          </h1>

          <div className='text-gray-700'>
            <p className='text-lg mb-4'>
              Welcome to Ukraine Auto. By accessing and using our website, you
              agree to comply with and be bound by the following terms and
              conditions. Please read these Terms of Service carefully before
              using our website.
            </p>

            <nav className='mb-6'>
              <h2 className='text-xl font-semibold text-gray-800'>
                Table of Contents
              </h2>
              <ul className='list-disc pl-6'>
                <li>
                  <a
                    href='#acceptance'
                    className='text-blue-500 hover:underline'
                  >
                    Acceptance of Terms
                  </a>
                </li>
                <li>
                  <a href='#usage' className='text-blue-500 hover:underline'>
                    User Responsibilities
                  </a>
                </li>
                <li>
                  <a
                    href='#intellectual-property'
                    className='text-blue-500 hover:underline'
                  >
                    Intellectual Property Rights
                  </a>
                </li>
                <li>
                  <a
                    href='#account-termination'
                    className='text-blue-500 hover:underline'
                  >
                    Account Termination
                  </a>
                </li>
                <li>
                  <a
                    href='#disclaimers'
                    className='text-blue-500 hover:underline'
                  >
                    Disclaimers and Limitation of Liability
                  </a>
                </li>
                <li>
                  <a
                    href='#governing-law'
                    className='text-blue-500 hover:underline'
                  >
                    Governing Law
                  </a>
                </li>
              </ul>
            </nav>

            <section id='acceptance' className='mb-6'>
              <h2 className='text-2xl font-semibold text-gray-800'>
                1. Acceptance of Terms
              </h2>
              <p className='text-lg'>
                By accessing and using our website, you agree to comply with and
                be bound by the terms and conditions outlined in this agreement.
                If you do not agree with these terms, please refrain from using
                our website.
              </p>
            </section>

            <section id='usage' className='mb-6'>
              <h2 className='text-2xl font-semibold text-gray-800'>
                2. User Responsibilities
              </h2>
              <p className='text-lg'>
                You agree to use our website in compliance with all applicable
                laws and regulations. You are responsible for any content you
                post or submit through the website, and you agree not to post
                harmful, illegal, or offensive content.
              </p>
              <ul className='list-disc pl-6'>
                <li className='text-lg'>
                  You must not use our services for unlawful purposes.
                </li>
                <li className='text-lg'>
                  You must not disrupt or interfere with the functioning of the
                  website.
                </li>
                <li className='text-lg'>
                  You are responsible for maintaining the confidentiality of
                  your account information.
                </li>
              </ul>
            </section>

            <section id='intellectual-property' className='mb-6'>
              <h2 className='text-2xl font-semibold text-gray-800'>
                3. Intellectual Property Rights
              </h2>
              <p className='text-lg'>
                All content on our website, including text, images, and
                trademarks, is protected by copyright laws and is the property
                of [Your Company Name] or its licensors. You may not use,
                reproduce, or distribute any content without prior written
                consent.
              </p>
            </section>

            <section id='account-termination' className='mb-6'>
              <h2 className='text-2xl font-semibold text-gray-800'>
                4. Account Termination
              </h2>
              <p className='text-lg'>
                We reserve the right to suspend or terminate your account at our
                discretion, without notice, for any violation of these Terms of
                Service. You may also terminate your account at any time by
                following the appropriate steps in your account settings.
              </p>
            </section>

            <section id='disclaimers' className='mb-6'>
              <h2 className='text-2xl font-semibold text-gray-800'>
                5. Disclaimers and Limitation of Liability
              </h2>
              <p className='text-lg'>
                Our website and services are provided "as is" and "as
                available." We do not guarantee the accuracy, reliability, or
                completeness of the information or services provided. We are not
                liable for any damages resulting from the use of our website or
                services.
              </p>
            </section>

            <section id='governing-law' className='mb-6'>
              <h2 className='text-2xl font-semibold text-gray-800'>
                6. Governing Law
              </h2>
              <p className='text-lg'>
                These Terms of Service shall be governed by and construed in
                accordance with the laws of [Jurisdiction]. Any disputes arising
                from the use of our website shall be subject to the exclusive
                jurisdiction of the courts in [Location].
              </p>
            </section>

            <section className='mt-8'>
              <p className='text-lg'>
                If you have any questions or concerns regarding these Terms of
                Service, please contact us at{' '}
                <a className='text-blue-600' href='#' type='email'>
                  ukraine-auto@mail.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
