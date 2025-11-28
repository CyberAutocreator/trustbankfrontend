import React, { useState } from "react";
import { supabase } from "../supabaseClient";

function DepositWithdraw({ user }) {
  const [amount, setAmount] = useState("");

  async function handleDeposit(e) {
    e.preventDefault();
    if (!amount) return;

    await supabase.from("transactions").insert({
      user_id: user.id,
      amount: parseFloat(amount),
      description: "Cash Deposit",
    });

    alert("Deposit successful!");
    setAmount("");
  }

  async function handleWithdraw(e) {
    e.preventDefault();
    if (!amount) return;

    await supabase.from("transactions").insert({
      user_id: user.id,
      amount: -parseFloat(amount),
      description: "Cash Withdrawal",
    });

    alert("Withdrawal successful!");
    setAmount("");
  }

  return (
    <div>
      <h3>Deposit / Withdraw</h3>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleDeposit}>Deposit</button>
      <button onClick={handleWithdraw}>Withdraw</button>
    </div>
  );
}

export default DepositWithdraw;
