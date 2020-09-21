import React from 'react';
import './card-content.css'

const CardContent = (props) => {
    const { title, img, id } = props.place;
    const { handleDescription, handleHover } = props;

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
            <div className="col-4 " onMouseOver={() => handleHover(id)} onClick={() => handleDescription(id)}>
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