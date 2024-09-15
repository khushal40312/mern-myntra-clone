import React from 'react';

const Success = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Payment Successful!</h1>
      <p style={styles.message}>Thank you for your purchase. Your order has been placed successfully.</p>
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
    backgroundColor: '#e7f5e5'
  },
  heading: {
    fontSize: '2.5rem',
    color: '#28a745',
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

export default Success;
