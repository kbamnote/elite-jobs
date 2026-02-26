import React, { useState } from "react";
import { enquiry } from "../../../../utils/Api";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus(null);

    try {
      // Prepare the data for API - mapping to the documented API structure
      const contactData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject || "General Inquiry", // Default subject if not provided
        message: formData.message
      };

      // Call the API
      const response = await enquiry(contactData);
      
      console.log('Form submitted successfully:', response.data);
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-auto h-60 bg-gray-900 text-white flex justify-center items-center">
        <h1 className="text-3xl md:text-5xl font-semibold" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-heading)' }}>Contact Us</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              You Will Grow, You Will Succeed. We Promise That
            </h2>
            <p className="text-gray-600 mb-8">
              Have questions or need assistance? Our team is here to help you with any inquiries
              regarding job postings, applications, or account management.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{backgroundColor: 'var(--color-accent-light)'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{color: 'var(--color-accent)'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold">Call for inquiry</h3>
                </div>
                <p className="text-gray-600">8855885807</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{backgroundColor: 'var(--color-accent-light)'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{color: 'var(--color-accent)'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold">Send us email</h3>
                </div>
                <p className="text-gray-600">info@eliteindiajobs.in</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{backgroundColor: 'var(--color-accent-light)'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{color: 'var(--color-accent)'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold">Opening hours</h3>
                </div>
                <p className="text-gray-600">Mon - Fri: 10AM - 10PM</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{backgroundColor: 'var(--color-accent-light)'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{color: 'var(--color-accent)'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold">Office</h3>
                </div>
                <p className="text-gray-600">Elite Jobs Office, 1st Floor Mohota Complex, Above State Bank Of India, Katol Road, Chhaoni, Nagpur, Maharashtra 440013</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
            <p className="text-gray-600 mb-6">Reach out to us with any questions or concerns</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none" 
                    style={{'--tw-ring-color': 'var(--color-accent)'}} 
                    placeholder="Your full name" 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none" 
                    style={{'--tw-ring-color': 'var(--color-accent)'}} 
                    placeholder="Your E-mail address" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none" 
                    style={{'--tw-ring-color': 'var(--color-accent)'}} 
                    placeholder="Your phone number" 
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none" 
                    style={{'--tw-ring-color': 'var(--color-accent)'}} 
                    placeholder="Subject of your inquiry" 
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4} 
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none" 
                  style={{'--tw-ring-color': 'var(--color-accent)'}} 
                  placeholder="Your message..." 
                />
              </div>
              {submitStatus === 'success' && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                There was an error submitting your message. Please try again.
              </div>
            )}
            <button 
              type="submit" 
              className="btn-accent w-full py-2 px-4 rounded-md transition-colors focus:ring-2 focus:ring-offset-2" 
              style={{'--tw-ring-color': 'var(--color-accent)'}}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
            </form>
          </div>
        </div>
      </div>
      <div className="w-full h-[480px] overflow-hidden p-6 mb-4">
        <iframe
          title="Google Map Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.0740918264177!2d79.07522737523014!3d21.169049584761134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c1dfdc6c9b43%3A0x54f93538e6888db3!2sElite%20Jobs!5e0!3m2!1sen!2sin!4v1735766400000!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
};

export default ContactUs;