import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <h1 className="font-bold text-lg">TrustBank</h1>
      <div className="space-x-4">
        <Link to="/">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/receipts">Receipts</Link>
      </div>
    </nav>
  );
}

export default Navbar;
