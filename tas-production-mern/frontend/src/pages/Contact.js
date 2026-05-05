import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please login to send messages');
      return;
    }
    
    setLoading(true);
    
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/contact`, formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error(error);
      alert('There was an error sending your message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="contact-page">
        <div className="container">
          <div className="success-message-large">
            <h2>Thank You!</h2>
            <p>Your message has been sent successfully. We'll get back to you soon.</p>
            <button className="btn" onClick={() => setSubmitted(false)}>Send Another Message</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-page">
      <div className="container">
        <h2 className="section-title">Let's Create Something Amazing</h2>
        <p className="section-subtitle">Ready to elevate your sound? Get in touch with our team</p>
        
        <div className="contact-wrapper">
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">📞</div>
              <div>
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">✉️</div>
              <div>
                <h3>Email</h3>
                <p>hello@tasproduction.com</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">📍</div>
              <div>
                <h3>Location</h3>
                <p>123 Sound Street, Music City, MC 12345</p>
              </div>
            </div>
            <div className="business-hours">
              <h3>Business Hours</h3>
              <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
              <p>Saturday: 10:00 AM - 6:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
          
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;