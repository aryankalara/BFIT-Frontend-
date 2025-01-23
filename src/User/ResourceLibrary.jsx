import React, { useEffect, useState } from 'react';

const ResourceLibrary = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    // Fetch resources from the backend
    const fetchResources = async () => {
      try {
        const response = await fetch('http://localhost:2025/nutritionist/resources/all');
        const data = await response.json();
        setResources(data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };

    fetchResources();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Resource Library</h1>
      <div style={styles.grid}>
        {resources.map((resource) => (
          <div key={resource.id} style={styles.card} className="resource-card">
            <h2 style={styles.cardTitle}>{resource.resourceName}</h2>
            <p style={styles.cardDescription}>{resource.resourceDescription}</p>
            <a
              href={resource.resourceURL}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.cardLink}
            >
              Learn More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#1c1c1c',
    color: '#fff',
    padding: '50px 20px',
    textAlign: 'center',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '40px',
    color: '#ff4d4d',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', // Ensures 3 cards per row
    gap: '20px', // Adjust the space between cards
    justifyContent: 'center',
    alignItems: 'start',
  },
  card: {
    backgroundColor: '#2b2b2b',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 0 10px rgba(255, 0, 0, 0.4)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    textAlign: 'left',
    border: '2px solid #ff4d4d',
  },
  cardTitle: {
    fontSize: '1.5rem',
    color: '#ff4d4d',
    marginBottom: '10px',
  },
  cardDescription: {
    fontSize: '1rem',
    marginBottom: '15px',
    color: '#ccc',
  },
  cardLink: {
    fontSize: '1rem',
    color: '#ff4d4d',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

// Additional hover effect styling
const hoverStyle = document.createElement('style');
hoverStyle.innerHTML = `
  .resource-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.8);
  }
`;
document.head.appendChild(hoverStyle);

export default ResourceLibrary;