import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { placeContext } from '../../App';
import './booking.css';

const Booking = () => {
    const [place] = useContext(placeContext);

    const history = useHistory()
    const handleSubmit = () => {
        history.push("/destination-details")
    }
    return (
        <div className="home-style">
            <div className="background-transparent">
                <div className="row m-0 place-details d-flex justify-content-center align-items-center">
                    <div className="col-6 px-5">
                        <h1>{place.title}</h1>
                        <p>{place.description}</p>
                    </div>
                    <div className="col-6 d-flex justify-content-center align-items-center">
                        <div className="form-area">
                            <form onSubmit={handleSubmit}>
                                <label>Origin</label> <br />
                                <input type="text" placeholder="Starting Point" /> <br />

                                <label>Destination</label> <br />
                                <input type="text" placeholder="Ending Point" /><br />
                                <div className="row m-0">
                                    <div className="col-6">
                                        <label>From</label> <br />
                                        <input type="date" />
                                    </div>
                                    <div className="col-6">
                                        <label>To</label> <br />
                                        <input type="date" />
                                    </div>
                                </div>
                                <input className="start-booking-btn" type="submit" value="Start Booking" />
                            </form>
                        </div >
                    </div >
                </div >
            </div>
        </div >

    );
};

export default Booking;