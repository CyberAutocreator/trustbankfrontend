import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/');

    fetch(`${import.meta.env.VITE_API_URL}/transactions`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setSummary(data))
      .catch(err => console.error(err));
  }, []);

  if (!summary) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome to TrustBank</h1>
      <h2>Total Balance: ${summary.totalBalance.toLocaleString()}</h2>
      <h3>Total Transactions: {summary.totalTransactions.toLocaleString()}</h3>

      <h4>Recent Transactions</h4>
      <ul>
        {summary.recent.map(tx => (
          <li key={tx.id}>
            {tx.date} — {tx.type.toUpperCase()} — ${tx.amount} — {tx.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
