import React from "react";

function Receipts() {
  const receipts = [
    { id: 1, type: "Salary", amount: "$2000", date: "2026-01-10" },
    { id: 2, type: "Loan Payment", amount: "$500", date: "2026-01-12" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Receipts</h2>
      <ul>
        {receipts.map((r) => (
          <li key={r.id} className="border p-2 mb-2 rounded">
            <strong>{r.type}</strong> — {r.amount} on {r.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Receipts;
