import React from 'react';
import Cards from '../Cards/Cards';
import Navigation from '../Navigation-bar/Navigation';
import './home.css';

const Home = () => {
    return (
        <>
            <div className="home-style">
                <div className="background-transparent">
                    <Navigation />
                    <Cards />
                </div>
            </div>
        </>
    );
};

export default Home;