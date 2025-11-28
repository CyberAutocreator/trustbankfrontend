import React, { useState } from "react";

function TransactionSearch({ transactions, setFiltered }) {
  const [query, setQuery] = useState("");

  function handleSearch(e) {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    const filtered = transactions.filter(
      (tx) =>
        tx.description.toLowerCase().includes(value) ||
        (tx.category && tx.category.toLowerCase().includes(value))
    );

    setFiltered(filtered);
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search transactions..."
        value={query}
        onChange={handleSearch}
      />
    </div>
  );
}

export default TransactionSearch;
