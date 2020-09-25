import React from 'react';
import { Link } from 'react-router-dom';

const News = () => {
    return (
        <div style={{ height: '100vh' }} className="text-primary d-flex justify-content-center align-items-center">
            <h1>
                There is no breaking news.. Go back to your <Link className="text-warning" to="/home">Home</Link>
            </h1>
        </div>
    );
};

export default News;