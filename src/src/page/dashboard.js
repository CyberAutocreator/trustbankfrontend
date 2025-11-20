import React, { useEffect } from 'react';

function Dashboard() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }
  }, []);

  return (
    <div>
      <h2>Welcome to your Dashboard</h2>
    </div>
  );
}

export default Dashboard;
