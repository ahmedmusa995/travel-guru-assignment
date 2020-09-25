import React from 'react';
import { Link } from 'react-router-dom';

const Destiny = () => {
    return (
        <div style={{ height: '100vh' }} className="text-primary d-flex justify-content-center align-items-center">
            <h1>
                Developers are working.. So please don't bother them... <Link className="text-warning" to="/home">Leave</Link>
            </h1>
        </div>
    );
};

export default Destiny;