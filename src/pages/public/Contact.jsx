import { useForm } from 'react-hook-form';
import { useState } from 'react';
import PageBanner from '../../components/common/PageBanner';
import SectionHeader from '../../components/common/SectionHeader';
import { addDocument } from '../../hooks/useFirestore';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend } from 'react-icons/fi';

export default function Contact() {
  const [submitStatus, setSubmitStatus] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await addDocument('contactMessages', data);
      setSubmitStatus('success');
      reset();
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <div>
      <PageBanner
        title="Contact Us"
        subtitle="Get in touch with our parish office"
      />

      <section className="container-section">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-primary-500 mb-6">
              Parish Office
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiMapPin className="text-primary-500" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Address</h4>
                  <p className="text-gray-600 text-sm">
                    St. Mathew's Knanaya Catholic Church
                    <br />
                    Vakathanam P.O.
                    <br />
                    Kottayam District, Kerala
                    <br />
                    India - 686538
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiPhone className="text-primary-500" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Phone</h4>
                  <p className="text-gray-600 text-sm">+91 XXXXX XXXXX</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiMail className="text-primary-500" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Email</h4>
                  <p className="text-gray-600 text-sm">
                    parish@stmathewsvakathanam.org
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiClock className="text-primary-500" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Office Hours</h4>
                  <p className="text-gray-600 text-sm">
                    Monday - Saturday: 9:00 AM - 5:00 PM
                    <br />
                    Sunday: After Holy Mass
                  </p>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="mt-8 rounded-lg overflow-hidden shadow-md h-64 bg-gray-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.5!2d76.5!3d9.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sVakathanam!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Church Location"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-primary-500 mb-6">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Name *
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  {...register('phone')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject *
                </label>
                <input
                  id="subject"
                  type="text"
                  {...register('subject', { required: 'Subject is required' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition"
                  placeholder="What is this about?"
                />
                {errors.subject && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  rows="5"
                  {...register('message', { required: 'Message is required' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition resize-none"
                  placeholder="Write your message here..."
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <FiSend className="mr-2" size={16} />
                    Send Message
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="bg-green-50 text-green-700 p-4 rounded-lg text-sm">
                  Thank you! Your message has been sent successfully.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm">
                  Something went wrong. Please try again later.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
