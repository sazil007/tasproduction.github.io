import React from 'react';
import Hero from '../components/Hero';
import ServicesPreview from '../components/ServicesPreview';
import About from '../components/About';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <Hero />
      <ServicesPreview />
      <About />
    </div>
  );
};

export default Home;