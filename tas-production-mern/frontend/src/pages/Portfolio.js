import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './Portfolio.css';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/portfolio`);
      setPortfolio(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleViewProject = (project) => {
    if (!user) {
      alert('Please login to view project details');
      return;
    }
    alert(`Viewing project: ${project.title}`);
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="portfolio-page">
      <div className="container">
        <h2 className="section-title">Our Portfolio</h2>
        <p className="section-subtitle">Explore some of our recent projects and productions</p>
        <div className="portfolio-grid">
          {portfolio.map(item => (
            <div key={item._id} className="portfolio-item">
              <div className="portfolio-image">
                <img src={item.imageUrl || 'https://via.placeholder.com/400x250'} alt={item.title} />
              </div>
              <div className="portfolio-info">
                <div className="portfolio-category">{item.category}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <button className="btn" onClick={() => handleViewProject(item)}>
                  View Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;