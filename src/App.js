import React, { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      {!user ? (
        <div className="auth-container">
          <Login onLogin={setUser} />
          <Signup onSignup={setUser} />
        </div>
      ) : (
        <Dashboard user={user} />
      )}
    </div>
  );
}

export default App;
