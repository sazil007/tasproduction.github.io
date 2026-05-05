import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <h1>Where Sound Meets Perfection</h1>
      <p>Professional Sound Management · World-class Audio Production</p>
      <Link to="/contact" className="btn">Get Started</Link>
    </section>
  );
};

export default Hero;