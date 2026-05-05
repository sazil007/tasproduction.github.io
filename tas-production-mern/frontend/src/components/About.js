import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>About TAS Production House</h2>
            <p>Founded in 2009, TAS Production House has been at the forefront of audio innovation, delivering exceptional sound management solutions to clients worldwide.</p>
            <p>Our team of experienced audio engineers, producers, and sound designers are passionate about creating sonic experiences that resonate. With state-of-the-art equipment and decades of combined expertise, we transform your audio vision into reality.</p>
            <div className="stats">
              <div className="stat">
                <div className="stat-number">15+</div>
                <div>Years Experience</div>
              </div>
              <div className="stat">
                <div className="stat-number">500+</div>
                <div>Happy Clients</div>
              </div>
              <div className="stat">
                <div className="stat-number">1000+</div>
                <div>Projects Completed</div>
              </div>
              <div className="stat">
                <div className="stat-number">98%</div>
                <div>Client Satisfaction</div>
              </div>
            </div>
          </div>
          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=400&fit=crop" alt="Recording Studio" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;