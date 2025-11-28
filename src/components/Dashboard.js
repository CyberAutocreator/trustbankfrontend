import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import TransferFunds from "./TransferFunds";
import "./Dashboard.css";

function Dashboard({ user }) {
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data: accountData } = await supabase
        .from("accounts")
        .select("*")
        .eq("user_id", user.id)
        .single();

      setAccount(accountData);

      const { data: transactionData } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setTransactions(transactionData || []);
    }

    if (user) fetchData();
  }, [user]);

  return (
    <div className="dashboard-container">
      {/* Balance Section */}
      <div className="dashboard-card balance-card">
        <h2>Account Balance</h2>
        <p className="balance-amount">
          ${account?.balance?.toLocaleString()}
        </p>
      </div>

      {/* Transactions Section */}
      <div className="dashboard-card transactions-card">
        <h2>Transaction History</h2>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td>{tx.description}</td>
                <td className={tx.amount < 0 ? "negative" : "positive"}>
                  {tx.amount < 0 ? "-" : "+"}${Math.abs(tx.amount).toLocaleString()}
                </td>
                <td>{new Date(tx.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Transfer Funds Section */}
      <div className="dashboard-card transfer-card">
        <TransferFunds user={user} />
      </div>

      {/* Analytics Section (placeholder for charts) */}
      <div className="dashboard-card analytics-card">
        <h2>Spending Analytics</h2>
        <p>Charts and insights will appear here.</p>
      </div>
    </div>
  );
}

export default Dashboard;
