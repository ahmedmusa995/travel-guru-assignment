import React from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
    return (
        <div style={{ height: '100vh' }} className="text-primary d-flex justify-content-center align-items-center">
            <h1>
                Blog is under development.. Go back to <Link className="text-warning" to="/home">Home</Link>
            </h1>
        </div>
    );
};

export default Blog;