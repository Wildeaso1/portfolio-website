import React from 'react';
import { Link } from 'react-router-dom';
import { getImagePath } from '../utils/imageUtils';
import './Home.css';

const Home = () => {
  const homeBg = getImagePath('home-bg.gif');

  return (
    <section className="home" style={{ backgroundImage: `url(${homeBg})` }}>
      <div className="home-content">
        <h1>Welcome to My Portfolio</h1>
        <p>
          I'm William, a passionate Game Developer/Technical Artist. 
        </p>
        <p>
        I have extensive knowledge about both the coding side, and art side of game development
        </p>        <Link to="/projects" className="btn">
          View My Projects
        </Link>
      </div>
    </section>
  );
};

export default Home;