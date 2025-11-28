import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  // Formatter for USD
  const formatUSD = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  useEffect(() => {
    async function fetchData() {
      // Fetch account balance
      const { data: account } = await supabase
        .from("accounts")
        .select("balance")
        .eq("id", 1443678161) // replace with your account ID
        .single();

      if (account) setBalance(account.balance);

      // Fetch transactions
      const { data: txs } = await supabase
        .from("transactions")
        .select("amount, description, created_at")
        .eq("account_id", 1443678161)
        .order("created_at", { ascending: false });

      if (txs) setTransactions(txs);
    }

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1>Welcome, Trust Bank User</h1>
        <div className="balance">{formatUSD(balance)}</div>
        <div className="label">Available Balance (USD)</div>
      </div>

      <div className="card">
        <h2>Transaction History</h2>
        {transactions.map((tx, i) => (
          <div className="row" key={i}>
            <div className="label">
              {new Date(tx.created_at).toLocaleDateString()}
            </div>
            <div className="value">
              {tx.description} {formatUSD(tx.amount)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
