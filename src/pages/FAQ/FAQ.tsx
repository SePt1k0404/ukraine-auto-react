import { useState } from 'react';

const faqs = [
  {
    category: 'Billing',
    questions: [
      {
        question: 'How do I update my profile information?',
        answer:
          "You can update your profile information by going to the 'Account Settings'.",
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept Stripe.',
      },
    ],
  },
  {
    category: 'Usage',
    questions: [
      {
        question: 'How do I create a new account?',
        answer:
          "Click on the 'Register' button on the header, and follow the instructions.",
      },
      {
        question: 'Can I use the service on multiple devices?',
        answer:
          'Yes, you can use the service on multiple devices by logging into your account.',
      },
    ],
  },
  {
    category: 'Troubleshooting',
    questions: [
      {
        question: 'I forgot my password, how can I reset it?',
        answer:
          "Click on the 'Forgot Password' link on the login page, and follow the steps to reset your password.",
      },
      {
        question: "The app isn't loading properly, what should I do?",
        answer:
          'Try restarting the app or clearing your browser cache. If the issue persists, contact support.',
      },
    ],
  },
];

export const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQs = faqs
    .map((category) => ({
      ...category,
      questions: category.questions.filter((q) =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <div className='bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8 space-y-6'>
        <div className='max-w-4xl mx-auto px-4 py-8'>
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-semibold text-gray-800'>
              Frequently Asked Questions
            </h1>
            <input
              type='text'
              placeholder='Search FAQs...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='mt-4 px-4 py-2 border border-gray-300 rounded-lg w-full max-w-xl mx-auto'
            />
          </div>

          <div>
            {filteredFAQs.map((category) => (
              <div key={category.category} className='mb-6'>
                <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
                  {category.category}
                </h2>
                <ul>
                  {category.questions.map((q, index) => (
                    <li key={index} className='mb-4'>
                      <details className='bg-gray-100 rounded-lg shadow-sm'>
                        <summary className='px-4 py-2 cursor-pointer text-lg font-medium text-gray-800'>
                          {q.question}
                        </summary>
                        <p className='px-4 py-2 text-gray-600'>{q.answer}</p>
                      </details>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
