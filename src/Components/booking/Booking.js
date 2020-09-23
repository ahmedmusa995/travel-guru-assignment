import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { placeContext, userContext } from '../../App';
import './booking.css';

const Booking = () => {
    const [place, setPlace] = useContext(placeContext);
    const [signedUser, setSignedUser] = useContext(userContext)
    const history = useHistory()

    const handleInput = (event) => {
        if (event.target.name === 'origin') {
            const origin = event.target.value;
            setSignedUser({ ...signedUser, origin: origin })
        }
        if (event.target.name === 'destination') {
            const destination = event.target.value;
            setSignedUser({ ...signedUser, destination: destination })
        }
        if (event.target.name === 'from') {
            const from = event.target.value;
            setSignedUser({ ...signedUser, from: from })
        }
        if (event.target.name === 'to') {
            const to = event.target.value;
            setSignedUser({ ...signedUser, to: to })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setPlace({ ...place, target: place.target })
        history.push("/destination-details/" + place.target)
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
                                <input onChange={handleInput} type="text" name="origin" placeholder="Starting Point" required /> <br />

                                <label>Destination</label> <br />
                                <input onChange={handleInput} type="text" value={place.title} name="destination" placeholder="Ending Point" disabled /> <br />
                                <div className="row m-0">
                                    <div className="col-6">
                                        <label>From</label> <br />
                                        <input onChange={handleInput} name="from" type="date" />
                                    </div>
                                    <div className="col-6">
                                        <label>To</label> <br />
                                        <input onChange={handleInput} name="to" type="date" />
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