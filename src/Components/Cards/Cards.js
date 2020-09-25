import React, { useContext } from 'react';
import { PlaceData } from '../../assets/PlaceData/PlaceData';
import CardContent from '../card-content/CardContent';
import './cards.css';
import { placeContext } from '../../App';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointUp } from '@fortawesome/free-solid-svg-icons';

const Cards = () => {
    const [place, setPlace] = useContext(placeContext);
    const history = useHistory();

    const handleDescription = (id) => {
        const filteredPlace = PlaceData.filter(plc => plc.id === id);
        setPlace(filteredPlace[0]);
        history.push("/destination/" + place.target)
    };

    const handleHover = (id) => {
        const filteredPlace = PlaceData.filter(plc => plc.id === id);
        setPlace(filteredPlace[0]);
    }
    return (
        <>
            <div className="row m-0 de-flex align-items-center pt-5">
                <div className="col-5 description-area">
                    <h1>{place.title}</h1>
                    <p>{place.description}</p>
                    {
                        place.title && <button className="btn book-btn font-weight-bold" onClick={() => history.push(`/destination/${place.target}`)}>book now  <FontAwesomeIcon icon={faHandPointUp} /></button>
                    }
                </div>
                <div className="col-7">
                    <div className="row m-0">
                        {
                            PlaceData.map(plc => <CardContent key={plc.id} place={plc} handleHover={handleHover} handleDescription={handleDescription} />)
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cards;