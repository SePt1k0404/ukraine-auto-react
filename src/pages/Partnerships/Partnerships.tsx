import { ChangeEvent, FormEvent, useState } from 'react';

export const Partnerships = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className='bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8 space-y-6'>
        <h1 className='text-4xl font-extrabold text-gray-800 mb-8 text-center'>
          Partnership Opportunities
        </h1>

        <div className='text-gray-700 space-y-6'>
          <section className='space-y-4'>
            <h2 className='text-3xl font-semibold text-gray-800'>
              1. Types of Partnerships We Seek
            </h2>
            <p className='text-lg leading-relaxed'>
              We’re looking for partnerships that align with our goals and
              vision. Whether you’re in the tech, automotive, or service
              industries, we’re eager to collaborate with businesses that share
              our commitment to innovation and customer satisfaction.
            </p>
            <ul className='list-disc pl-6 space-y-2'>
              <li>Strategic Business Partnerships</li>
              <li>Technology Integration Partnerships</li>
              <li>Marketing & Co-Branding Opportunities</li>
              <li>Collaborative Product Development</li>
            </ul>
          </section>

          <section className='space-y-4'>
            <h2 className='text-3xl font-semibold text-gray-800'>
              2. Benefits of Partnering with Us
            </h2>
            <p className='text-lg leading-relaxed'>
              Partnering with us comes with numerous benefits, including:
            </p>
            <ul className='list-disc pl-6 space-y-2'>
              <li>Access to a large, engaged customer base</li>
              <li>Co-marketing opportunities to increase brand awareness</li>
              <li>Collaborative product development for mutual growth</li>
              <li>Dedicated support for successful partnership integration</li>
            </ul>
          </section>
          <section className='space-y-4'>
            <h2 className='text-3xl font-semibold text-gray-800'>
              3. Special Offers for Collaborative Projects
            </h2>
            <p className='text-lg leading-relaxed'>
              We’re offering exclusive deals for new partners in the first
              quarter:
            </p>
            <ul className='list-disc pl-6 space-y-2'>
              <li>Discounts on joint marketing campaigns</li>
              <li>Special pricing for early product integration</li>
              <li>Dedicated resources for custom solutions</li>
            </ul>
          </section>
          <section id='join-us' className='space-y-4'>
            <h2 className='text-3xl font-semibold text-gray-800'>
              4. Join Our Partnership Program
            </h2>
            <p className='text-lg leading-relaxed'>
              Interested in becoming a partner? Fill out the form below and our
              team will get back to you as soon as possible!
            </p>

            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <label
                  htmlFor='name'
                  className='block text-lg font-semibold text-gray-700'
                >
                  Name
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className='mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm'
                  placeholder='Enter your full name'
                />
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='block text-lg font-semibold text-gray-700'
                >
                  Email Address
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className='mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm'
                  placeholder='Enter your email'
                />
              </div>

              <div>
                <label
                  htmlFor='message'
                  className='block text-lg font-semibold text-gray-700'
                >
                  Message
                </label>
                <textarea
                  name='message'
                  id='message'
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className='mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm resize-none'
                  placeholder='Tell us about your company or ideas'
                  rows={4}
                />
              </div>

              <button
                type='submit'
                className='w-full bg-main-color text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300'
              >
                Submit
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};
