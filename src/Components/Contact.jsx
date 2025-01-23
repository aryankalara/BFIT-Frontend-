import React, { useState } from 'react';
import '../style.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:2025/user/sendemail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert('Email sent successfully!');
            } else {
                alert('Failed to send email.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error sending email.');
        }
    };

    return (
        <div id='contact'>
            <h1>CONTACT US</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='name'
                    placeholder='Full Name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type='email'
                    name='email'
                    placeholder='Type Your Email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name='message'
                    placeholder='Write Here .....'
                    value={formData.message}
                    onChange={handleChange}
                    required
                ></textarea>
                <input type='submit' value='Send' />
            </form>
        </div>
    );
};

export default Contact;
