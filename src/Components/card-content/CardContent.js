import React from 'react';
import './card-content.css'

const CardContent = (props) => {
    const { title, img, id } = props.place;
    const handleDescription = props.handleDescription;
    const bgStyle = {
        backgroundImage: `url('${img}')`,
        backgroundSize: 'cover',
        borderRadius: '20px',
        width: '240px',
        height: '380px',
        color: 'white'
    }
    return (
        <>
            <div className="col-4 " onClick={() => handleDescription(id)}>
                <div style={bgStyle} className="place">
                    <div className="card-style d-flex justify-content-center align-items-end">
                        <h2>
                            {title}
                        </h2>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardContent;

// import React from 'react';
// import { Col } from 'react-bootstrap';
// import './card-content.css';

// const CardContent = (props) => {
//     const { title, img, id } = props.place;
//     const handleDescription = props.handleDescription;
//     const cardStyle = {
//         backgroundImage: `url("${img}")`,
//         backgroundSize: 'cover',
//         borderRadius: '30px',
//         width: '300px',
//         height: '480px',
//         color: 'white',
//         overflow: 'hidden',
//     }
//     return (
//         <Col xs="4" className="m-0">
//             <div style={cardStyle} className="d-flex justify-content-center align-items-end place" onClick={() => handleDescription(id)} >
//                 <h2>{title}</h2>
//             </div>
//         </Col>
//     );
// };

// export default CardContent;