import React from 'react';
import './hotel.css';
import arrow from '../../assets/arrow.png';
import starLogo from '../../assets/star.png';

const Hotel = (props) => {
    const { name, id, facility1, facility2, facility3, star, review, price, img } = props.hotel;

    return (
        <div className="col-12 row m-0 d-flex justify-content-center align-items-center">
            <div className="col-5 hotel">
                <img className="hotel-img" src={img} alt={id} />
            </div>
            <div className="col-7 hotel-description">
                <h4 className="mb-3">{name}</h4>
                <ul>
                    <li><img className="arrow" src={arrow} alt="arrow" /> {facility1}</li>
                    <li><img className="arrow" src={arrow} alt="arrow" /> {facility2}</li>
                    <li><img className="arrow" src={arrow} alt="arrow" /> {facility3}</li>
                </ul>
                <div className="d-flex justify-content-between">
                    <div><img className="star" src={starLogo} alt="arrow" /><p className="d-inline"> {star}({review})</p></div>
                    <p>$ {price}/<span className="text-muted d-inline">per night</span></p>
                </div>
            </div>
        </div>
    );
};

export default Hotel;