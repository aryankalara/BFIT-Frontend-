import React from 'react';
import Featurebox from './Featurebox';
import fimage1 from '../images/1.svg';
import fimage2 from '../images/2.svg';
import fimage3 from '../images/3.svg';
import fimage4 from '../images/4.svg';

const Feature = () => {
    const features = [
        {
            image: fimage1,
            title: 'WeightLifting',
            description: 'Improve your strength and power.',
            details: {
                types: ['Compound Exercises', 'Isolation Workouts', 'Olympic Lifts'],
                benefits: 'Boosts strength, muscle mass, and bone density.',
            },
        },
        {
            image: fimage2,
            title: 'Specific Muscle',
            description: 'Focus on key muscle groups.',
            details: {
                types: ['Upper Body', 'Lower Body', 'Core'],
                benefits: 'Targets muscles for better tone and strength.',
            },
        },
        {
            image: fimage3,
            title: 'Flex Your Muscle',
            description: 'Enhance flexibility and endurance.',
            details: {
                types: ['Yoga', 'Pilates', 'Dynamic Stretching'],
                benefits: 'Increases flexibility and muscle elasticity.',
            },
        },
        {
            image: fimage4,
            title: 'Cardio Exercise',
            description: 'Boost your heart health.',
            details: {
                types: ['Running', 'Cycling', 'Swimming'],
                benefits: 'Improves cardiovascular endurance and burns calories.',
            },
        },
    ];

    return (
        <div id="features" style={{ padding: '20px' }}>
            <h1>FEATURES</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                {features.map((feature, index) => (
                    <Featurebox
                        key={index}
                        image={feature.image}
                        title={feature.title}
                        description={feature.description}
                        details={feature.details}
                    />
                ))}
            </div>
        </div>
    );
};

export default Feature;