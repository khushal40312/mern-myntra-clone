import React from 'react';

const Cancel = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Payment Cancelled</h1>
      <p style={styles.message}>It seems you cancelled the payment process. You can try again or browse other products.</p>
      <a href="/" style={styles.link}>Return to Home</a>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#fbe7e7'
  },
  heading: {
    fontSize: '2.5rem',
    color: '#dc3545',
  },
  message: {
    fontSize: '1.2rem',
    margin: '20px 0',
  },
  link: {
    fontSize: '1rem',
    color: '#007bff',
    textDecoration: 'none',
    marginTop: '20px',
  }
};

export default Cancel;
