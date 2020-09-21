import React, { useContext } from 'react';
import { PlaceData } from '../../assets/PlaceData/PlaceData';
import CardContent from '../card-content/CardContent';
import './cards.css';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { placeContext } from '../../App';
import { useHistory } from 'react-router-dom';

const Cards = () => {
    const [place, setPlace] = useContext(placeContext);
    const history = useHistory();
    const handleDescription = (id) => {
        const filteredPlace = PlaceData.filter(plc => plc.id === id);
        setPlace(filteredPlace[0]);
        history.push("/destination")
    };
    return (
        <>
            <div className="row m-0 de-flex align-items-center pt-5">
                <div className="col-5 description-area">
                    <h1>{place.title}</h1>
                    <p>{place.description}</p>
                    {
                        place.title && <button className="btn book-btn" onClick={() => history.push("/destination")}>book now</button>
                    }
                </div>
                <div className="col-7">
                    <div className="row m-0">
                        {
                            PlaceData.map(plc => <CardContent key={plc.id} place={plc} handleDescription={handleDescription} />)
                        }
                    </div>
                </div>
                <div className="col-12 pt-5 d-flex justify-content-center">
                    <button className="toggler"><ArrowBackIosIcon /></button>
                    <button className="toggler"><ArrowForwardIosIcon /></button>
                </div>
            </div>
        </>
    );
};

export default Cards;


// import React, { useState } from 'react';
// import { Col, Container, Row } from 'react-bootstrap';
// import { PlaceData } from '../../assets/PlaceData/PlaceData';
// import CardContent from '../card-content/CardContent';
// import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// import './cards.css'

// const Cards = () => {
//     const [description, setDescription] = useState(PlaceData[0])
//     const handleDescription = (id) => {
//         const filteredPlace = PlaceData.filter(place => place.id === id);
//         setDescription(filteredPlace[0]);
//     }
//     return (
//         <Row>
//             <Col xs="5" className="d-flex justify-content-center align-items-center">
//                 <div className="description-area">
//                     <h1 style={{ color: 'white' }}>{description.title}</h1>
//                     <p style={{ color: 'white' }}> {description.description}</p>
//                     {
//                         description.title && <button className="btn book-btn">book now</button>
//                     }
//                 </div>
//             </Col>
//             <Col xs="7" className="m-0">
//                 <Row className="justify-content-center m-0">
//                     {
//                         PlaceData.map(place => <CardContent key={place.id} place={place} handleDescription={handleDescription} />)
//                     }
//                 </Row>
//             </Col>
//             <Col xs={12} className="d-flex justify-content-center">
//                 <button className=" btn toggle-btn"><ArrowBackIosIcon /></button>
//                 <button className=" btn toggle-btn"><ArrowForwardIosIcon /></button>
//             </Col>
//         </Row>
//     );
// };

// export default Cards;