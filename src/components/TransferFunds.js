import React, { useState } from "react";
import { supabase } from "../supabaseClient";

function TransferFunds({ user }) {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [amount, setAmount] = useState("");

  async function handleTransfer(e) {
    e.preventDefault();

    const { data: recipient } = await supabase
      .from("accounts")
      .select("user_id")
      .eq("user_name", recipientEmail)
      .single();

    if (!recipient) {
      alert("Recipient not found");
      return;
    }

    await supabase.from("transactions").insert({
      user_id: user.id,
      amount: -amount,
      description: `Transfer to ${recipientEmail}`,
    });

    await supabase.from("transactions").insert({
      user_id: recipient.user_id,
      amount: amount,
      description: `Transfer from ${user.email}`,
    });

    alert("Transfer successful!");
    setRecipientEmail("");
    setAmount("");
  }

  return (
    <form onSubmit={handleTransfer}>
      <h3>Transfer Funds</h3>
      <input
        type="email"
        placeholder="Recipient Email"
        value={recipientEmail}
        onChange={(e) => setRecipientEmail(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default TransferFunds;
