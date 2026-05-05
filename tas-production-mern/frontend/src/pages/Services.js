import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/services`);
      setServices(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="services-page">
      <div className="container">
        <h2 className="section-title">All Services</h2>
        <p className="section-subtitle">Comprehensive sound management solutions tailored to your needs</p>
        <div className="services-grid">
          {services.map(service => (
            <div key={service._id} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;