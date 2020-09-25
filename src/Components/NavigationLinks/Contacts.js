import React from 'react';
import { Link } from 'react-router-dom';

const Contacts = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
            <img style={{ height: '300px', width: '300px' }} className="rounded-circle border" src="https://scontent.fdac27-1.fna.fbcdn.net/v/t1.0-9/116144102_294786958613864_720728469351671984_n.jpg?_nc_cat=100&_nc_sid=09cbfe&_nc_eui2=AeE2dDgVcoNxBgaNuUpxfBWWmxPumygzyTSbE-6bKDPJNMOEHSksbRgy_YmkRTzw9xgF0rS3zT8nKwWHM93RBRyB&_nc_ohc=ZlPSLsrFJrAAX_XGpru&_nc_ht=scontent.fdac27-1.fna&oh=4224a8d7f9f4eb9ae8b9a6a39487f412&oe=5F931700" alt="SayeedSayem" />
            <div className="text-center">
                <h1 className="text-success">
                    Sayeed Sayem
            </h1>
                <p className="text-info">
                    Junior Web Developer
            </p>
                <p className="text-muted">
                    Phone: +8801786230995
            </p>
                <p className="text-warning">
                    Email: <a className="text-warning" href="mailto:sayeedsayem8@gmail.com" target="_blank">sayeedsayem8@gmail.com</a>
                </p>
            </div>
            <div>
                <h2>
                    Now, back to <Link className="text-warning" to="/home"> Home</Link>
                </h2>
            </div>
        </div >
    );
};

export default Contacts;