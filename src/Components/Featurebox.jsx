import React, { useState } from 'react';
import '../style.css';

const Featurebox = (props) => {
    const [flipped, setFlipped] = useState(false);

    const handleFlip = () => {
        setFlipped(!flipped);
    };

    return (
        <div
            onClick={handleFlip}
            style={{
                width: '280px',
                height: '400px',
                margin: '30px',
                perspective: '1000px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                transition: 'transform 0.3s ease',
            }}
        >
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.6s',
                    transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                }}
            >
                {/* Front Side */}
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(0deg)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        textAlign: 'center',
                        backgroundColor: '#000',
                        color: '#fff',
                        borderRadius: '12px',
                    }}
                >
                    <div style={{ width: '100%', height: '65%', paddingTop: '20px' }}>
                        <img
                            src={props.image}
                            alt={props.title}
                            style={{
                                width: '120%',
                                height: 'auto',
                                borderRadius: '8px',
                                objectFit: 'cover',
                            }}
                        />
                    </div>
                    <div style={{ padding: '10px' }}>
                        <h2 style={{ color: '#f00', fontSize: '18px' }}>{props.title}</h2>
                        <p>{props.description}</p>
                    </div>
                </div>

                {/* Back Side */}
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        backgroundColor: '#900',
                        padding: '20px',
                        color: '#fff',
                        textAlign: 'left',
                        borderRadius: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <h2 style={{ fontSize: '18px' }}>{props.title}</h2>
                    <p>{props.details.benefits}</p>
                    <ul style={{ marginTop: '10px' }}>
                        {props.details.types.map((type, index) => (
                            <li key={index} style={{ marginBottom: '5px' }}>
                                {type}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Featurebox;
