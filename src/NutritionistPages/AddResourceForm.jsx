import React, { useState } from 'react';

const AddResourceForm = () => {
  const [formData, setFormData] = useState({
    resourceName: '',
    resourceDescription: '',
    resourceURL: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.resourceName && formData.resourceDescription && formData.resourceURL) {
      try {
        const response = await fetch('http://localhost:2025/nutritionist/resources/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          alert(`Resource Added Successfully!\n\nID: ${data.id}\nName: ${data.resourceName}`);
          setFormData({ resourceName: '', resourceDescription: '', resourceURL: '' });
        } else {
          const error = await response.json();
          alert(`Failed to add resource. Error: ${error.message}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while adding the resource. Please try again.');
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add Resource</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <label style={styles.label} htmlFor="resourceName">
          Resource Name
        </label>
        <input
          type="text"
          id="resourceName"
          name="resourceName"
          value={formData.resourceName}
          onChange={handleChange}
          placeholder="Enter resource name"
          style={styles.input}
          required
        />

        <label style={styles.label} htmlFor="resourceDescription">
          Description
        </label>
        <textarea
          id="resourceDescription"
          name="resourceDescription"
          value={formData.resourceDescription}
          onChange={handleChange}
          placeholder="Enter resource description"
          style={styles.textarea}
          rows="4"
          required
        ></textarea>

        <label style={styles.label} htmlFor="resourceURL">
          Resource URL
        </label>
        <input
          type="url"
          id="resourceURL"
          name="resourceURL"
          value={formData.resourceURL}
          onChange={handleChange}
          placeholder="Enter resource URL"
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>
          Add Resource
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#1c1c1c',
    color: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(255, 0, 0, 0.7)',
    width: '400px',
    margin: '50px auto',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    color: '#ff4d4d',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    marginBottom: '15px',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#3a3a3a',
    color: 'white',
  },
  textarea: {
    marginBottom: '15px',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#3a3a3a',
    color: 'white',
  },
  button: {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#ff4d4d',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default AddResourceForm;