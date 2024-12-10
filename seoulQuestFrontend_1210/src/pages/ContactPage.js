import React, { useState, useEffect } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import { postAdd } from '../api/ContactApi';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiry: ''
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // FAQ Data
  const faqData = [
    {
      question: "How can I book a tour?",
      answer: "You can book a tour by selecting your desired tour on the Tours page and clicking the 'Book Now' button. During the booking process, you can choose the date and number of participants."
    },
    {
      question: "What is your refund policy?",
      answer: "Cancellations made up to 7 days before the tour start date are eligible for a 100% refund. Cancellations up to 3 days before the start date are eligible for a 50% refund. No refunds are available for cancellations made less than 3 days before the tour."
    },
    {
      question: "Is group booking available?",
      answer: "Yes, group bookings for 10 or more participants are eligible for special discounts. For more details, please contact us via email."
    },
    {
      question: "How long do tours take?",
      answer: "Standard tours typically last about 2-3 hours, while premium tours may take 4-5 hours. Detailed durations for each tour can be found on the tour detail page."
    },
    {
      question: "What should I bring?",
      answer: "Please wear comfortable clothing and walking shoes. In summer, bring a hat and sunscreen. In winter, prepare a warm coat. A camera is optional."
    },
    {
      question: "Do tours proceed in rainy weather?",
      answer: "In light rain, we provide umbrellas and proceed with the tour as scheduled. However, in cases of severe weather such as heavy rain or snowstorms, tours may be canceled for safety reasons, and a full refund will be provided."
    },
    {
      question: "Are foreign language guides available?",
      answer: "Yes, we offer guided tours in English, Japanese, and Chinese. If you prefer a specific language, please contact us after booking."
    },
    {
      question: "Where is the meeting point for tours?",
      answer: "Most tours start near subway stations. After your booking is confirmed, we will send you the exact meeting location and a map via email."
    },
    {
      question: "What payment methods are available?",
      answer: "We accept various payment methods, including credit cards and bank transfers. All payments are processed through a secure system."
    }
  ];

  // Detect screen size for responsiveness
  useEffect(() => {
    const updateScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    updateScreenSize(); // Initial check
    window.addEventListener('resize', updateScreenSize); // Add event listener

    return () => {
      window.removeEventListener('resize', updateScreenSize); // Cleanup event listener
    };
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const contactData = { ...formData };
      await postAdd(contactData);
      alert('Your inquiry has been successfully sent');
      setFormData({ name: '', email: '', inquiry: '' });
    } catch (error) {
      setMessage('Failed to send your inquiry. Please try again');
      setIsError(true);
    }
  };

  // Toggle FAQ item
  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <BasicLayout>
      <div className="min-h-[calc(100vh-200px)] px-5 py-16" style={{ backgroundColor: "#E0DCD0" }}>
        <h1 className="text-3xl font-semibold text-gray-900 text-center mb-10 mt-10">
          Customer Support Center
        </h1>

        <div
          className={`max-w-[1200px] mx-auto ${isSmallScreen ? 'flex flex-col' : 'grid grid-cols-2'
            } gap-10`}
        >
          {/* FAQ Section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl text-gray-800 mb-8 text-center">
              Frequently Asked Questions
            </h2>

            <div>
              {faqData.map((faq, index) => (
                <div
                  key={index}
                  className={`mb-2 bg-gray-50 rounded-lg ${openIndex === index && isSmallScreen ? 'shadow-md' : ''
                    }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className={`w-full px-5 py-4 text-left ${openIndex === index ? 'bg-stone-500 text-white' : 'bg-gray-50 text-gray-800'
                      } flex justify-between items-center`}
                  >
                    {faq.question}
                    <span
                      className={`transform transition-transform ${openIndex === index ? 'rotate-180' : 'rotate-0'
                        }`}
                    >
                      ▼
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 overflow-hidden ${openIndex === index ? 'p-5 max-h-96' : 'max-h-0'
                      }`}
                  >
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Us Section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl text-gray-800 mb-8 text-center">Contact Us</h2>
            <p className="text-gray-600 text-base text-center mb-8">
              If you have any questions or inquiries, please leave us and we will respond quickly
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="name" className="block mb-2 text-gray-800 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Please enter your name"
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg text-sm"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-gray-800 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Please enter the email address you would like to receive a reply from"
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg text-sm"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="inquiry" className="block mb-2 text-gray-800 font-medium">
                  Inquiry
                </label>
                <textarea
                  id="inquiry"
                  name="inquiry"
                  value={formData.inquiry}
                  onChange={handleChange}
                  placeholder="Please fill out your inquiry in detail and we will respond quickly"
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg text-sm"
                ></textarea>
              </div>
              {message && (
                <div
                  className={`mb-5 p-3 rounded-lg ${isError ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'
                    }`}
                >
                  {message}
                </div>
              )}
              <button className="w-full py-3 bg-stone-500 text-white rounded-lg">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default ContactPage;
