import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function Dashboard({ user }) {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const formatUSD = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  useEffect(() => {
    async function fetchData() {
      // Fetch account balance for this logged-in user
      const { data: account, error: accountError } = await supabase
        .from("accounts")
        .select("balance")
        .eq("user_id", user.id) // link account to logged-in user
        .single();

      if (accountError) {
        console.error("Error fetching account:", accountError.message);
      } else if (account) {
        setBalance(account.balance);
      }

      // Fetch transactions for this logged-in user
      const { data: txs, error: txError } = await supabase
        .from("transactions")
        .select("amount, description, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (txError) {
        console.error("Error fetching transactions:", txError.message);
      } else if (txs) {
        setTransactions(txs);
      }
    }

    fetchData();
  }, [user]);

  return (
    <div className="container">
      <div className="card">
        <h1>Welcome, {user.email}</h1>
        <div className="balance">{formatUSD(balance)}</div>
        <div className="label">Available Balance (USD)</div>
      </div>

      <div className="card">
        <h2>Transaction History</h2>
        {transactions.length === 0 && <p>No transactions yet</p>}
        {transactions.map((tx, i) => (
          <div className="row" key={i}>
            <div className="label">
              {new Date(tx.created_at).toLocaleDateString()}
            </div>
            <div className="value">
              {tx.description} — {formatUSD(tx.amount)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
