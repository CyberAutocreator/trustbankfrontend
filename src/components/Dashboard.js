import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function Dashboard({ user }) {
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // Fetch account balance
      const { data: accountData } = await supabase
        .from("accounts")
        .select("*")
        .eq("user_id", user.id)
        .single();

      setAccount(accountData);

      // Fetch transaction history
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
    <div>
      <h2>Welcome, {account?.user_name}</h2>
      <h3>Balance: ${account?.balance?.toLocaleString()}</h3>

      <h3>Transaction History</h3>
      <ul>
        {transactions.map((tx) => (
          <li key={tx.id}>
            {tx.description}: {tx.amount < 0 ? "-" : "+"}${Math.abs(tx.amount).toLocaleString()} 
            ({new Date(tx.created_at).toLocaleDateString()})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
